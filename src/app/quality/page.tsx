import type { Metadata } from 'next';
import { ShieldCheck, Microscope, Beaker, ClipboardCheck, FlaskConical, Thermometer } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Manufacturing } from '@/components/sections/Manufacturing';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { Container, SectionHeading, Eyebrow } from '@/components/ui/Section';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/motion';
import { standards } from '@/content/company';
import { buildMetadata, breadcrumbSchema, JsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Quality',
  description:
    'Quality assurance, GMP-grade manufacturing, laboratory testing and regulatory compliance at Loremed Pharma — how we guarantee every batch.',
  path: '/quality',
});

const process = [
  { n: '01', icon: ClipboardCheck, title: 'Responsible sourcing', body: 'Every raw material is qualified and verified against specification before it enters our process.' },
  { n: '02', icon: FlaskConical, title: 'Precise formulation', body: 'Validated methods turn actives and standardised botanicals into a consistent, effective product.' },
  { n: '03', icon: Thermometer, title: 'Controlled production', body: 'GMP-grade manufacturing with documented in-process checks at every critical control point.' },
  { n: '04', icon: Beaker, title: 'Test & release', body: 'Analytical testing confirms identity, purity and potency — nothing ships until it passes.' },
];

const labs = [
  { icon: Microscope, title: 'Analytical laboratory', body: 'Instrumental analysis for identity, assay and purity, supporting both release and stability testing.' },
  { icon: Beaker, title: 'Physical & chemical testing', body: 'From dissolution and pH to viscosity and uniformity — the checks that prove a product performs.' },
  { icon: Thermometer, title: 'Stability program', body: 'Real-time and accelerated studies confirm shelf life and behaviour across storage conditions.' },
  { icon: ShieldCheck, title: 'Microbiological control', body: 'Environmental monitoring and product testing safeguard against contamination.' },
];

export default function QualityPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Quality', url: '/quality' }])} />
      <PageHero
        eyebrow="Quality & compliance"
        title={
          <>
            Quality is <span className="text-gradient">designed in</span>, not inspected on
          </>
        }
        lead="From the first raw material to the sealed pack, every Loremed product is built and verified to standards that protect the families who use it."
        crumbs={[{ label: 'Quality', href: '/quality' }]}
      />

      {/* Assurance process */}
      <section id="assurance" className="section pt-4">
        <Container>
          <SectionHeading
            eyebrow="Quality assurance"
            title={<>Four stages, <span className="text-gradient">zero compromise</span></>}
            lead="Quality is not a final checkpoint — it is engineered into every stage of how a Loremed product comes to life."
            align="center"
            className="mx-auto"
          />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((s) => (
              <StaggerItem key={s.n} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                  <span className="text-4xl font-bold text-primary-100 transition-colors group-hover:text-secondary-200">
                    {s.n}
                  </span>
                  <span className="mt-2 grid h-12 w-12 place-items-center rounded-2xl bg-primary-50 text-primary-700">
                    <s.icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Manufacturing (reused) */}
      <Manufacturing />

      {/* Laboratories & testing */}
      <section id="laboratories" className="section bg-surface-muted">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <Reveal>
                <Eyebrow>Laboratories & testing</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 text-display-md sm:text-display-lg">
                  Proof, not <span className="text-gradient">promises</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                  Our laboratories do the quiet, essential work that turns a formulation into a product you can
                  trust — verifying every claim before it reaches the shelf.
                </p>
              </Reveal>
            </div>
            <Stagger className="grid gap-4 sm:grid-cols-2">
              {labs.map((l) => (
                <StaggerItem key={l.title} className="h-full">
                  <div className="h-full rounded-3xl border border-line bg-white p-6 shadow-soft">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary-50 text-secondary-600">
                      <l.icon className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <h3 className="mt-4 font-semibold text-ink">{l.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{l.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      {/* Standards */}
      <section id="standards" className="section">
        <Container>
          <SectionHeading
            eyebrow="Standards & compliance"
            title={<>Built to the frameworks the <span className="text-gradient">world trusts</span></>}
            lead="Our quality system and operations are aligned with the internationally recognised standards that define modern pharmaceutical practice."
            align="center"
            className="mx-auto"
          />
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {standards.map((s) => (
              <StaggerItem key={s.code} className="h-full">
                <div className="group flex h-full items-start gap-5 rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-500 hover:border-primary-200 hover:shadow-card">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary-50 text-primary-700 transition-colors duration-500 group-hover:bg-primary-800 group-hover:text-white">
                    <s.icon className="h-6 w-6" strokeWidth={1.7} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">{s.title}</h3>
                    <span className="mt-0.5 inline-block rounded-md bg-secondary-50 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-secondary-700">
                      {s.code}
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-ink-muted">
            Codes shown represent the standards and regulatory frameworks that guide Loremed’s quality system
            and product development.
          </p>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
