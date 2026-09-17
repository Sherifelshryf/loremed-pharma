/**
 * Keeps a bad record from taking the whole site down with it.
 *
 * The deploy used to refuse to publish anything if any part of the content was
 * invalid. That is defensible — better a stale site than a broken one — but in
 * practice it meant one mistyped field in one bundle held back every other
 * edit, and the person who made it saw only a CMS that said "saved" and a site
 * that never changed. It happened twice.
 *
 * So the rule is inverted here. A record that cannot be rendered is **skipped**
 * and everything else is published; a record that is merely imperfect is
 * published as it is. Nothing an editor can type stops the deploy.
 *
 * Three kinds of outcome:
 *
 *   skipped   the record cannot be drawn at all — no slug to build a URL from,
 *             no name to print, a price that is not a number. Left out.
 *   repaired  something had a safe answer: an unknown status becomes the
 *             cautious one, a "was" price below the real price is simply
 *             dropped so no badge appears.
 *   warned    everything else. Published untouched, reported afterwards.
 *
 * All three are reported in the deploy summary, because dropping content
 * quietly is its own kind of failure. The point is that the report arrives
 * *after* a successful deploy rather than instead of one.
 *
 * This file deliberately imports nothing from products.ts: that module calls
 * into here, and the category list arrives as an argument instead.
 */

export type Outcome = {
  /** Records left out entirely, with the reason. */
  skipped: string[];
  /** Values quietly corrected to something safe, with what was done. */
  repaired: string[];
};

export const emptyOutcome = (): Outcome => ({ skipped: [], repaired: [] });

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

const SLUG = /^[a-z0-9-]+$/;

/** How a record is referred to in the report. */
function nameOf(entry: unknown, fallback: string): string {
  if (isObject(entry) && typeof entry.slug === 'string' && entry.slug.trim() !== '') {
    return `"${entry.slug}"`;
  }
  return fallback;
}

/** A bilingual field is usable if at least one side has words in it. */
function usableBi(v: unknown): boolean {
  if (!isObject(v)) return false;
  return (['en', 'ar'] as const).some(
    (l) => typeof v[l] === 'string' && (v[l] as string).trim() !== '',
  );
}

function usableSlug(v: unknown): v is string {
  return typeof v === 'string' && SLUG.test(v);
}

function usablePrice(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v) && v >= 0;
}

/**
 * Drops products that cannot be drawn, and repairs the ones that can.
 *
 * `categoryIds` is passed in rather than imported to keep this module free of
 * any dependency on the catalogue it is cleaning.
 */
export function sanitiseProducts(
  raw: unknown,
  categoryIds: string[],
  statuses: string[],
  accents: string[],
): { products: Record<string, unknown>[]; outcome: Outcome } {
  const outcome = emptyOutcome();
  if (!Array.isArray(raw)) {
    outcome.skipped.push('products.json is not a list, so no products could be read at all');
    return { products: [], outcome };
  }

  const seen = new Set<string>();
  const products: Record<string, unknown>[] = [];

  raw.forEach((entry, i) => {
    // Named by its slug even when the slug is the problem: "SMART OD" tells an
    // editor which row to look at, "product #7" makes them count.
    const at = nameOf(entry, `product #${i + 1}`);

    if (!isObject(entry)) return void outcome.skipped.push(`${at}: not a product record`);
    if (!usableSlug(entry.slug))
      return void outcome.skipped.push(
        `${at}: the URL slug is missing or has characters other than a-z, 0-9 and hyphens, so the page has no address`,
      );
    if (seen.has(entry.slug as string))
      return void outcome.skipped.push(`${at}: a product with this slug already exists`);
    if (!usableBi(entry.name))
      return void outcome.skipped.push(`${at}: no name in either language, so nothing could be shown`);
    if (!usablePrice(entry.price))
      return void outcome.skipped.push(
        `${at}: the price is "${String(entry.price)}" rather than a number, which would break the basket`,
      );
    if (typeof entry.category !== 'string' || !categoryIds.includes(entry.category))
      return void outcome.skipped.push(
        `${at}: the category "${String(entry.category)}" is not one the site knows about`,
      );

    const p = { ...entry };
    seen.add(p.slug as string);

    // Repairs. Each has a safe answer, so the product stays on sale.
    if (typeof p.status !== 'string' || !statuses.includes(p.status)) {
      outcome.repaired.push(
        `${at}: status "${String(p.status)}" is not recognised — treated as not yet available, so it shows but cannot be bought`,
      );
      p.status = 'under-registration';
    }
    if (typeof p.accent !== 'string' || !accents.includes(p.accent)) {
      outcome.repaired.push(`${at}: card colour "${String(p.accent)}" is not recognised — using purple`);
      p.accent = 'purple';
    }
    if (p.secondaryCategories !== undefined) {
      const list = Array.isArray(p.secondaryCategories) ? p.secondaryCategories : [];
      const kept = list.filter((c) => typeof c === 'string' && categoryIds.includes(c));
      if (kept.length !== list.length || !Array.isArray(p.secondaryCategories)) {
        outcome.repaired.push(`${at}: dropped an unrecognised entry from "Also list under"`);
      }
      p.secondaryCategories = kept;
    }
    if (!Array.isArray(p.related)) p.related = [];
    if (!Array.isArray(p.keyIngredients)) p.keyIngredients = [];
    if (!Array.isArray(p.benefits)) p.benefits = [];

    products.push(p);
  });

  // Related products are resolved last, once every surviving slug is known: a
  // link to a product that was skipped would render as a card with no content.
  const alive = new Set(products.map((p) => p.slug as string));
  for (const p of products) {
    const list = p.related as unknown[];
    const kept = list.filter((r) => typeof r === 'string' && alive.has(r) && r !== p.slug);
    if (kept.length !== list.length) {
      outcome.repaired.push(
        `"${p.slug}": dropped a related-product link that does not point at a product on the site`,
      );
    }
    p.related = kept;
  }

  return { products, outcome };
}

