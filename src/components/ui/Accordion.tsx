'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useI18n } from '@/i18n/LanguageProvider';
import type { Bi } from '@/i18n/dictionaries';
import { cn } from '@/lib/utils';

export function Accordion({ items }: { items: { q: Bi; a: Bi }[] }) {
  const { locale } = useI18n();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start transition-colors hover:bg-neutral-50 sm:px-8"
              aria-expanded={isOpen}
            >
              <span className={cn('text-lg font-medium', isOpen ? 'text-primary-800' : 'text-ink')}>
                {item.q[locale]}
              </span>
              <span
                className={cn(
                  'grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300',
                  isOpen
                    ? 'rotate-45 border-secondary-500 bg-secondary-500 text-white'
                    : 'border-line text-ink-soft',
                )}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-ink-soft sm:px-8">{item.a[locale]}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
