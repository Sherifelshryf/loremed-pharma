import { professionalValue } from '@/content/company';
import { Container, Eyebrow } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/motion';
import { Stethoscope } from 'lucide-react';

export function Professionals() {
  return (
    <section id="professionals" className="section relative overflow-hidden">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-secondary-50/50 p-8 sm:p-12 lg:p-16">
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-secondary-100/50 blur-3xl" />
          <div className="relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-4 py-1.5 text-sm font-medium text-primary-700 shadow-soft">
                  <Stethoscope className="h-4 w-4 text-secondary-500" />
                  For healthcare professionals
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 text-display-md">
                  A partner you can <span className="text-gradient">recommend with confidence</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                  Pharmacists, physicians and specialists rely on Loremed for standardised, transparent
                  formulations — backed by product information whenever they need it.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-8">
                  <Button href="/contact#departments" variant="primary" withArrow>
                    Request product information
                  </Button>
                </div>
              </Reveal>
            </div>

            <Stagger className="grid gap-4">
              {professionalValue.map((v) => (
                <StaggerItem key={v.title}>
                  <div className="flex items-start gap-4 rounded-2xl border border-line bg-white/80 p-6 shadow-soft backdrop-blur">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-800 text-white">
                      <v.icon className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <div>
                      <h3 className="font-semibold text-ink">{v.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">{v.body}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Container>
    </section>
  );
}
