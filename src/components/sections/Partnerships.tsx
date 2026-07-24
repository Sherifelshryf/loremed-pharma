'use client';

import { Globe2, MapPin } from 'lucide-react';
import { partnerships } from '@/content/company';
import { Container, Eyebrow } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/motion';
import { useI18n } from '@/i18n/LanguageProvider';

const copy = {
  eyebrow: { en: 'Global partnerships', ar: 'شراكات عالمية' },
  titlePre: { en: 'From Egypt to the', ar: 'من مصر إلى' },
  titleAccent: { en: 'wider region', ar: 'المنطقة الأوسع' },
  lead: {
    en: 'We build partnerships that carry Loremed quality further — with documentation and registration engineered to open doors across the Middle East and Africa.',
    ar: 'نبني شراكات تنقل جودة لورميد إلى أبعد مدى — بتوثيق وتسجيل مصممَين لفتح الأبواب في جميع أنحاء الشرق الأوسط وأفريقيا.',
  },
  cta: { en: 'Become a partner', ar: 'كن شريكًا' },
};

export function Partnerships() {
  const { locale } = useI18n();
  return (
    <section id="partnerships" className="section relative overflow-hidden bg-surface-muted">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Copy + regions */}
          <div>
            <Reveal>
              <Eyebrow>{copy.eyebrow[locale]}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-display-md sm:text-display-lg">
                {copy.titlePre[locale]} <span className="text-gradient">{copy.titleAccent[locale]}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">{copy.lead[locale]}</p>
            </Reveal>

            <Stagger className="mt-9 grid gap-3 sm:grid-cols-2">
              {partnerships.map((p) => (
                <StaggerItem key={p.region.en}>
                  <div className="flex h-full items-start gap-3 rounded-2xl border border-line bg-white p-5 shadow-soft">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-secondary-500" />
                    <div>
                      <h3 className="font-semibold text-ink">{p.region[locale]}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">{p.body[locale]}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.2}>
              <div className="mt-9">
                <Button href="/contact" variant="primary" withArrow>
                  {copy.cta[locale]}
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Reach visual */}
          <Reveal delay={0.1}>
            <div className="relative mx-auto aspect-square w-full max-w-lg">
              <div className="absolute inset-0 grid place-items-center">
                <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden fill="none">
                  <defs>
                    <radialGradient id="reachGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#EC691D" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#EC691D" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="200" cy="200" r="190" fill="url(#reachGlow)" />
                  {[70, 120, 170].map((r) => (
                    <circle key={r} cx="200" cy="200" r={r} stroke="#543E84" strokeOpacity="0.18" strokeWidth="1.5" />
                  ))}
                  {/* orbit dots */}
                  {[
                    [200, 30],
                    [330, 130],
                    [300, 300],
                    [110, 320],
                    [40, 170],
                    [140, 90],
                  ].map(([x, y], i) => (
                    <g key={i}>
                      <line x1="200" y1="200" x2={x} y2={y} stroke="#EC691D" strokeOpacity="0.25" strokeWidth="1" />
                      <circle cx={x} cy={y} r={i % 2 ? 6 : 8} fill={i % 2 ? '#EC691D' : '#543E84'} />
                    </g>
                  ))}
                </svg>
              </div>
              <div className="absolute inset-0 grid place-items-center">
                <div className="grid h-24 w-24 place-items-center rounded-full border border-line bg-white text-primary-800 shadow-glow">
                  <Globe2 className="h-11 w-11" strokeWidth={1.3} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
