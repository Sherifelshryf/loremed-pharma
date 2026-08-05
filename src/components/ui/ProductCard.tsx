'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ProductImage } from './ProductImage';
import { ArrowRight, Eye, ShoppingCart, Check } from 'lucide-react';
import type { Product, ProductCategory } from '@/content/products';
import { statusLabels, categories } from '@/content/products';
import { categoryIcons } from './categoryIcons';
import { site } from '@/content/site';
import { useI18n } from '@/i18n/LanguageProvider';
import { useCart } from '@/cart/CartProvider';
import { cn } from '@/lib/utils';

/** Product visual — shows product image if available, otherwise falls back to branded gradient. */
export function ProductVisual({
  accent,
  category,
  image,
  name,
  className,
}: {
  accent: 'purple' | 'orange';
  category: ProductCategory;
  image?: string;
  name?: string;
  className?: string;
}) {
  const Icon = categoryIcons[category];

  if (image) {
    return (
      <div className={cn('relative aspect-[16/11] w-full overflow-hidden bg-white', className)}>
        <ProductImage
          src={image}
          alt={name ?? ''}
          className="absolute inset-0 h-full w-full object-contain p-4"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative aspect-[16/11] w-full overflow-hidden',
        accent === 'purple'
          ? 'bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900'
          : 'bg-gradient-to-br from-secondary-400 via-secondary-500 to-secondary-700',
        className,
      )}
    >
      {/* geometric quarter arcs */}
      <svg viewBox="0 0 400 260" className="absolute inset-0 h-full w-full" aria-hidden fill="none">
        <circle cx="320" cy="40" r="150" stroke="white" strokeOpacity="0.12" strokeWidth="1.5" />
        <circle cx="320" cy="40" r="100" stroke="white" strokeOpacity="0.14" strokeWidth="1.5" />
        <path d="M0 230 Q120 150 400 210" stroke="white" strokeOpacity="0.14" strokeWidth="1.5" />
      </svg>
      <div
        aria-hidden
        className="absolute -right-10 -top-12 h-48 w-48 rounded-full bg-white/10"
      />
      {/* glass emblem */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid h-20 w-20 place-items-center rounded-3xl border border-white/25 bg-white/15">
          <Icon className="h-9 w-9 text-white" strokeWidth={1.6} />
        </div>
      </div>
    </div>
  );
}

export function ProductCard({
  product,
  onQuickView,
  className,
}: {
  product: Product;
  onQuickView?: (slug: string) => void;
  className?: string;
}) {
  const { locale, t } = useI18n();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const categoryLabel = categories.find((c) => c.id === product.category)?.label[locale] ?? product.category;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.slug);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-lift',
        className,
      )}
    >
      <div className="relative overflow-hidden">
        <div className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]">
          <ProductVisual accent={product.accent} category={product.category} image={product.image} name={product.name} />
        </div>
        {/* status badge */}
        <span
          className={cn(
            'absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
            product.status === 'available'
              ? 'bg-white text-success-700'
              : 'bg-primary-950/70 text-white',
          )}
        >
          <span
            className={cn(
              'h-1.5 w-1.5 rounded-full',
              product.status === 'available' ? 'bg-success-500' : 'bg-secondary-400',
            )}
          />
          {statusLabels[product.status][locale]}
        </span>
        {onQuickView && (
          <button
            onClick={() => onQuickView(product.slug)}
            className="absolute right-4 top-4 grid h-9 w-9 translate-y-1 place-items-center rounded-full bg-white text-primary-800 opacity-0 shadow-soft transition-all duration-300 hover:bg-white group-hover:translate-y-0 group-hover:opacity-100"
            aria-label={`${t('cta.quickView')} ${product.name}`}
          >
            <Eye className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">
          <span className="text-secondary-600">{categoryLabel}</span>
          <span className="text-line-strong">·</span>
          <span>{product.form}</span>
        </div>
        <h3 className="mt-2 text-xl font-semibold text-ink transition-colors group-hover:text-primary-800">
          <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-medium text-secondary-600">{product.tagline}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{product.shortDescription}</p>

        {product.status === 'available' ? (
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
            <div>
              <div className="text-xs text-ink-muted">{product.ageGroup}</div>
              <div className="mt-0.5 text-base font-bold text-ink">
                {site.currency[locale]} {product.price}
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className={cn(
                'relative z-10 inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all',
                added
                  ? 'bg-success-500 text-white'
                  : 'bg-primary-800 text-white hover:bg-primary-700 hover:shadow-glow',
              )}
            >
              {added ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
              {added ? t('cta.added') : t('cta.addToCart')}
            </button>
          </div>
        ) : (
          <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
            <span className="text-xs text-ink-muted">{product.ageGroup}</span>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-700 transition-colors group-hover:text-secondary-600">
              {t('cta.viewProduct')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
