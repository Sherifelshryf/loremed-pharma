'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X, Check, ArrowRight, Package, Users, Pipette } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { getProduct, statusLabels } from '@/content/products';
import { ProductVisual } from '@/components/ui/ProductCard';
import { useI18n } from '@/i18n/LanguageProvider';
import { cn } from '@/lib/utils';

const copy = {
  close: { en: 'Close', ar: 'إغلاق' },
  form: { en: 'Form', ar: 'الشكل الدوائي' },
  for: { en: 'For', ar: 'مناسب لـ' },
  pack: { en: 'Pack', ar: 'العبوة' },
  keyBenefits: { en: 'Key benefits', ar: 'الفوائد الرئيسية' },
  viewFull: { en: 'View full product', ar: 'عرض المنتج بالكامل' },
};

export function QuickView({ slug, onClose }: { slug: string | null; onClose: () => void }) {
  const { locale } = useI18n();
  const product = slug ? getProduct(slug) : null;

  useEffect(() => {
    if (slug) {
      document.body.style.overflow = 'hidden';
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
      window.addEventListener('keydown', onKey);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', onKey);
      };
    }
  }, [slug, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[250] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-primary-950/50 backdrop-blur-sm" onClick={onClose} aria-hidden />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={product.name}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative grid max-h-[90vh] w-full max-w-4xl grid-cols-1 overflow-hidden rounded-3xl border border-line bg-white shadow-glow md:grid-cols-2"
          >
            <button
              onClick={onClose}
              className="absolute end-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink-soft shadow-soft backdrop-blur transition-colors hover:text-ink"
              aria-label={copy.close[locale]}
            >
              <X className="h-5 w-5" />
            </button>

            {/* Visual side */}
            <div className="relative hidden md:block">
              <ProductVisual accent={product.accent} category={product.category} className="h-full" />
            </div>

            {/* Content side */}
            <div className="max-h-[90vh] overflow-y-auto p-7 sm:p-8">
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
                  product.status === 'available'
                    ? 'bg-success-50 text-success-700'
                    : 'bg-primary-50 text-primary-700',
                )}
              >
                {statusLabels[product.status][locale]}
              </span>
              <h2 className="mt-4 text-2xl font-semibold text-ink">{product.name}</h2>
              <p className="mt-1 font-medium text-secondary-600">{product.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">{product.description}</p>

              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <Meta icon={Pipette} label={copy.form[locale]} value={product.form} />
                <Meta icon={Users} label={copy.for[locale]} value={product.ageGroup} />
                <Meta icon={Package} label={copy.pack[locale]} value={product.pack} />
              </div>

              <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-ink-muted">{copy.keyBenefits[locale]}</h3>
              <ul className="mt-3 space-y-2">
                {product.benefits.slice(0, 4).map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-ink-soft">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success-500" strokeWidth={2.5} />
                    {b}
                  </li>
                ))}
              </ul>

              <Link
                href={`/products/${product.slug}`}
                onClick={onClose}
                className="group mt-7 inline-flex items-center gap-2 rounded-full bg-primary-800 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-primary-700 hover:shadow-glow"
              >
                {copy.viewFull[locale]}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Meta({ icon: Icon, label, value }: { icon: typeof Package; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-neutral-50 p-3">
      <div className="flex items-center gap-1.5 text-xs text-ink-muted">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="mt-1 font-medium text-ink">{value}</div>
    </div>
  );
}
