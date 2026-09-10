/**
 * Pure cart arithmetic and validation, kept free of React so it can be unit
 * tested directly and reused by both the persisted-state reducer logic in
 * CartProvider and the order summary in OrderClient.
 */

/** Upper bound on how many units of one product a shopper can queue up. */
export const MAX_QUANTITY = 99;

/**
 * What a cart line points at. A bundle is a set of products sold together at
 * its own price, so it cannot be resolved through the product catalogue.
 */
export type CartKind = 'product' | 'bundle';

/**
 * `kind` is optional and absent means 'product'. Carts saved by an earlier
 * deploy have no such field, and a shopper who left something in their basket
 * should not lose it because the shape grew.
 */
export type CartItem = { slug: string; quantity: number; kind?: CartKind };

/** Cart identity is the pair, not the slug — a bundle may share a product's slug. */
export function sameCartItem(a: Pick<CartItem, 'slug' | 'kind'>, b: Pick<CartItem, 'slug' | 'kind'>) {
  return a.slug === b.slug && (a.kind ?? 'product') === (b.kind ?? 'product');
}

/** Keeps a quantity a whole number between 1 and MAX_QUANTITY. */
export function clampQuantity(quantity: number): number {
  return Math.min(Math.max(Math.trunc(quantity), 1), MAX_QUANTITY);
}

/**
 * localStorage is user-writable (devtools, a stale schema from a previous
 * deploy, hand-editing), so a parsed cart is untrusted input. This keeps only
 * entries with a real string slug and a positive integer quantity — anything
 * with a negative, fractional, NaN or string quantity, or a non-string slug,
 * is dropped rather than flowing into lineTotal/the invoice total.
 */
export function sanitizeCartItems(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];
  const out: CartItem[] = [];
  for (const entry of value) {
    if (
      entry &&
      typeof entry === 'object' &&
      typeof (entry as { slug?: unknown }).slug === 'string' &&
      (entry as { slug: string }).slug.length > 0 &&
      Number.isInteger((entry as { quantity?: unknown }).quantity) &&
      (entry as { quantity: number }).quantity > 0
    ) {
      const { slug, quantity, kind } = entry as CartItem;
      // Anything that is not the literal 'bundle' is treated as a product,
      // which covers both older carts with no kind at all and a tampered value.
      out.push(
        kind === 'bundle'
          ? { slug, quantity: clampQuantity(quantity), kind: 'bundle' }
          : { slug, quantity: clampQuantity(quantity) },
      );
    }
  }
  return out;
}

/** Delivery only applies once there's something to deliver. */
export function computeOrderTotal(subtotal: number, deliveryFee: number): number {
  return subtotal + (subtotal > 0 ? deliveryFee : 0);
}
