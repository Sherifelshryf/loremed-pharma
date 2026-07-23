import { rndCapabilities } from '@/content/company';
import { Container, SectionHeading } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/motion';
import { Molecule } from '@/components/graphics/BrandBackdrop';

export function Research() {
  return (
    <section id="research" className="section relative overflow-hidden bg-surface-muted">
      {/* decorative molecules */}
      <Molecule tone="purple" className="right-6 top-16 hidden w-52 opacity-40 lg:block" />
      <Molecule tone="orange" className="left-8 bottom-10 hidden w-40 opacity-30 lg:block" />

      <Container className="relative">
        <SectionHeading
          eyebrow="Research & development"
          title={
            <>
              Where every Loremed product <span className="text-gradient">begins</span>
            </>
          }
          lead="Our R&D turns active ingredients and trusted botanicals into stable, effective, great-to-take products — and keeps a pipeline of thirty-plus formulations moving forward."
          align="center"
          className="mx-auto max-w-3xl"
        />

        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rndCapabilities.map((c) => (
            <StaggerItem key={c.title} className="h-full">
              <div className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-soft transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-lift">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-secondary-50 to-primary-50 text-primary-700">
                  <c.icon className="h-6 w-6" strokeWidth={1.7} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink">{c.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{c.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <div className="mt-12 flex justify-center">
            <Button href="/research" variant="primary" withArrow>
              Discover the science
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
