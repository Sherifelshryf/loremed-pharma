'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getProduct } from '@/content/products';
import { getBundle, isBundleSellable } from '@/content/bundles';
import {
  clampQuantity,
  sameCartItem,
  sanitizeCartItems,
  type CartItem,
  type CartKind,
} from '@/cart/cartMath';
import type { Bi } from '@/i18n/dictionaries';

/**
 * A cart line, flattened.
 *
 * Products and bundles are different shapes in the content layer but identical
 * to everything downstream: a name, a price, a quantity and a total. Resolving
 * them to one shape here means the order page and the WhatsApp invoice each
 * have a single code path rather than a branch per kind.
 */
export type CartLine = {
  kind: CartKind;
  slug: string;
  name: Bi;
  price: number;
  image?: string;
  /** Where the line's title links to. */
  href: string;
  quantity: number;
  lineTotal: number;
  /**
   * Bundles only: what is inside, resolved to names. The invoice lists these
   * under the bundle so whoever packs the order knows what to put in the box.
   */
  contents?: { name: Bi; quantity: number }[];
};

type CartContextValue = {
  items: CartItem[];
  lines: CartLine[];
  count: number;
  subtotal: number;
  addItem: (slug: string, quantity?: number, kind?: CartKind) => void;
  removeItem: (slug: string, kind?: CartKind) => void;
  setQuantity: (slug: string, quantity: number, kind?: CartKind) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'loremed-cart';

/**
 * Turns a stored item into a renderable line, or null if it no longer refers
 * to something that can be sold — a product withdrawn from sale, or a bundle
 * hidden or containing one. Dropping it here keeps an unsellable line out of
 * the totals and off the invoice.
 */
function resolveLine(item: CartItem): CartLine | null {
  if (item.kind === 'bundle') {
    const bundle = getBundle(item.slug);
    if (!bundle || !isBundleSellable(bundle)) return null;
    return {
      kind: 'bundle',
      slug: bundle.slug,
      name: bundle.name,
      price: bundle.price,
      image: bundle.image,
      href: '/offers',
      quantity: item.quantity,
      lineTotal: bundle.price * item.quantity,
      contents: bundle.items
        .map((entry) => {
          const product = getProduct(entry.slug);
          return product ? { name: product.name, quantity: entry.quantity } : null;
        })
        .filter((c): c is { name: Bi; quantity: number } => c !== null),
    };
  }

  const product = getProduct(item.slug);
  if (!product || product.status !== 'available') return null;
  return {
    kind: 'product',
    slug: product.slug,
    name: product.name,
    price: product.price,
    image: product.image,
    href: `/products/${product.slug}`,
    quantity: item.quantity,
    lineTotal: product.price * item.quantity,
  };
}

/** Refuses to add anything that is not currently sellable. */
function isAddable(slug: string, kind: CartKind): boolean {
  if (kind === 'bundle') {
    const bundle = getBundle(slug);
    return !!bundle && isBundleSellable(bundle);
  }
  return getProduct(slug)?.status === 'available';
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        // Untrusted: devtools, a stale schema from an older deploy, or a
        // hand-edited value could all put something malformed here.
        setItems(sanitizeCartItems(JSON.parse(raw)));
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, hydrated]);

  const addItem = useCallback((slug: string, quantity = 1, kind: CartKind = 'product') => {
    if (!isAddable(slug, kind)) return;
    const target = { slug, kind };
    setItems((prev) => {
      const existing = prev.find((i) => sameCartItem(i, target));
      if (existing) {
        return prev.map((i) =>
          sameCartItem(i, target) ? { ...i, quantity: clampQuantity(i.quantity + quantity) } : i,
        );
      }
      const added: CartItem = { slug, quantity: clampQuantity(quantity) };
      if (kind === 'bundle') added.kind = 'bundle';
      return [...prev, added];
    });
  }, []);

  const removeItem = useCallback((slug: string, kind: CartKind = 'product') => {
    setItems((prev) => prev.filter((i) => !sameCartItem(i, { slug, kind })));
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number, kind: CartKind = 'product') => {
    const target = { slug, kind };
    setItems((prev) => {
      if (quantity <= 0) return prev.filter((i) => !sameCartItem(i, target));
      return prev.map((i) =>
        sameCartItem(i, target) ? { ...i, quantity: clampQuantity(quantity) } : i,
      );
    });
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const lines = useMemo<CartLine[]>(
    () => items.map(resolveLine).filter((l): l is CartLine => l !== null),
    [items],
  );

  const count = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);
  const subtotal = useMemo(() => lines.reduce((sum, l) => sum + l.lineTotal, 0), [lines]);

  const value = useMemo<CartContextValue>(
    () => ({ items, lines, count, subtotal, addItem, removeItem, setQuantity, clear }),
    [items, lines, count, subtotal, addItem, removeItem, setQuantity, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
