import { Check, TrendingUp } from 'lucide-react';
import { about } from '@/content/company';
import { Button } from '@/components/ui/Button';
import { Container, Eyebrow } from '@/components/ui/Section';
import { Reveal, Parallax } from '@/components/ui/motion';
import { GradientOrb } from '@/components/graphics/BrandBackdrop';

const highlights = [
  'Pharmaceutical precision, from lab to label',
  'Trusted botanicals meet modern nutrition science',
  'A range built around real families',
];

const roadmap = [
  { year: '2023', value: 10, label: 'formulations' },
  { year: '2024', value: 20, label: 'formulations' },
  { year: '2025', value: 30, label: 'formulations' },
];

export function CompanyOverview() {
  return (
    <section id="overview" className="section relative overflow-hidden">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Copy */}
          <div>
            <Reveal>
              <Eyebrow>Who we are</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-display-md sm:text-display-lg">
                A young company with a{' '}
                <span className="text-gradient">world-class</span> ambition
              </h2>
            </Reveal>
            {about.story.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.05}>
                <p className="mt-5 text-lg leading-relaxed text-ink-soft">{p}</p>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <ul className="mt-8 space-y-3">
                {highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-success-50 text-success-600">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-ink-soft">{h}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-9">
                <Button href="/about" variant="primary" withArrow>
                  About Loremed
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
                        Our growth ambition
                      </p>
                      <p className="text-lg font-semibold text-ink">Building momentum, year on year</p>
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
                    From our first formulations toward a pipeline more than{' '}
                    <span className="font-semibold text-primary-800">thirty</span> strong — a deliberate,
                    quality-led expansion across six therapeutic areas.
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
