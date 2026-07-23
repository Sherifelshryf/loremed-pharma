'use client';

import { useState } from 'react';
import { Minus, Plus, ShoppingCart, Check } from 'lucide-react';
import type { Product } from '@/content/products';
import { site } from '@/content/site';
import { useI18n } from '@/i18n/LanguageProvider';
import { useCart } from '@/cart/CartProvider';
import { cn } from '@/lib/utils';

export function AddToCartBox({ product }: { product: Product }) {
  const { locale, t } = useI18n();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (product.status !== 'available') return null;

  function handleAdd() {
    addItem(product.slug, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <p className="text-2xl font-bold text-ink">
        {site.currency[locale]} {product.price}
      </p>
      <div className="inline-flex items-center rounded-full border border-line">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="grid h-11 w-11 place-items-center text-ink-soft transition-colors hover:text-primary-800"
          aria-label={t('order.quantity')}
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center text-sm font-semibold text-ink">{quantity}</span>
        <button
          type="button"
          onClick={() => setQuantity((q) => q + 1)}
          className="grid h-11 w-11 place-items-center text-ink-soft transition-colors hover:text-primary-800"
          aria-label={t('order.quantity')}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <button
        onClick={handleAdd}
        className={cn(
          'inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all',
          added
            ? 'bg-success-500 text-white'
            : 'bg-primary-800 text-white shadow-soft hover:bg-primary-700 hover:shadow-glow',
        )}
      >
        {added ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
        {added ? t('cta.added') : t('cta.addToCart')}
      </button>
    </div>
  );
}
