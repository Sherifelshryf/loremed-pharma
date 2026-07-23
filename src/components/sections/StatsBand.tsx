import { stats } from '@/content/company';
import { Container } from '@/components/ui/Section';
import { Counter, Reveal } from '@/components/ui/motion';
import { LogoMark } from '@/components/logo/Logo';

export function StatsBand() {
  return (
    <section className="relative overflow-hidden bg-primary-900 py-16 sm:py-20">
      {/* backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-primary-700/40 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-secondary-500/15 blur-3xl" />
        <LogoMark
          purple="#ffffff"
          orange="#EC691D"
          decorative
          className="absolute -bottom-16 end-8 hidden h-72 opacity-[0.07] lg:block"
        />
      </div>

      <Container className="relative">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="text-center sm:text-start">
                <div className="text-5xl font-bold text-white lg:text-6xl">
                  <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="mt-3 h-0.5 w-10 rounded-full bg-secondary-500 sm:mx-0 mx-auto" />
                <p className="mt-4 text-sm leading-relaxed text-white/60">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
