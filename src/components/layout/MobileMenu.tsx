'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, X, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { primaryNav, site } from '@/content/site';
import { NAV_T } from '@/content/navKeys';
import { useI18n } from '@/i18n/LanguageProvider';
import { useCart } from '@/cart/CartProvider';
import { Logo } from '@/components/logo/Logo';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { cn } from '@/lib/utils';

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { locale, t } = useI18n();
  const { count } = useCart();
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
      window.addEventListener('keydown', onKey);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', onKey);
      };
    }
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[190] bg-primary-950/40 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            className="fixed inset-y-0 end-0 z-[200] flex w-[min(88vw,26rem)] flex-col bg-white shadow-glow lg:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            role="dialog"
            aria-modal="true"
            aria-label={t('nav.menu')}
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <Logo />
              <div className="flex items-center gap-1">
                <Link
                  href="/order"
                  onClick={onClose}
                  className="relative grid h-10 w-10 place-items-center rounded-full text-ink-soft hover:bg-neutral-100"
                  aria-label={t('nav.cart')}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {count > 0 && (
                    <span className="absolute -top-0.5 end-0 grid h-4 min-w-4 place-items-center rounded-full bg-secondary-500 px-1 text-[0.65rem] font-bold text-white">
                      {count}
                    </span>
                  )}
                </Link>
                <button
                  onClick={onClose}
                  className="grid h-10 w-10 place-items-center rounded-full text-ink-soft hover:bg-neutral-100"
                  aria-label={t('nav.close')}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
              <ul className="flex flex-col gap-1">
                {primaryNav.map((item) => {
                  const hasChildren = !!item.children?.length;
                  const isOpen = expanded === item.label;
                  return (
                    <li key={item.label} className="border-b border-line/70 last:border-0">
                      <div className="flex items-center">
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="flex-1 py-3.5 ps-3 text-lg font-medium text-ink"
                        >
                          {t(NAV_T[item.label] ?? 'nav.home')}
                        </Link>
                        {hasChildren && (
                          <button
                            onClick={() => setExpanded(isOpen ? null : item.label)}
                            className="grid h-11 w-11 place-items-center rounded-full text-ink-soft hover:bg-neutral-100"
                            aria-label={`${t('nav.menu')}: ${t(NAV_T[item.label] ?? 'nav.home')}`}
                            aria-expanded={isOpen}
                          >
                            <ChevronDown className={cn('h-5 w-5 transition-transform', isOpen && 'rotate-180')} />
                          </button>
                        )}
                      </div>
                      <AnimatePresence initial={false}>
                        {hasChildren && isOpen && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden ps-3"
                          >
                            {item.children!.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={onClose}
                                  className="block rounded-xl px-3 py-2.5 text-[0.95rem] text-ink-soft hover:bg-primary-50 hover:text-primary-800"
                                >
                                  {child.label[locale]}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="space-y-4 border-t border-line px-5 py-5">
              <LanguageSwitcher className="w-full justify-center" />
              <Button href="/products" onClick={onClose} className="w-full" variant="primary">
                {t('cta.navExplore')}
              </Button>
              <p className="text-center text-sm text-ink-muted">{site.email}</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
