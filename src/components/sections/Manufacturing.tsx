import { Factory, ArrowRight } from 'lucide-react';
import { manufacturingCapabilities } from '@/content/company';
import { Container, Eyebrow } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Reveal, Stagger, StaggerItem, Parallax } from '@/components/ui/motion';

export function Manufacturing() {
  return (
    <section id="manufacturing" className="section relative overflow-hidden">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Visual */}
          <Reveal className="order-2 lg:order-1">
            <Parallax distance={26}>
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-4xl border border-primary-900/10 bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 p-10 shadow-glow">
                  {/* concentric arcs */}
                  <svg viewBox="0 0 500 380" className="absolute inset-0 h-full w-full" aria-hidden fill="none">
                    {[70, 130, 190, 250, 310].map((r) => (
                      <circle key={r} cx="130" cy="330" r={r} stroke="white" strokeOpacity="0.08" strokeWidth="1.5" />
                    ))}
                    <path d="M20 60 H480" stroke="white" strokeOpacity="0.06" strokeWidth="1" />
                    <path d="M20 120 H480" stroke="white" strokeOpacity="0.06" strokeWidth="1" />
                  </svg>
                  <div aria-hidden className="absolute -right-10 top-10 h-40 w-40 rounded-full bg-secondary-500/25 blur-3xl" />
                  <div className="relative flex h-full flex-col justify-between">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-white backdrop-blur">
                      <Factory className="h-6 w-6" strokeWidth={1.7} />
                    </span>
                    <div>
                      <p className="text-5xl font-bold text-white">100%</p>
                      <p className="mt-2 max-w-xs text-white/60">
                        of production held to GMP-grade discipline — validated, documented and traceable.
                      </p>
                    </div>
                  </div>
                </div>
                {/* floating chip */}
                <div className="absolute -bottom-5 right-6 flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-3 shadow-card">
                  <span className="h-2.5 w-2.5 animate-breathe rounded-full bg-success-500" />
                  <span className="text-sm font-medium text-ink">Every batch tested &amp; released</span>
                </div>
              </div>
            </Parallax>
          </Reveal>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <Eyebrow>Manufacturing excellence</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-display-md sm:text-display-lg">
                Precision from raw material to <span className="text-gradient">finished pack</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                Great science only matters if it is made consistently. Our production is engineered for
                control at every step — so what leaves the line is exactly what we designed.
              </p>
            </Reveal>

            <Stagger className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {manufacturingCapabilities.map((c) => (
                <StaggerItem key={c.title}>
                  <div className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-700">
                      <c.icon className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <div>
                      <h3 className="font-semibold text-ink">{c.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">{c.body}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.2}>
              <div className="mt-9">
                <Button href="/quality" variant="ghost" className="px-0 hover:bg-transparent hover:text-secondary-600">
                  Explore our quality standards
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
