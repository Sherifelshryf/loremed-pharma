'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, Leaf, FlaskConical, Sparkles } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageProvider';
import { Button } from '@/components/ui/Button';
import { Container, Eyebrow } from '@/components/ui/Section';
import { Magnetic, Counter } from '@/components/ui/motion';
import { LogoBloom, GradientOrb, Molecule, GridField } from '@/components/graphics/BrandBackdrop';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

const copy = {
  gmpQuality: { en: 'GMP-grade quality', ar: 'جودة بمعايير GMP' },
  standardisedTitle: { en: 'Standardised botanicals', ar: 'مستخلصات نباتية موحَّدة' },
  standardisedSub: { en: 'Elderberry · Ivy · Black seed', ar: 'البلسان · اللبلاب · حبة البركة' },
  pipelineTitle: { en: '30+ in development', ar: 'أكثر من 30 قيد التطوير' },
  pipelineSub: { en: 'Six therapeutic areas', ar: 'ستة مجالات علاجية' },
  qualityFirstTitle: { en: 'Quality-first', ar: 'الجودة أولًا' },
  qualityFirstSub: { en: 'Batch-tested & released', ar: 'اختبار وإفراج لكل دفعة' },
};

export function Hero() {
  const { locale, t } = useI18n();
  const reduce = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: reduce ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: 0.85, ease: EASE, delay },
  });

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      {/* Backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/70 via-white to-white" />
        <GridField className="opacity-[0.55]" />
        <GradientOrb color="purple" size={620} className="-left-40 -top-24 opacity-70" />
        <GradientOrb color="orange" size={520} className="-right-32 top-16 opacity-60" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-14 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-24">
          {/* Copy */}
          <div className="max-w-xl">
            <motion.div {...fadeUp(0)}>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-4 py-1.5 shadow-soft backdrop-blur">
                <Eyebrow>{t('hero.eyebrow')}</Eyebrow>
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.08)}
              className="mt-6 text-display-xl text-ink"
            >
              {t('hero.titlePre')}{' '}
              <span className="text-gradient">{t('hero.titleAccent')}</span>
            </motion.h1>

            <motion.p {...fadeUp(0.16)} className="mt-6 text-lg leading-relaxed text-ink-soft sm:text-xl">
              {t('hero.subtitle')}
            </motion.p>

            <motion.div {...fadeUp(0.24)} className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Button href="/products" size="lg" variant="primary" withArrow>
                  {t('cta.explore')}
                </Button>
              </Magnetic>
              <Button href="/about" size="lg" variant="outline">
                {t('cta.about')}
              </Button>
            </motion.div>

            {/* Mini stats */}
            <motion.div {...fadeUp(0.32)} className="mt-12 flex flex-wrap gap-x-10 gap-y-6">
              <div>
                <div className="text-3xl font-bold text-primary-800">
                  <Counter value={30} suffix="+" />
                </div>
                <div className="mt-1 text-sm text-ink-muted">{t('hero.stat1')}</div>
              </div>
              <div className="hidden h-12 w-px bg-line sm:block" />
              <div>
                <div className="text-3xl font-bold text-primary-800">
                  <Counter value={6} />
                </div>
                <div className="mt-1 text-sm text-ink-muted">{t('hero.stat2')}</div>
              </div>
              <div className="hidden h-12 w-px bg-line sm:block" />
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-success-500" />
                <span className="text-sm font-medium text-ink-soft">{copy.gmpQuality[locale]}</span>
              </div>
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.15 }}
            className="relative mx-auto aspect-square w-full max-w-[34rem]"
          >
            {/* Glow */}
            <div
              aria-hidden
              className="absolute inset-6 rounded-[3rem] bg-gradient-to-br from-primary-100/60 to-secondary-100/50 blur-2xl"
            />
            {/* Panel */}
            <div className="absolute inset-0 grid place-items-center rounded-[2.75rem] border border-white/70 bg-white/50 shadow-glow backdrop-blur-xl">
              <div className="absolute inset-0 overflow-hidden rounded-[2.75rem]">
                <div className="absolute inset-0 bg-dots opacity-40" />
              </div>
              <motion.div
                animate={reduce ? undefined : { y: [0, -12, 0] }}
                transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity }}
                className="relative w-[70%]"
              >
                <LogoBloom className="w-full drop-shadow-[0_24px_48px_rgba(50,35,83,0.25)]" />
              </motion.div>
            </div>

            {/* Floating molecule */}
            <motion.div
              aria-hidden
              className="absolute -left-6 top-10 hidden w-40 sm:block"
              animate={reduce ? undefined : { y: [0, 14, 0] }}
              transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity }}
            >
              <Molecule tone="orange" className="relative w-full opacity-80" />
            </motion.div>

            {/* Floating stat cards */}
            <FloatingCard
              className="-left-4 bottom-16 sm:-left-10"
              delay={0.5}
              icon={<Leaf className="h-4 w-4 text-success-500" />}
              title={copy.standardisedTitle[locale]}
              sub={copy.standardisedSub[locale]}
              reduce={reduce}
            />
            <FloatingCard
              className="-right-3 top-14 sm:-right-8"
              delay={0.7}
              icon={<FlaskConical className="h-4 w-4 text-primary-600" />}
              title={copy.pipelineTitle[locale]}
              sub={copy.pipelineSub[locale]}
              reduce={reduce}
            />
            <FloatingCard
              className="-right-2 bottom-10 sm:-right-6"
              delay={0.9}
              icon={<Sparkles className="h-4 w-4 text-secondary-500" />}
              title={copy.qualityFirstTitle[locale]}
              sub={copy.qualityFirstSub[locale]}
              reduce={reduce}
            />
          </motion.div>
        </div>

        {/* Trust strip */}
        <motion.div
          {...fadeUp(0.4)}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-line py-8 text-center"
        >
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-ink-muted">{t('hero.trust')}</p>
        </motion.div>
      </Container>
    </section>
  );
}

function FloatingCard({
  className,
  icon,
  title,
  sub,
  delay,
  reduce,
}: {
  className?: string;
  icon: React.ReactNode;
  title: string;
  sub: string;
  delay: number;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.9 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={cn('absolute z-10 hidden sm:block', className)}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity, delay }}
        className="flex items-center gap-3 rounded-2xl border border-line bg-white/90 px-4 py-3 shadow-card backdrop-blur"
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-neutral-50">{icon}</span>
        <span>
          <span className="block text-sm font-semibold text-ink">{title}</span>
          <span className="block text-xs text-ink-muted">{sub}</span>
        </span>
      </motion.div>
    </motion.div>
  );
}
