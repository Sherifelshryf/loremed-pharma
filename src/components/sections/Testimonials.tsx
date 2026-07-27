'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { testimonials } from '@/content/company';
import { Container, Eyebrow } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/motion';
import { useI18n } from '@/i18n/LanguageProvider';
import { cn } from '@/lib/utils';
import { useSafeReducedMotion } from '@/lib/useSafeReducedMotion';

const copy = {
  eyebrow: { en: 'Voices from the field', ar: 'أصوات من الميدان' },
  prev: { en: 'Previous testimonial', ar: 'الشهادة السابقة' },
  next: { en: 'Next testimonial', ar: 'الشهادة التالية' },
  goTo: { en: 'Go to testimonial', ar: 'الانتقال إلى الشهادة' },
};

export function Testimonials() {
  const { locale } = useI18n();
  const reduce = useSafeReducedMotion();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  const go = useCallback(
    (next: number) => {
      setDir(next > index || (index === count - 1 && next === 0) ? 1 : -1);
      setIndex((next + count) % count);
    },
    [index, count],
  );

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => window.clearInterval(id);
  }, [paused, reduce, count]);

  const active = testimonials[index];

  return (
    <section className="section relative overflow-hidden">
      <Container>
        <div
          className="relative mx-auto max-w-4xl text-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Reveal>
            <Eyebrow className="justify-center">{copy.eyebrow[locale]}</Eyebrow>
          </Reveal>

          <div className="relative mt-10 min-h-[16rem]">
            <Quote className="mx-auto h-12 w-12 text-secondary-500/25" strokeWidth={1.2} />
            <AnimatePresence mode="wait" custom={dir}>
              <motion.blockquote
                key={index}
                custom={dir}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6"
              >
                <p className="text-balance text-2xl font-medium leading-snug text-ink sm:text-[1.75rem] sm:leading-snug">
                  &ldquo;{active.quote[locale]}&rdquo;
                </p>
                <footer className="mt-8">
                  <div className="font-semibold text-primary-800">{active.name[locale]}</div>
                  <div className="text-sm text-ink-muted">{active.role[locale]}</div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={() => go(index - 1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink-soft transition-all hover:border-primary-300 hover:bg-primary-50 hover:text-primary-800"
              aria-label={copy.prev[locale]}
            >
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`${copy.goTo[locale]} ${i + 1}`}
                  aria-current={i === index}
                  className={cn(
                    'h-2 rounded-full transition-all duration-300',
                    i === index ? 'w-7 bg-secondary-500' : 'w-2 bg-line-strong hover:bg-primary-300',
                  )}
                />
              ))}
            </div>
            <button
              onClick={() => go(index + 1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink-soft transition-all hover:border-primary-300 hover:bg-primary-50 hover:text-primary-800"
              aria-label={copy.next[locale]}
            >
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
