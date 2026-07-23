'use client';

import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { news } from '@/content/company';
import { Container, Eyebrow } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/motion';
import { useI18n } from '@/i18n/LanguageProvider';
import type { Locale } from '@/i18n/dictionaries';

function formatDate(iso: string, locale: Locale) {
  return new Date(iso).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

const copy = {
  eyebrow: { en: 'Latest news', ar: 'آخر الأخبار' },
  titlePre: { en: 'What’s new at', ar: 'ما الجديد لدى' },
  titleAccent: { en: 'Loremed', ar: 'لوريمد' },
};

export function News() {
  const { locale, t } = useI18n();
  const items = news.slice(0, 3);

  return (
    <section id="news" className="section relative overflow-hidden bg-surface-muted">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>{copy.eyebrow[locale]}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-display-md sm:text-display-lg">
                {copy.titlePre[locale]} <span className="text-gradient">{copy.titleAccent[locale]}</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Button href="/#news" variant="outline" withArrow className="shrink-0">
              {t('cta.allNews')}
            </Button>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <StaggerItem key={item.slug} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-lift">
                <div
                  className={`relative h-40 overflow-hidden ${
                    i % 2 === 0
                      ? 'bg-gradient-to-br from-primary-700 to-primary-900'
                      : 'bg-gradient-to-br from-secondary-400 to-secondary-600'
                  }`}
                >
                  <svg viewBox="0 0 400 160" className="absolute inset-0 h-full w-full" aria-hidden fill="none">
                    <circle cx="330" cy="20" r="90" stroke="white" strokeOpacity="0.14" strokeWidth="1.5" />
                    <circle cx="330" cy="20" r="150" stroke="white" strokeOpacity="0.1" strokeWidth="1.5" />
                  </svg>
                  <span className="absolute bottom-4 left-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary-800 backdrop-blur">
                    {item.category[locale]}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 text-xs text-ink-muted">
                    <Calendar className="h-3.5 w-3.5" />
                    <time dateTime={item.date}>{formatDate(item.date, locale)}</time>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-primary-800">
                    {item.title[locale]}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{item.excerpt[locale]}</p>
                  <Link
                    href="/#news"
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary-700 transition-colors group-hover:text-secondary-600"
                  >
                    {t('cta.readMore')}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                  </Link>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
