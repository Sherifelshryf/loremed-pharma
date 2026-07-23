import type { Metadata } from 'next';
import { Target, Compass } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { StatsBand } from '@/components/sections/StatsBand';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { Container, Eyebrow, SectionHeading } from '@/components/ui/Section';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/motion';
import { LogoBloom, GradientOrb } from '@/components/graphics/BrandBackdrop';
import { about, timeline, leadership } from '@/content/company';
import { site } from '@/content/site';
import { L } from '@/i18n/Localized';
import { buildMetadata, breadcrumbSchema, JsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description:
    'The story, vision, mission and values behind Loremed Pharma — a fast-growing pharmaceutical and nutraceutical company that cares about quality of life.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'About', url: '/about' }])} />
      <PageHero
        eyebrow={<L text={{ en: 'About Loremed', ar: 'عن لوريمد' }} />}
        title={
          <>
            <L text={{ en: 'We care about', ar: 'نحن نهتم بـ' }} />{' '}
            <span className="text-gradient"><L text={{ en: 'quality of life', ar: 'جودة الحياة' }} /></span>
          </>
        }
        lead={
          <L
            text={{
              en: 'Loremed Pharma pairs pharmaceutical science with genuine human care — building medicines and nutrition that families across the region can trust.',
              ar: 'تجمع لوريمد فارما بين العلوم الصيدلانية والاهتمام الإنساني الحقيقي — لبناء أدوية وتغذية تثق بها العائلات في جميع أنحاء المنطقة.',
            }}
          />
        }
        crumbs={[{ label: <L text={{ en: 'About', ar: 'من نحن' }} />, href: '/about' }]}
      />

      {/* Story */}
      <section id="story" className="section pt-4">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <Reveal>
                <Eyebrow><L text={{ en: 'Our story', ar: 'قصتنا' }} /></Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 text-display-md sm:text-display-lg">
                  <L text={{ en: 'Founded to make', ar: 'تأسست من أجل' }} />{' '}
                  <span className="text-gradient">
                    <L text={{ en: 'great care accessible', ar: 'جعل الرعاية الجيدة في متناول الجميع' }} />
                  </span>
                </h2>
              </Reveal>
              {about.story.map((p, i) => (
                <Reveal key={i} delay={0.1 + i * 0.05}>
                  <p className="mt-5 text-lg leading-relaxed text-ink-soft"><L text={p} /></p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1}>
              <div className="relative mx-auto aspect-square w-full max-w-md">
                <GradientOrb color="mix" size={420} className="inset-0 m-auto opacity-70" />
                <div className="relative grid h-full place-items-center rounded-[2.5rem] border border-line bg-white/60 p-10 shadow-glow backdrop-blur-xl">
                  <LogoBloom className="w-3/4" />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section id="vision" className="section bg-surface-muted">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="relative h-full overflow-hidden rounded-4xl bg-primary-900 p-10 text-white shadow-glow">
                <div aria-hidden className="absolute -right-12 -top-12 h-52 w-52 rounded-full bg-primary-700/40 blur-3xl" />
                <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-white/10">
                  <Compass className="h-6 w-6" />
                </span>
                <h3 className="relative mt-6 text-2xl font-semibold text-white"><L text={about.vision.title} /></h3>
                <p className="relative mt-3 text-lg leading-relaxed text-white"><L text={about.vision.body} /></p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="relative h-full overflow-hidden rounded-4xl border border-secondary-200 bg-gradient-to-br from-secondary-50 to-white p-10 shadow-soft">
                <div aria-hidden className="absolute -right-12 -top-12 h-52 w-52 rounded-full bg-secondary-100/60 blur-3xl" />
                <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-secondary-500 text-white">
                  <Target className="h-6 w-6" />
                </span>
                <h3 className="relative mt-6 text-2xl font-semibold text-ink"><L text={about.mission.title} /></h3>
                <p className="relative mt-3 text-lg leading-relaxed text-ink-soft"><L text={about.mission.body} /></p>
              </div>
            </Reveal>
          </div>

          {/* Values */}
          <div className="mt-16">
            <SectionHeading
              eyebrow={<L text={{ en: 'Our values', ar: 'قيمنا' }} />}
              title={<L text={{ en: 'What we stand for', ar: 'ما نؤمن به' }} />}
              align="center"
              className="mx-auto"
            />
            <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {about.values.map((v) => (
                <StaggerItem key={v.title.en} className="h-full">
                  <div className="h-full rounded-3xl border border-line bg-white p-7 text-center shadow-soft">
                    <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 text-primary-700">
                      <v.icon className="h-6 w-6" strokeWidth={1.7} />
                    </span>
                    <h4 className="mt-5 text-lg font-semibold text-ink"><L text={v.title} /></h4>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft"><L text={v.body} /></p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      <StatsBand />

      {/* Timeline */}
      <section id="timeline" className="section">
        <Container>
          <SectionHeading
            eyebrow={<L text={{ en: 'Our journey', ar: 'مسيرتنا' }} />}
            title={
              <>
                <L text={{ en: 'Momentum,', ar: 'زخم' }} />{' '}
                <span className="text-gradient"><L text={{ en: 'year on year', ar: 'عامًا بعد عام' }} /></span>
              </>
            }
            lead={
              <L
                text={{
                  en: 'A young company moving with purpose — here’s how Loremed has grown.',
                  ar: 'شركة فتية تتحرك بهدف واضح — إليك كيف نمت لوريمد.',
                }}
              />
            }
            align="center"
            className="mx-auto"
          />
          <div className="relative mx-auto mt-16 max-w-3xl">
            <div aria-hidden className="absolute bottom-0 start-[15px] top-2 w-0.5 bg-gradient-to-b from-primary-300 via-primary-400 to-secondary-400 sm:start-[19px]" />
            <ol className="space-y-8">
              {timeline.map((t, i) => (
                <li key={i} className="relative ps-14 sm:ps-20">
                  <Reveal delay={i * 0.05}>
                    <span className="absolute start-0 top-0 grid h-8 w-8 place-items-center rounded-full border-4 border-white bg-primary-800 text-[0.6rem] font-bold text-white shadow-soft sm:h-10 sm:w-10 sm:text-xs">
                      {t.year.slice(2)}
                    </span>
                    <div className="rounded-3xl border border-line bg-white p-6 shadow-soft transition-shadow hover:shadow-card">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-secondary-600">{t.year}</span>
                        <span className="h-px flex-1 bg-line" />
                      </div>
                      <h3 className="mt-2 text-lg font-semibold text-ink"><L text={t.title} /></h3>
                      <p className="mt-1.5 text-ink-soft"><L text={t.body} /></p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Leadership */}
      <section id="leadership" className="section bg-surface-muted">
        <Container>
          <SectionHeading
            eyebrow={<L text={{ en: 'Leadership', ar: 'القيادة' }} />}
            title={<L text={{ en: 'The people behind Loremed', ar: 'الأشخاص وراء لوريمد' }} />}
            lead={
              <L
                text={{
                  en: 'An experienced team leading each pillar of the business — from science and quality to commercial growth.',
                  ar: 'فريق ذو خبرة يقود كل ركيزة من ركائز العمل — من العلم والجودة إلى النمو التجاري.',
                }}
              />
            }
            align="center"
            className="mx-auto"
          />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((l) => (
              <StaggerItem key={l.role.en} className="h-full">
                <div className="group h-full rounded-3xl border border-line bg-white p-7 text-center shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                  <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-primary-700 to-primary-900 text-xl font-bold text-white">
                    {l.monogram}
                  </span>
                  <h3 className="mt-5 font-semibold text-ink"><L text={l.role} /></h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft"><L text={l.focus} /></p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mx-auto mt-10 max-w-xl text-center text-xs text-ink-muted">
            <L
              text={{
                en: 'Loremed’s leadership structure. For media or partnership enquiries, contact us at',
                ar: 'الهيكل القيادي للوريمد. لاستفسارات الإعلام أو الشراكة، تواصل معنا عبر',
              }}
            />{' '}
            <a href={`mailto:${site.email}`} className="text-primary-700 underline-offset-2 hover:underline">
              {site.email}
            </a>
            .
          </p>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
