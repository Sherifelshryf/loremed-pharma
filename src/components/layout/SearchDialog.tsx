'use client';

import { Search, X, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { products, categories, normalizeSearch, productSearchText } from '@/content/products';
import { primaryNav } from '@/content/site';
import { NAV_T } from '@/content/navKeys';
import { useI18n } from '@/i18n/LanguageProvider';
import { cn } from '@/lib/utils';

type Result = {
  label: string;
  href: string;
  group: string;
  kind: 'product' | 'category' | 'page';
  sub?: string;
  /** Extra text this result can be matched on beyond its visible label/sub. */
  haystack?: string;
};

const groupLabels = {
  Products: { en: 'Products', ar: 'المنتجات' },
  Categories: { en: 'Categories', ar: 'الفئات' },
  Pages: { en: 'Pages', ar: 'الصفحات' },
};

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { locale, t } = useI18n();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const index = useMemo<Result[]>(() => {
    const productResults: Result[] = products.map((p) => ({
      label: p.name,
      href: `/products/${p.slug}`,
      group: groupLabels.Products[locale],
      kind: 'product',
      sub: p.tagline,
      // Index ingredients, benefits and description too — otherwise a product is
      // unfindable by what it actually contains unless its tagline says so.
      haystack: productSearchText(p),
    }));
    const categoryResults: Result[] = categories.map((c) => ({
      label: c.label[locale],
      href: `/products?category=${c.id}`,
      group: groupLabels.Categories[locale],
      kind: 'category',
      sub: c.description[locale],
    }));
    const pageResults: Result[] = primaryNav.map((n) => ({
      label: t(NAV_T[n.label] ?? 'nav.home'),
      href: n.href,
      group: groupLabels.Pages[locale],
      kind: 'page',
    }));
    return [...productResults, ...categoryResults, ...pageResults];
  }, [locale, t]);

  const results = useMemo(() => {
    const q = normalizeSearch(query);
    if (!q) return [];
    return index
      .filter((r) =>
        normalizeSearch(`${r.label} ${r.sub ?? ''} ${r.haystack ?? ''}`).includes(q),
      )
      .slice(0, 8);
  }, [index, query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      const id = window.setTimeout(() => inputRef.current?.focus(), 60);
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
      return () => {
        window.clearTimeout(id);
        window.removeEventListener('keydown', onKey);
        document.body.style.overflow = '';
      };
    }
  }, [open, onClose]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[250] flex items-start justify-center px-3 pt-[8vh] sm:px-4 sm:pt-[12vh]"
        >
          <div
            className="absolute inset-0 bg-primary-950/40"
            onClick={onClose}
            aria-hidden
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t('search.title')}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-line bg-white shadow-glow"
          >
            <div className="flex items-center gap-3 border-b border-line px-4 sm:px-5">
              <Search className="h-5 w-5 shrink-0 text-ink-muted" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('search.placeholder')}
                className="h-14 w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-muted sm:h-16 sm:text-lg"
                aria-label={t('search.placeholder')}
              />
              <button
                onClick={onClose}
                className="rounded-full p-2 text-ink-muted transition-colors hover:bg-neutral-100 hover:text-ink"
                aria-label={t('nav.close')}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-2">
              {!query && (
                <p className="px-4 py-8 text-center text-sm text-ink-muted">{t('search.empty')}</p>
              )}
              {query && results.length === 0 && (
                <p className="px-4 py-8 text-center text-sm text-ink-muted">{t('search.noResults')}</p>
              )}
              <ul>
                {results.map((r, i) => (
                  <li key={`${r.href}-${i}`}>
                    <Link
                      href={r.href}
                      onClick={onClose}
                      className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-primary-50 sm:gap-4 sm:px-4 sm:py-3"
                    >
                      <span
                        className={cn(
                          'grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xs font-bold',
                          r.kind === 'product'
                            ? 'bg-secondary-50 text-secondary-600'
                            : 'bg-primary-50 text-primary-700',
                        )}
                      >
                        {r.label.slice(0, 2).toUpperCase()}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium text-ink">{r.label}</span>
                        {r.sub && <span className="block truncate text-sm text-ink-muted">{r.sub}</span>}
                      </span>
                      {/* Group tag eats width and truncates the tagline on phones — desktop only */}
                      <span className="hidden shrink-0 text-[0.7rem] font-semibold uppercase tracking-wider text-ink-muted sm:inline">
                        {r.group}
                      </span>
                      <ArrowUpRight className="hidden h-4 w-4 shrink-0 text-ink-muted opacity-0 transition-opacity group-hover:opacity-100 sm:block" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
