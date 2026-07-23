'use client';

import { Globe } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageProvider';
import { localeMeta, type Locale } from '@/i18n/dictionaries';
import { cn } from '@/lib/utils';

export function LanguageSwitcher({ inverse = false, className }: { inverse?: boolean; className?: string }) {
  const { locale, setLocale } = useI18n();
  const locales: Locale[] = ['en', 'ar'];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-full border p-1',
        inverse ? 'border-white/20 bg-white/10' : 'border-line bg-white/70 backdrop-blur',
        className,
      )}
      role="group"
      aria-label="Language"
    >
      <Globe className={cn('ms-1.5 h-3.5 w-3.5', inverse ? 'text-white/70' : 'text-ink-muted')} aria-hidden />
      {locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={active}
            className={cn(
              'rounded-full px-2.5 py-1 text-xs font-semibold transition-colors',
              active
                ? 'bg-primary-800 text-white shadow-sm'
                : inverse
                  ? 'text-white/70 hover:text-white'
                  : 'text-ink-soft hover:text-primary-800',
              l === 'ar' && 'font-arabic',
            )}
          >
            {l === 'ar' ? localeMeta.ar.native : 'EN'}
          </button>
        );
      })}
    </div>
  );
}
