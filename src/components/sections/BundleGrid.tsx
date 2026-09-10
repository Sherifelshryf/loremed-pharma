'use client';

import { Tag, Check } from 'lucide-react';
import { useState } from 'react';
import { ProductImage } from '@/components/ui/ProductImage';
import { getProduct } from '@/content/products';
import { bundleSaving, type Bundle } from '@/content/bundles';
import { site } from '@/content/site';
import { useCart } from '@/cart/CartProvider';
import { useI18n } from '@/i18n/LanguageProvider';
import { cn } from '@/lib/utils';

/**
 * The bundle cards on /offers.
 *
 * Only rendered when there is at least one sellable bundle — the page keeps its
 * "coming soon" state otherwise, so this component never has to render an empty
 * grid.
 *
 * Both prices come from the data as typed by the editor. The saving shown is
 * simply the difference; nothing here recomputes a price from the products
 * inside, because the shop sets what a bundle is worth.
 */
export function BundleGrid({ bundles }: { bundles: Bundle[] }) {
  const { locale } = useI18n();
  const { addItem } = useCart();
  const currency = site.currency[locale];
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const add = (bundle: Bundle) => {
    addItem(bundle.slug, 1, 'bundle');
    setJustAdded(bundle.slug);
    window.setTimeout(() => setJustAdded((s) => (s === bundle.slug ? null : s)), 1600);
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {bundles.map((bundle) => {
        const saving = bundleSaving(bundle);
        const added = justAdded === bundle.slug;
        return (
          <article
            key={bundle.slug}
            className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card"
          >
            <div className="relative aspect-[4/3] bg-neutral-50">
              {bundle.image ? (
                <ProductImage
                  src={bundle.image}
                  alt={bundle.name[locale]}
                  className="absolute inset-0 h-full w-full object-contain p-6"
                />
              ) : (
                <span className="absolute inset-0 grid place-items-center text-danger-500/40">
                  <Tag className="h-12 w-12" strokeWidth={1.5} />
                </span>
              )}
              {saving > 0 && (
                <span className="absolute start-4 top-4 rounded-full bg-danger-600 px-3 py-1 text-xs font-semibold text-white">
                  {locale === 'ar'
                    ? `وفّر ${saving} ${currency}`
                    : `Save ${saving} ${currency}`}
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-lg font-semibold text-ink">{bundle.name[locale]}</h3>
              <p className="mt-1 text-sm text-secondary-600">{bundle.tagline[locale]}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {bundle.description[locale]}
              </p>

              {/* What is in the box. A bundle name alone does not say. */}
              <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
                {bundle.items.map((item) => {
                  const product = getProduct(item.slug);
                  if (!product) return null;
                  return (
                    <li key={item.slug} className="flex items-start gap-2 text-sm text-ink-soft">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary-500" strokeWidth={2.5} />
                      <span>
                        {product.name[locale]}
                        {item.quantity > 1 && ` ×${item.quantity}`}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto pt-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold text-ink">
                    {currency} {bundle.price}
                  </span>
                  {typeof bundle.compareAtPrice === 'number' && (
                    <span className="text-sm text-ink-muted line-through">
                      {currency} {bundle.compareAtPrice}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => add(bundle)}
                  className={cn(
                    'mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors',
                    added ? 'bg-success-600' : 'bg-primary-800 hover:bg-primary-700',
                  )}
                >
                  {added ? (
                    <>
                      <Check className="h-4 w-4" strokeWidth={2.5} />
                      {locale === 'ar' ? 'اتضاف للسلة' : 'Added to cart'}
                    </>
                  ) : (
                    <>
                      <Tag className="h-4 w-4" strokeWidth={2.5} />
                      {locale === 'ar' ? 'ضيف الباقة للسلة' : 'Add bundle to cart'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
