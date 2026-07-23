import { Mail, MapPin, ArrowRight } from 'lucide-react';
import { site } from '@/content/site';
import { Container } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/motion';
import { LogoMark } from '@/components/logo/Logo';

export function ContactCTA() {
  return (
    <section id="contact" className="section relative">
      <Container>
        <div className="relative overflow-hidden rounded-[2.75rem] bg-primary-900 px-6 py-16 shadow-glow sm:px-12 sm:py-20 lg:px-20">
          {/* backdrop */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-900 to-primary-950" />
            <div className="absolute -right-16 -top-16 h-96 w-96 rounded-full bg-secondary-500/25 blur-3xl" />
            <div className="absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-primary-600/40 blur-3xl" />
            <LogoMark className="absolute -bottom-20 end-6 hidden h-96 opacity-[0.06] lg:block" />
          </div>

          <div className="relative mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="text-eyebrow uppercase text-secondary-300">Let&rsquo;s talk</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-display-md text-white sm:text-display-lg">
                Building healthier lives,{' '}
                <span className="text-gradient-orange">together</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/65">
                Whether you&rsquo;re a distributor, a healthcare professional or simply curious about our
                products — our team would love to hear from you.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Button href="/contact" size="lg" variant="secondary" withArrow>
                  Contact us
                </Button>
                <Button href="/products" size="lg" variant="inverse-outline">
                  Explore products
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-white/10 pt-8">
                <a
                  href={`mailto:${site.email}`}
                  className="group inline-flex items-center gap-3 text-white/80 transition-colors hover:text-white"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 transition-colors group-hover:border-secondary-400">
                    <Mail className="h-4 w-4" />
                  </span>
                  {site.email}
                </a>
                <div className="inline-flex items-center gap-3 text-white/80">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5">
                    <MapPin className="h-4 w-4" />
                  </span>
                  {site.city}, {site.country}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