/**
 * Drops bundles that cannot be drawn, and repairs the ones that can.
 *
 * `sellableSlugs` is the set of product slugs that survived above — a bundle
 * pointing at a product that no longer exists loses that line rather than
 * taking the bundle, or the deploy, with it.
 */
export function sanitiseBundles(
  raw: unknown,
  knownSlugs: Set<string>,
  statuses: string[],
): { bundles: Record<string, unknown>[]; outcome: Outcome } {
  const outcome = emptyOutcome();
  // An absent or malformed bundles file is not an error: no bundles is a real
  // state, and /offers is built to say "coming soon" for exactly that.
  if (!Array.isArray(raw)) {
    if (raw !== undefined && raw !== null) {
      outcome.skipped.push('bundles.json is not a list, so no offers could be read');
    }
    return { bundles: [], outcome };
  }

  const seen = new Set<string>();
  const bundles: Record<string, unknown>[] = [];

  raw.forEach((entry, i) => {
    const at = nameOf(entry, `bundle #${i + 1}`);

    if (!isObject(entry)) return void outcome.skipped.push(`${at}: not a bundle record`);
    if (!usableSlug(entry.slug))
      return void outcome.skipped.push(
        `${at}: the slug is missing or has characters other than a-z, 0-9 and hyphens`,
      );
    if (seen.has(entry.slug as string))
      return void outcome.skipped.push(`${at}: a bundle with this slug already exists`);
    if (!usableBi(entry.name))
      return void outcome.skipped.push(`${at}: no name in either language`);
    if (!usablePrice(entry.price))
      return void outcome.skipped.push(
        `${at}: the price is "${String(entry.price)}" rather than a number`,
      );

    const b = { ...entry };

    // Contents. A line pointing at something that is not a product is dropped;
    // a bundle left with nothing in it cannot be sold and is skipped.
    const items = Array.isArray(b.items) ? b.items : [];
    const kept = items.filter((raw) => {
      if (!isObject(raw) || typeof raw.slug !== 'string' || !knownSlugs.has(raw.slug)) {
        outcome.repaired.push(
          `${at}: removed a line for "${isObject(raw) ? String(raw.slug) : 'an empty row'}", which is not a product on the site`,
        );
        return false;
      }
      return true;
    }).map((raw) => {
      const item = { ...(raw as Record<string, unknown>) };
      const q = item.quantity;
      if (!Number.isInteger(q) || (q as number) < 1) {
        outcome.repaired.push(`${at}: quantity "${String(q)}" for "${item.slug}" is not a whole number — using 1`);
        item.quantity = 1;
      }
      return item;
    });

    if (kept.length === 0)
      return void outcome.skipped.push(
        `${at}: nothing in it is a product on the site, so there is nothing to sell`,
      );
    b.items = kept;
    seen.add(b.slug as string);

    if (typeof b.status !== 'string' || !statuses.includes(b.status)) {
      outcome.repaired.push(
        `${at}: status "${String(b.status)}" is not recognised — hidden, so it stays off the site until someone sets it`,
      );
      b.status = 'hidden';
    }

    // The "was" price is the one an editor is most likely to get wrong, and the
    // wrong version renders a negative saving. Dropping it costs a badge; it
    // used to cost the whole deploy.
    if (b.compareAtPrice !== undefined && b.compareAtPrice !== null && b.compareAtPrice !== '') {
      const was = b.compareAtPrice;
      if (!usablePrice(was) || (was as number) <= (b.price as number)) {
        outcome.repaired.push(
          `${at}: the "was" price ${String(was)} is not above the price ${String(b.price)} — no saving is shown`,
        );
        delete b.compareAtPrice;
      }
    } else {
      delete b.compareAtPrice;
    }

    if (typeof b.image !== 'string' || !b.image.startsWith('/')) {
      if (!isBlankish(b.image)) {
        outcome.repaired.push(`${at}: the photo path "${String(b.image)}" is not usable — showing the products instead`);
      }
      delete b.image;
    }

    bundles.push(b);
  });

  return { bundles, outcome };
}

const isBlankish = (v: unknown) => v === undefined || v === null || v === '';
