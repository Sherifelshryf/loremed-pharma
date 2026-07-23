'use client';

import { Check, TrendingUp } from 'lucide-react';
import { about } from '@/content/company';
import { Button } from '@/components/ui/Button';
import { Container, Eyebrow } from '@/components/ui/Section';
import { Reveal, Parallax } from '@/components/ui/motion';
import { GradientOrb } from '@/components/graphics/BrandBackdrop';
import { useI18n } from '@/i18n/LanguageProvider';

const copy = {
  eyebrow: { en: 'Who we are', ar: 'من نحن' },
  titlePre: { en: 'A young company with a', ar: 'شركة فتية بطموح' },
  titleAccent: { en: 'world-class', ar: 'عالمي المستوى' },
  titlePost: { en: 'ambition', ar: '' },
  visualLabel: { en: 'Our growth ambition', ar: 'طموحنا في النمو' },
  visualHeading: { en: 'Building momentum, year on year', ar: 'بناء الزخم، عامًا بعد عام' },
  footnotePre: { en: 'From our first formulations toward a pipeline more than', ar: 'من أولى تركيباتنا نحو خط أبحاث يضم أكثر من' },
  footnoteAccent: { en: 'thirty', ar: 'ثلاثين' },
  footnotePost: {
    en: 'strong — a deliberate, quality-led expansion across six therapeutic areas.',
    ar: 'تركيبة — توسّع مدروس وقائم على الجودة عبر ستة مجالات علاجية.',
  },
  cta: { en: 'About Loremed', ar: 'عن لوريمد' },
};

const highlights = [
  { en: 'Pharmaceutical precision, from lab to label', ar: 'دقة صيدلانية، من المعمل إلى الملصق' },
  { en: 'Trusted botanicals meet modern nutrition science', ar: 'مستخلصات نباتية موثوقة تلتقي بعلوم التغذية الحديثة' },
  { en: 'A range built around real families', ar: 'نطاق منتجات مصمَّم من أجل العائلات الحقيقية' },
];

const roadmap = [
  { year: '2023', value: 10 },
  { year: '2024', value: 20 },
  { year: '2025', value: 30 },
];

export function CompanyOverview() {
  const { locale } = useI18n();
  return (
    <section id="overview" className="section relative overflow-hidden">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Copy */}
          <div>
            <Reveal>
              <Eyebrow>{copy.eyebrow[locale]}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-display-md sm:text-display-lg">
                {copy.titlePre[locale]} <span className="text-gradient">{copy.titleAccent[locale]}</span>{' '}
                {copy.titlePost[locale]}
              </h2>
            </Reveal>
            {about.story.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.05}>
                <p className="mt-5 text-lg leading-relaxed text-ink-soft">{p[locale]}</p>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <ul className="mt-8 space-y-3">
                {highlights.map((h) => (
                  <li key={h.en} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-success-50 text-success-600">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-ink-soft">{h[locale]}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-9">
                <Button href="/about" variant="primary" withArrow>
                  {copy.cta[locale]}
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Growth visual */}
          <Reveal delay={0.1}>
            <Parallax distance={30}>
              <div className="relative">
                <GradientOrb color="mix" size={420} className="-right-10 -top-10 opacity-70" />
                <div className="relative overflow-hidden rounded-4xl border border-line bg-white p-8 shadow-glow sm:p-10">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-secondary-50 text-secondary-600">
                      <TrendingUp className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
                        {copy.visualLabel[locale]}
                      </p>
                      <p className="text-lg font-semibold text-ink">{copy.visualHeading[locale]}</p>
                    </div>
                  </div>

                  <div className="mt-10 flex items-end justify-between gap-4">
                    {roadmap.map((r, i) => (
                      <div key={r.year} className="flex flex-1 flex-col items-center gap-3">
                        <span className="text-2xl font-bold text-primary-800">{r.value}</span>
                        <div
                          className="w-full rounded-t-2xl bg-gradient-to-t from-primary-800 to-primary-500"
                          style={{ height: `${60 + i * 60}px` }}
                        >
                          <div className="h-2 w-full rounded-t-2xl bg-secondary-500/80" />
                        </div>
                        <span className="text-sm font-medium text-ink-soft">{r.year}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-8 border-t border-line pt-6 text-sm leading-relaxed text-ink-soft">
                    {copy.footnotePre[locale]}{' '}
                    <span className="font-semibold text-primary-800">{copy.footnoteAccent[locale]}</span>{' '}
                    {copy.footnotePost[locale]}
                  </p>
                </div>
              </div>
            </Parallax>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
