/**
 * Runtime validation for `bundles.json`.
 *
 * Same job as productsSchema.ts, and the same reason: the file is written by a
 * form at /admin, so nothing runs a compiler over it before it lands. `npm test`
 * runs these checks and the deploy workflow runs `npm test` before uploading,
 * so a malformed bundle fails in CI and the live site keeps the last good copy.
 *
 * One difference from products: an empty list is valid. That is the state the
 * shop is in until someone adds a first bundle, and /offers is built to show
 * "coming soon" for exactly that case.
 *
 * Returns every problem rather than the first, so an editor who broke three
 * fields hears about all three.
 */

import { getProduct } from './products';

const STATUSES = ['active', 'hidden'];

/** Bilingual field: both languages present and non-empty. */
function checkBi(value: unknown, path: string, problems: string[]) {
  if (typeof value !== 'object' || value === null) {
    problems.push(`${path}: expected an object with "en" and "ar"`);
    return;
  }
  for (const lang of ['en', 'ar'] as const) {
    const v = (value as Record<string, unknown>)[lang];
    if (typeof v !== 'string' || v.trim() === '') {
      problems.push(`${path}.${lang}: missing or empty`);
    }
  }
}

export function validateBundles(data: unknown): string[] {
  const problems: string[] = [];

  if (!Array.isArray(data)) return ['top level: expected an array of bundles'];
  // Empty is fine. No bundles yet is a real state, not a mistake.
  if (data.length === 0) return problems;

  const slugs = new Set<string>();

  data.forEach((raw, i) => {
    const b = raw as Record<string, unknown>;
    const slug = typeof b.slug === 'string' ? b.slug : '';
    const at = slug ? `"${slug}"` : `bundle #${i + 1}`;

    if (!slug.trim()) {
      problems.push(`${at}: slug is missing or empty`);
    } else if (!/^[a-z0-9-]+$/.test(slug)) {
      // Character range spelled out rather than the English word for it — see
      // the same note in productsSchema.ts about Tailwind scanning src/.
      problems.push(`${at}: slug may only contain a-z, 0-9 and hyphens`);
    } else if (slugs.has(slug)) {
      problems.push(`${at}: duplicate slug — two bundles cannot share a URL`);
    }
    slugs.add(slug);

    for (const field of ['name', 'tagline', 'description']) {
      checkBi(b[field], `${at}.${field}`, problems);
    }

    if (typeof b.status !== 'string' || !STATUSES.includes(b.status)) {
      problems.push(`${at}.status: "${String(b.status)}" is not one of ${STATUSES.join(', ')}`);
    }

    if (typeof b.price !== 'number' || !Number.isFinite(b.price) || b.price < 0) {
      problems.push(`${at}.price: expected a number of EGP, got "${String(b.price)}"`);
    }

    // The "was" price is optional, but a bundle claiming a saving that is zero
    // or negative would render as a strike-through above an equal or higher
    // number, which reads as a mistake because it is one.
    if (b.compareAtPrice !== undefined) {
      if (typeof b.compareAtPrice !== 'number' || !Number.isFinite(b.compareAtPrice)) {
        problems.push(`${at}.compareAtPrice: expected a number of EGP or nothing at all`);
      } else if (typeof b.price === 'number' && b.compareAtPrice <= b.price) {
        problems.push(
          `${at}.compareAtPrice: ${b.compareAtPrice} is not above the price of ${b.price} — ` +
            'the "was" price has to be higher, or leave it blank',
        );
      }
    }

    if (!Array.isArray(b.items) || b.items.length === 0) {
      problems.push(`${at}.items: a bundle needs at least one product in it`);
    } else {
      const seen = new Set<string>();
      b.items.forEach((rawItem, j) => {
        const item = rawItem as Record<string, unknown>;
        const where = `${at}.items[${j}]`;
        const itemSlug = typeof item?.slug === 'string' ? item.slug : '';

        if (!itemSlug) {
          problems.push(`${where}.slug: missing`);
        } else {
          const product = getProduct(itemSlug);
          if (!product) {
            problems.push(`${where}.slug: "${itemSlug}" is not an existing product`);
          } else if (product.status !== 'available') {
            // Not fatal to the data, but the bundle cannot be sold, so say so
            // plainly rather than let it quietly disappear from the storefront.
            problems.push(
              `${where}.slug: "${itemSlug}" is not available to buy, so this bundle ` +
                'cannot be sold — remove it, or set the bundle to hidden',
            );
          }
          if (seen.has(itemSlug)) {
            problems.push(
              `${where}.slug: "${itemSlug}" is listed twice — use one row and raise its quantity`,
            );
          }
          seen.add(itemSlug);
        }

        if (!Number.isInteger(item?.quantity) || (item.quantity as number) < 1) {
          problems.push(`${where}.quantity: expected a whole number of 1 or more`);
        }
      });
    }

    if (b.image !== undefined && (typeof b.image !== 'string' || !b.image.startsWith('/'))) {
      problems.push(`${at}.image: expected a path starting with "/"`);
    }
    if (b.featured !== undefined && typeof b.featured !== 'boolean') {
      problems.push(`${at}.featured: expected true or false`);
    }
  });

  return problems;
}
