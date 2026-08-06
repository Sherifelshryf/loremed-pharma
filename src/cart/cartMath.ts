/**
 * Pure cart arithmetic and validation, kept free of React so it can be unit
 * tested directly and reused by both the persisted-state reducer logic in
 * CartProvider and the order summary in OrderClient.
 */

/** Upper bound on how many units of one product a shopper can queue up. */
export const MAX_QUANTITY = 99;

export type CartItem = { slug: string; quantity: number };

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
      const { slug, quantity } = entry as CartItem;
      out.push({ slug, quantity: clampQuantity(quantity) });
    }
  }
  return out;
}

/** Delivery only applies once there's something to deliver. */
export function computeOrderTotal(subtotal: number, deliveryFee: number): number {
  return subtotal + (subtotal > 0 ? deliveryFee : 0);
}
