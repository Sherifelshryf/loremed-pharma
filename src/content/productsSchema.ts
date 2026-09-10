/**
 * Runtime validation for `products.json`.
 *
 * The catalogue is edited through the CMS now, which means the file can change
 * without anyone running a compiler over it. `products.ts` casts the imported
 * JSON to `Product[]`, so TypeScript is trusting rather than checking — this is
 * where the shape is actually enforced.
 *
 * `npm test` runs these checks, and the deploy workflow runs `npm test` before
 * it uploads anything, so a bad write fails in CI and the live site keeps
 * serving the last good version.
 *
 * Returns a list of human-readable problems rather than throwing on the first
 * one: an editor who broke three fields should hear about all three.
 */

import { categories } from './products';
import { isBlank } from './schemaUtils';

const CATEGORY_IDS = categories.map((c) => c.id) as string[];
const STATUSES = ['available', 'under-registration'];
const ACCENTS = ['purple', 'orange'];

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

function checkOneOf(value: unknown, allowed: string[], path: string, problems: string[]) {
  if (typeof value !== 'string' || !allowed.includes(value)) {
    problems.push(`${path}: "${String(value)}" is not one of ${allowed.join(', ')}`);
  }
}

export function validateProducts(data: unknown): string[] {
  const problems: string[] = [];

  if (!Array.isArray(data)) return ['top level: expected an array of products'];
  if (data.length === 0) return ['top level: no products — the catalogue would be empty'];

  const slugs = new Set<string>();

  data.forEach((raw, i) => {
    const p = raw as Record<string, unknown>;
    const slug = typeof p.slug === 'string' ? p.slug : '';
    // Identify the product by slug where possible: "ivylor" is far easier to
    // find in the CMS than "product 4".
    const at = slug ? `"${slug}"` : `product #${i + 1}`;

    if (!slug.trim()) {
      problems.push(`${at}: slug is missing or empty`);
    } else if (!/^[a-z0-9-]+$/.test(slug)) {
      // Spelled out as a character range on purpose. Tailwind scans every file
      // under src/ for class names — comments and string literals included —
      // and the English word for this would match a utility class, emitting a
      // CSS rule nothing on the site uses. The range is clearer anyway.
      problems.push(`${at}: slug may only contain a-z, 0-9 and hyphens`);
    } else if (slugs.has(slug)) {
      problems.push(`${at}: duplicate slug — two products cannot share a URL`);
    }
    slugs.add(slug);

    for (const field of [
      'name',
      'tagline',
      'form',
      'ageGroup',
      'pack',
      'shortDescription',
      'description',
      'usage',
    ]) {
      checkBi(p[field], `${at}.${field}`, problems);
    }

    checkOneOf(p.category, CATEGORY_IDS, `${at}.category`, problems);
    checkOneOf(p.status, STATUSES, `${at}.status`, problems);
    checkOneOf(p.accent, ACCENTS, `${at}.accent`, problems);

    if (typeof p.price !== 'number' || !Number.isFinite(p.price) || p.price < 0) {
      problems.push(`${at}.price: expected a number of EGP, got "${String(p.price)}"`);
    }

    if (!Array.isArray(p.keyIngredients) || p.keyIngredients.length === 0) {
      problems.push(`${at}.keyIngredients: expected at least one ingredient`);
    } else {
      p.keyIngredients.forEach((ing, j) => {
        const k = ing as Record<string, unknown>;
        checkBi(k?.name, `${at}.keyIngredients[${j}].name`, problems);
        checkBi(k?.note, `${at}.keyIngredients[${j}].note`, problems);
      });
    }

    if (!Array.isArray(p.benefits) || p.benefits.length === 0) {
      problems.push(`${at}.benefits: expected at least one benefit`);
    } else {
      p.benefits.forEach((b, j) => checkBi(b, `${at}.benefits[${j}]`, problems));
    }

    if (!isBlank(p.secondaryCategories)) {
      if (!Array.isArray(p.secondaryCategories)) {
        problems.push(`${at}.secondaryCategories: expected a list`);
      } else {
        p.secondaryCategories.forEach((c, j) =>
          checkOneOf(c, CATEGORY_IDS, `${at}.secondaryCategories[${j}]`, problems),
        );
      }
    }

    // Each of these is optional, and blank is how /admin records "cleared" —
    // see isBlank. A removed photo or an emptied video ID is a decision, not a
    // broken field.
    if (!isBlank(p.featured) && typeof p.featured !== 'boolean') {
      problems.push(`${at}.featured: expected true or false`);
    }
    if (!isBlank(p.image) && (typeof p.image !== 'string' || !p.image.startsWith('/'))) {
      problems.push(`${at}.image: expected a path starting with "/"`);
    }
    if (!isBlank(p.youtubeId) && typeof p.youtubeId !== 'string') {
      problems.push(`${at}.youtubeId: expected a string`);
    }
    // Removing the last related product can drop the key entirely rather than
    // leave an empty list, so absent has to mean the same as none.
    if (!isBlank(p.related) && !Array.isArray(p.related)) {
      problems.push(`${at}.related: expected a list of product slugs`);
    }
  });

  // Cross-references last, once every slug is known. Deleting a product in the
  // CMS is the easy way to leave a dangling "related product" pointing nowhere.
  data.forEach((raw) => {
    const p = raw as Record<string, unknown>;
    const at = typeof p.slug === 'string' && p.slug ? `"${p.slug}"` : 'a product';
    if (!Array.isArray(p.related)) return;
    p.related.forEach((r, j) => {
      if (typeof r !== 'string' || !slugs.has(r)) {
        problems.push(`${at}.related[${j}]: "${String(r)}" is not an existing product`);
      }
    });
  });

  return problems;
}
