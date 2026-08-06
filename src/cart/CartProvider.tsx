'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getProduct, type Product } from '@/content/products';
import { clampQuantity, sanitizeCartItems } from '@/cart/cartMath';

type CartLine = { product: Product; quantity: number; lineTotal: number };

type CartContextValue = {
  items: { slug: string; quantity: number }[];
  lines: CartLine[];
  count: number;
  subtotal: number;
  addItem: (slug: string, quantity?: number) => void;
  removeItem: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'loremed-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<{ slug: string; quantity: number }[]>([]);
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

  const addItem = useCallback((slug: string, quantity = 1) => {
    const product = getProduct(slug);
    if (!product || product.status !== 'available') return;
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === slug);
      if (existing) {
        return prev.map((i) =>
          i.slug === slug ? { ...i, quantity: clampQuantity(i.quantity + quantity) } : i,
        );
      }
      return [...prev, { slug, quantity: clampQuantity(quantity) }];
    });
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) return prev.filter((i) => i.slug !== slug);
      return prev.map((i) => (i.slug === slug ? { ...i, quantity: clampQuantity(quantity) } : i));
    });
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const lines = useMemo<CartLine[]>(() => {
    return items
      .map((i) => {
        const product = getProduct(i.slug);
        if (!product || product.status !== 'available') return null;
        return { product, quantity: i.quantity, lineTotal: product.price * i.quantity };
      })
      .filter((l): l is CartLine => l !== null);
  }, [items]);

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
