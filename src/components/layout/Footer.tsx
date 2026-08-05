'use client';

import Link from 'next/link';
import { Facebook, Youtube, Linkedin, ArrowUp, Mail, Check, ArrowRight } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { footerNav, site, medicalDisclaimer } from '@/content/site';
import { useI18n } from '@/i18n/LanguageProvider';
import { Logo } from '@/components/logo/Logo';
import { LogoMark } from '@/components/logo/Logo';
import { cn } from '@/lib/utils';

const socials = [
  { icon: Facebook, href: site.social.facebook, label: 'Facebook' },
  { icon: Linkedin, href: site.social.linkedin, label: 'LinkedIn' },
  { icon: Youtube, href: site.social.youtube, label: 'YouTube' },
];

export function Footer() {
  const { locale, t } = useI18n();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function onSubscribe(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  }

  return (
    <footer className="relative overflow-hidden bg-primary-950 text-white">
      {/* decorative mark */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.06]">
        <LogoMark className="absolute -bottom-24 -end-16 h-[32rem] rotate-6" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary-700/30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-secondary-500/10"
      />

      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-8">
        {/* Newsletter */}
        <div className="grid gap-8 border-b border-white/10 py-14 md:grid-cols-2 md:items-center">
          <div className="max-w-md">
            <h3 className="text-2xl font-semibold text-white">{t('footer.newsletter')}</h3>
            <p className="mt-2 text-white/60">{t('footer.newsletterBody')}</p>
          </div>
          <form onSubmit={onSubscribe} className="w-full">
            {subscribed ? (
              <div className="flex items-center gap-3 rounded-full border border-success-500/40 bg-success-500/10 px-6 py-4 text-sm font-medium text-success-100">
                <Check className="h-5 w-5 text-success-500" />
                {locale === 'ar' ? 'أنت مشترك الآن — مرحبًا بك في لورميد.' : 'You’re subscribed — welcome to Loremed.'}
              </div>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="relative flex-1">
                  <span className="sr-only">{t('footer.emailPlaceholder')}</span>
                  <Mail className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('footer.emailPlaceholder')}
                    className="h-14 w-full rounded-full border border-white/15 bg-white/5 ps-12 pe-4 text-white outline-none transition-colors placeholder:text-white/40 focus:border-secondary-400 focus:bg-white/10"
                  />
                </label>
                <button
                  type="submit"
                  className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-secondary-500 px-7 font-medium text-white transition-all hover:bg-secondary-600 hover:shadow-glow-orange"
                >
                  {t('footer.subscribe')}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Main grid */}
        <div className="grid gap-10 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo variant="inverse" />
            <p className="mt-5 text-white/60">{t('footer.tagline')}</p>
            <p className="mt-5 text-sm leading-relaxed text-white/50">
              {site.city}, {site.country}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-1 inline-block text-sm text-white/70 transition-colors hover:text-secondary-300"
            >
              {site.email}
            </a>
            <div className="mt-6 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/12 text-white/70 transition-all hover:border-secondary-400 hover:bg-white/5 hover:text-secondary-300"
                >
                  <s.icon className="h-[1.05rem] w-[1.05rem]" />
                </a>
              ))}
            </div>
          </div>

          {footerNav.map((col) => (
            <nav key={col.title.en} aria-label={col.title[locale]}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40">{col.title[locale]}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label.en + link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.95rem] text-white/70 transition-colors hover:text-white"
                    >
                      {link.label[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="border-t border-white/10 py-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
            {t('footer.disclaimerTitle')}
          </p>
          <p className="mt-2 max-w-4xl text-sm leading-relaxed text-white/45">{medicalDisclaimer}</p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-7 sm:flex-row">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} {site.legalName}. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/products" className="text-sm text-white/50 transition-colors hover:text-white">
              {t('nav.products')}
            </Link>
            <Link href="/quality" className="text-sm text-white/50 transition-colors hover:text-white">
              {t('nav.quality')}
            </Link>
            <Link href="/contact" className="text-sm text-white/50 transition-colors hover:text-white">
              {t('nav.contact')}
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
            >
              {t('footer.backToTop')}
              <span className="grid h-8 w-8 place-items-center rounded-full border border-white/15 transition-all group-hover:border-secondary-400 group-hover:bg-white/5">
                <ArrowUp className="h-3.5 w-3.5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
