'use client';

import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import {
  products,
  categories,
  normalizeSearch,
  productSearchText,
  type ProductCategory,
  type ProductStatus,
} from '@/content/products';
import { Container } from '@/components/ui/Section';
import { ProductCard } from '@/components/ui/ProductCard';
import { categoryIcons } from '@/components/ui/categoryIcons';
import { useI18n } from '@/i18n/LanguageProvider';
import { QuickView } from './QuickView';
import { cn } from '@/lib/utils';

type CategoryFilter = ProductCategory | 'all';
type StatusFilter = ProductStatus | 'all';

const copy = {
  searchPlaceholder: { en: 'Search products & ingredients', ar: 'ابحث عن المنتجات والمكونات' },
  searchLabel: { en: 'Search products', ar: 'البحث في المنتجات' },
  status: { en: 'Status', ar: 'الحالة' },
  statusAll: { en: 'All', ar: 'الكل' },
  statusAvailable: { en: 'Available', ar: 'متوفر' },
  statusUnderReg: { en: 'Under Reg.', ar: 'قيد التسجيل' },
  allProducts: { en: 'All products', ar: 'كل المنتجات' },
  clearFilters: { en: 'Clear filters', ar: 'مسح الفلاتر' },
  in: { en: 'in', ar: 'في' },
  product: { en: 'product', ar: 'منتج' },
  productsPlural: { en: 'products', ar: 'منتجات' },
  emptyTitle: { en: 'No products match your filters', ar: 'لا توجد منتجات مطابقة لفلاترك' },
  emptyBody: { en: 'Try clearing the search or choosing a different category.', ar: 'جرّب مسح البحث أو اختيار فئة مختلفة.' },
};

export function ProductCatalogue() {
  const { locale } = useI18n();
  const params = useSearchParams();
  const initialCategory = (params.get('category') as CategoryFilter) || 'all';
  const initialStatus = (params.get('status') as StatusFilter) || 'all';
  const initialQuery = params.get('q') || '';

  const [category, setCategory] = useState<CategoryFilter>(
    categories.some((c) => c.id === initialCategory) ? initialCategory : 'all',
  );
  const [status, setStatus] = useState<StatusFilter>(
    ['available', 'under-registration'].includes(initialStatus) ? initialStatus : 'all',
  );
  const [query, setQuery] = useState(initialQuery);
  const [quickView, setQuickView] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = normalizeSearch(query);
    return products.filter((p) => {
      if (
        category !== 'all' &&
        p.category !== category &&
        !p.secondaryCategories?.includes(category)
      ) {
        return false;
      }
      if (status !== 'all' && p.status !== status) return false;
      if (q) {
        if (!normalizeSearch(productSearchText(p)).includes(q)) return false;
      }
      return true;
    });
  }, [category, status, query]);

  const hasFilters = category !== 'all' || status !== 'all' || query.trim() !== '';

  return (
    <section className="section pt-4">
      <Container>
        {/* Toolbar — sticky only from lg up; on mobile it scrolls away so it doesn't
            pin and eat the screen */}
        <div className="z-30 -mx-2 mb-8 rounded-3xl border border-line bg-white p-4 shadow-soft sm:p-5 lg:sticky lg:top-20">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-xs">
              <Search className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={copy.searchPlaceholder[locale]}
                className="h-12 w-full rounded-full border border-line bg-neutral-50 ps-11 pe-4 text-sm outline-none transition-colors focus:border-primary-400 focus:bg-white"
                aria-label={copy.searchLabel[locale]}
              />
            </div>

            {/* Status segmented control */}
            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-1.5 text-sm text-ink-muted sm:flex">
                <SlidersHorizontal className="h-4 w-4" />
                {copy.status[locale]}
              </span>
              <div className="inline-flex rounded-full border border-line bg-neutral-50 p-1">
                {(
                  [
                    { id: 'all', label: copy.statusAll },
                    { id: 'available', label: copy.statusAvailable },
                    { id: 'under-registration', label: copy.statusUnderReg },
                  ] as { id: StatusFilter; label: typeof copy.statusAll }[]
                ).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStatus(s.id)}
                    className={cn(
                      'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                      status === s.id ? 'bg-primary-800 text-white shadow-sm' : 'text-ink-soft hover:text-primary-800',
                    )}
                  >
                    {s.label[locale]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Category chips — one horizontal-scroll row on mobile (instead of wrapping
              into several rows); wrap normally from sm up */}
          <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto border-t border-line pt-4 sm:flex-wrap sm:overflow-visible">
            <FilterChip active={category === 'all'} onClick={() => setCategory('all')}>
              {copy.allProducts[locale]}
            </FilterChip>
            {categories.map((c) => {
              const Icon = categoryIcons[c.id];
              return (
                <FilterChip key={c.id} active={category === c.id} onClick={() => setCategory(c.id)}>
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                  {c.label[locale]}
                </FilterChip>
              );
            })}
          </div>
        </div>

        {/* Result meta */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-ink-soft">
            <span className="font-semibold text-ink">{filtered.length}</span>{' '}
            {filtered.length === 1 ? copy.product[locale] : copy.productsPlural[locale]}
            {category !== 'all' && (
              <>
                {' '}
                {copy.in[locale]}{' '}
                <span className="font-medium text-primary-700">
                  {categories.find((c) => c.id === category)?.label[locale]}
                </span>
              </>
            )}
          </p>
          {hasFilters && (
            <button
              onClick={() => {
                setCategory('all');
                setStatus('all');
                setQuery('');
              }}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-danger-600"
            >
              <X className="h-4 w-4" />
              {copy.clearFilters[locale]}
            </button>
          )}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} onQuickView={setQuickView} className="h-full" />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-line-strong bg-neutral-50 px-8 py-20 text-center">
            <p className="text-lg font-medium text-ink">{copy.emptyTitle[locale]}</p>
            <p className="mt-2 text-ink-muted">{copy.emptyBody[locale]}</p>
          </div>
        )}
      </Container>

      <QuickView slug={quickView} onClose={() => setQuickView(null)} />
    </section>
  );
}

function FilterChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-all',
        active
          ? 'border-primary-800 bg-primary-800 text-white shadow-sm'
          : 'border-line bg-white text-ink-soft hover:border-primary-300 hover:bg-primary-50 hover:text-primary-800',
      )}
    >
      {children}
    </button>
  );
}
