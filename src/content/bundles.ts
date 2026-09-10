/**
 * Bundles — sets of products sold together at a price the shop sets by hand.
 *
 * Like the catalogue, the data lives in a JSON file so it can be edited at
 * /admin without touching code. Unlike the catalogue, an empty list is a valid
 * and expected state: until someone adds the first bundle, /offers keeps its
 * "coming soon" page and the ticker keeps saying so.
 *
 * Both prices are typed by the editor rather than derived from the products
 * inside. That is deliberate — the shop decides what a bundle is worth, and a
 * computed "was" price would silently change whenever a product's price moved.
 * The trade-off is that `compareAtPrice` can drift out of step with the real
 * total; `bundlesSchema.ts` checks it is at least above `price`, which catches
 * the mistake that would show a negative saving on the storefront.
 */

import type { Bi } from '@/i18n/dictionaries';
import bundlesData from './bundles.json';
import { getProduct } from './products';

export type BundleStatus = 'active' | 'hidden';

/** One product inside a bundle, and how many of it. */
export type BundleItem = {
  slug: string;
  quantity: number;
};

export type Bundle = {
  slug: string;
  name: Bi;
  tagline: Bi;
  description: Bi;
  /** What is in the box. Every slug must be a real, available product. */
  items: BundleItem[];
  /** What the customer pays, in EGP. */
  price: number;
  /**
   * The struck-through "was" price, in EGP. Optional — a bundle can exist
   * without claiming a saving. When present it must be above `price`.
   */
  compareAtPrice?: number;
  image?: string;
  /** `hidden` lets an editor draft a bundle without it appearing on the site. */
  status: BundleStatus;
  featured?: boolean;
};

/** See the note in products.ts: importing JSON widens the literal types. */
export const bundles = bundlesData as unknown as Bundle[];

/**
 * Featured bundles first, file order kept within each group.
 *
 * `sort` is stable by specification, so two bundles that are both featured —
 * or both not — stay in the order the editor arranged them in at /admin.
 * `bundles` itself is left alone: the cart looks bundles up by slug and should
 * not have its lists reshuffled by a flag that only means "show this first".
 */
export function featuredFirst(list: Bundle[]): Bundle[] {
  return [...list].sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
}

/** Only these reach the storefront. */
export function activeBundles(): Bundle[] {
  return featuredFirst(bundles.filter((b) => b.status === 'active'));
}

export function getBundle(slug: string): Bundle | undefined {
  return bundles.find((b) => b.slug === slug);
}

/**
 * A bundle is only sellable if everything in it is. A product going out of
 * stock, being renamed or moving to "under registration" should take its
 * bundles off the shelf rather than leave a buy button that resolves to
 * nothing.
 */
export function isBundleSellable(bundle: Bundle): boolean {
  return (
    bundle.status === 'active' &&
    bundle.items.length > 0 &&
    bundle.items.every((item) => getProduct(item.slug)?.status === 'available')
  );
}

/** The bundles a shopper should actually be shown, featured ones first. */
export function sellableBundles(): Bundle[] {
  return featuredFirst(bundles.filter(isBundleSellable));
}

/**
 * The bundles that earn a slide in the home-page slideshow.
 *
 * Featured is the editor's way of saying "put this in front of people", so it
 * does two things: lifts the bundle to the top of /offers, and gives it a slide
 * in the deck on the home page. A featured bundle that stops being sellable —
 * hidden, or something inside it went out of registration — loses both without
 * anyone having to remember to untick the box.
 */
export function featuredBundles(): Bundle[] {
  return sellableBundles().filter((b) => b.featured);
}

/**
 * What the contents would cost bought separately. Used only to sanity-check
 * an editor's `compareAtPrice` in tests — the storefront shows the typed
 * figure, not this one, because the shop sets its own prices.
 */
export function contentsTotal(bundle: Bundle): number {
  return bundle.items.reduce((sum, item) => {
    const product = getProduct(item.slug);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
}

/** EGP saved against the typed "was" price, or 0 when none is set. */
export function bundleSaving(bundle: Bundle): number {
  if (typeof bundle.compareAtPrice !== 'number') return 0;
  return Math.max(0, bundle.compareAtPrice - bundle.price);
}
