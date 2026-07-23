'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Search, X, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { products, categories } from '@/content/products';
import { primaryNav } from '@/content/site';
import { useI18n } from '@/i18n/LanguageProvider';
import { cn } from '@/lib/utils';

type Result = { label: string; href: string; group: string; sub?: string };

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const index = useMemo<Result[]>(() => {
    const productResults: Result[] = products.map((p) => ({
      label: p.name,
      href: `/products/${p.slug}`,
      group: 'Products',
      sub: p.tagline,
    }));
    const categoryResults: Result[] = categories.map((c) => ({
      label: c.label,
      href: `/products?category=${c.id}`,
      group: 'Categories',
      sub: c.description,
    }));
    const pageResults: Result[] = primaryNav.map((n) => ({
      label: n.label,
      href: n.href,
      group: 'Pages',
    }));
    return [...productResults, ...categoryResults, ...pageResults];
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index
      .filter((r) => r.label.toLowerCase().includes(q) || r.sub?.toLowerCase().includes(q))
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
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[250] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-primary-950/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t('search.title')}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-line bg-white shadow-glow"
            initial={{ opacity: 0, y: -18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 border-b border-line px-5">
              <Search className="h-5 w-5 shrink-0 text-ink-muted" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('search.placeholder')}
                className="h-16 w-full bg-transparent text-lg text-ink outline-none placeholder:text-ink-muted"
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
                      className="group flex items-center gap-4 rounded-2xl px-4 py-3 transition-colors hover:bg-primary-50"
                    >
                      <span
                        className={cn(
                          'grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xs font-bold',
                          r.group === 'Products'
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
                      <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-ink-muted">
                        {r.group}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-ink-muted opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
