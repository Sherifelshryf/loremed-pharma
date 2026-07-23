import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, FlaskConical, Beaker, Gauge, Droplet } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { Container, SectionHeading, Eyebrow, Badge } from '@/components/ui/Section';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/motion';
import { Molecule } from '@/components/graphics/BrandBackdrop';
import { categoryIcons } from '@/components/ui/ProductCard';
import { rndCapabilities } from '@/content/company';
import { products, categories } from '@/content/products';
import { buildMetadata, breadcrumbSchema, JsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Research & Development',
  description:
    'Innovation, research, formulation science and a 30+ formulation pipeline at Loremed Pharma — where every product begins.',
  path: '/research',
});

const platforms = [
  { icon: Droplet, title: 'Syrups & drops', body: 'Palatable liquid formats engineered for accurate, family-friendly dosing.' },
  { icon: Gauge, title: 'Precision dosing', body: 'Dropper and measuring-cup engineering calibrated for accurate, age-based dosing.' },
  { icon: Beaker, title: 'Topical lotions', body: 'Dermatologically-guided emulsions that protect and restore the skin barrier.' },
  { icon: FlaskConical, title: 'Botanical extracts', body: 'Standardised, characterised plant actives that behave the same every batch.' },
];

export default function ResearchPage() {
  const pipeline = products.filter((p) => p.status === 'under-registration');

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'R&D', url: '/research' }])} />
      <PageHero
        eyebrow="Research & development"
        title={
          <>
            Where every product <span className="text-gradient">begins</span>
          </>
        }
        lead="Loremed R&D turns active ingredients and trusted botanicals into stable, effective, great-to-take products — and keeps a pipeline of thirty-plus formulations moving forward."
        crumbs={[{ label: 'R&D', href: '/research' }]}
      />

      {/* Innovation / capabilities */}
      <section id="innovation" className="section pt-4">
        <Container>
          <SectionHeading
            eyebrow="Innovation"
            title={<>Good science, made <span className="text-gradient">better products</span></>}
            lead="Four disciplines work together to move an idea from concept to a product families can rely on."
            align="center"
            className="mx-auto"
          />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {rndCapabilities.map((c) => (
              <StaggerItem key={c.title} className="h-full">
                <div className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-secondary-50 to-primary-50 text-primary-700">
                    <c.icon className="h-6 w-6" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-ink">{c.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{c.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Pipeline */}
      <section id="pipeline" className="section relative overflow-hidden bg-primary-950 text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-primary-700/30 blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-secondary-500/15 blur-3xl" />
          <Molecule tone="orange" className="right-10 top-24 hidden w-52 opacity-30 lg:block" />
        </div>
        <Container className="relative">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <Reveal>
                <Eyebrow variant="inverse">The pipeline</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 text-display-md text-white sm:text-display-lg">
                  <span className="text-gradient-orange">30+</span> formulations in development
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 text-lg leading-relaxed text-white/60">
                  A deliberate, quality-led pipeline across six therapeutic areas. These formulas are advancing
                  through the final stages of registration.
                </p>
              </Reveal>
            </div>
          </div>

          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pipeline.map((p) => (
              <StaggerItem key={p.slug} className="h-full">
                <Link
                  href={`/products/${p.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition-colors hover:border-white/20 hover:bg-white/[0.07]"
                >
                  <div className="flex items-center justify-between">
                    <Badge tone="muted">Under registration</Badge>
                    <ArrowRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">{p.name}</h3>
                  <p className="mt-1 text-sm font-medium text-secondary-300">{p.tagline}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">{p.shortDescription}</p>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Technology / platforms */}
      <section id="technology" className="section">
        <Container>
          <SectionHeading
            eyebrow="Technology & platforms"
            title={<>Many forms, <span className="text-gradient">one standard</span></>}
            lead="Our formulation and analytical capabilities span the dosage forms that modern nutrition and medicine demand."
            align="center"
            className="mx-auto"
          />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {platforms.map((p) => (
              <StaggerItem key={p.title} className="h-full">
                <div className="h-full rounded-3xl border border-line bg-surface-muted p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-secondary-600 shadow-soft">
                    <p.icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-4 font-semibold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Therapeutic expertise */}
      <section className="section bg-surface-muted">
        <Container>
          <SectionHeading
            eyebrow="Scientific expertise"
            title="Six therapeutic areas"
            lead="Focused domains where Loremed builds depth — from immune and respiratory care to omega nutrition and dermatology."
            align="center"
            className="mx-auto"
          />
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => {
              const Icon = categoryIcons[c.id];
              return (
                <StaggerItem key={c.id} className="h-full">
                  <Link
                    href={`/products?category=${c.id}`}
                    className="group flex h-full items-start gap-4 rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-50 text-primary-700 transition-colors group-hover:bg-primary-800 group-hover:text-white">
                      <Icon className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <div>
                      <h3 className="font-semibold text-ink group-hover:text-primary-800">{c.label}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">{c.description}</p>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
