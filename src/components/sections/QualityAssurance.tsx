import { ShieldCheck } from 'lucide-react';
import { Container, Eyebrow } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/motion';
import { LogoMark } from '@/components/logo/Logo';

const steps = [
  { n: '01', title: 'Responsible sourcing', body: 'Every raw material is qualified and verified before it enters our process.' },
  { n: '02', title: 'Precise formulation', body: 'Validated methods turn actives and botanicals into a consistent product.' },
  { n: '03', title: 'Controlled production', body: 'GMP-grade manufacturing with in-process checks at every critical step.' },
  { n: '04', title: 'Test & release', body: 'Analytical testing confirms identity, purity and potency before release.' },
];

export function QualityAssurance() {
  return (
    <section id="quality" className="relative overflow-hidden bg-primary-950 py-24 text-white sm:py-28 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-primary-700/30 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-secondary-500/15 blur-3xl" />
        <LogoMark className="absolute -left-10 bottom-0 hidden h-80 opacity-[0.06] lg:block" />
      </div>

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Reveal>
              <Eyebrow variant="inverse">Quality assurance</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-display-md text-white sm:text-display-lg">
                Trust is <span className="text-gradient-orange">built</span>, one batch at a time
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/60">
                Quality is not a final checkpoint — it is designed into every stage. From the first raw
                material to the sealed pack, nothing reaches a family until it meets our specification in
                full.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/12 bg-white/5 px-5 py-4">
                <ShieldCheck className="h-6 w-6 text-success-500" />
                <span className="text-sm text-white/80">
                  GMP-grade production · Full batch traceability · Analytical release testing
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-9">
                <Button href="/quality" variant="inverse" withArrow>
                  Inside our quality system
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Steps */}
          <Stagger className="grid gap-4 sm:grid-cols-2">
            {steps.map((s) => (
              <StaggerItem key={s.n}>
                <div className="group h-full rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition-colors hover:border-white/20 hover:bg-white/[0.07]">
                  <span className="text-3xl font-bold text-secondary-400">{s.n}</span>
                  <h3 className="mt-4 text-lg font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{s.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
