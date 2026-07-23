import { standards } from '@/content/company';
import { Container, SectionHeading } from '@/components/ui/Section';
import { Stagger, StaggerItem } from '@/components/ui/motion';

export function Certifications() {
  return (
    <section id="certifications" className="section relative overflow-hidden">
      <Container>
        <SectionHeading
          eyebrow="Standards & compliance"
          title={
            <>
              Held to the standards the <span className="text-gradient">world expects</span>
            </>
          }
          lead="Our quality and operations are built around the internationally recognised frameworks that define modern pharmaceutical practice."
          align="center"
          className="mx-auto max-w-3xl"
        />

        <Stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {standards.map((s) => (
            <StaggerItem key={s.code} className="h-full">
              <div className="group flex h-full items-start gap-5 rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-500 ease-out-expo hover:border-primary-200 hover:shadow-card">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary-50 text-primary-700 transition-colors duration-500 group-hover:bg-primary-800 group-hover:text-white">
                  <s.icon className="h-6 w-6" strokeWidth={1.7} />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-ink">{s.title}</h3>
                  </div>
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
          Codes shown represent the standards and regulatory frameworks that guide Loremed’s quality
          system and product development.
        </p>
      </Container>
    </section>
  );
}
