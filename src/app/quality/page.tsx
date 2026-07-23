import type { Metadata } from 'next';
import { ShieldCheck, Microscope, Beaker, ClipboardCheck, FlaskConical, Thermometer } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Manufacturing } from '@/components/sections/Manufacturing';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { Container, SectionHeading, Eyebrow } from '@/components/ui/Section';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/motion';
import { standards } from '@/content/company';
import { L } from '@/i18n/Localized';
import { buildMetadata, breadcrumbSchema, JsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Quality',
  description:
    'Quality assurance, GMP-grade manufacturing, laboratory testing and regulatory compliance at Loremed Pharma — how we guarantee every batch.',
  path: '/quality',
});

const process = [
  {
    n: '01',
    icon: ClipboardCheck,
    title: { en: 'Responsible sourcing', ar: 'مصادر مسؤولة' },
    body: { en: 'Every raw material is qualified and verified against specification before it enters our process.', ar: 'يخضع كل مادة خام للتأهيل والتحقق من مطابقتها للمواصفات قبل دخولها في عملية الإنتاج.' },
  },
  {
    n: '02',
    icon: FlaskConical,
    title: { en: 'Precise formulation', ar: 'تركيب دقيق' },
    body: { en: 'Validated methods turn actives and standardised botanicals into a consistent, effective product.', ar: 'طرق معتمَدة تحوّل المواد الفعّالة والمستخلصات النباتية الموحَّدة إلى منتج ثابت وفعّال.' },
  },
  {
    n: '03',
    icon: Thermometer,
    title: { en: 'Controlled production', ar: 'إنتاج محكوم' },
    body: { en: 'GMP-grade manufacturing with documented in-process checks at every critical control point.', ar: 'تصنيع بمعايير GMP مع فحوصات موثَّقة أثناء الإنتاج في كل نقطة تحكم حرجة.' },
  },
  {
    n: '04',
    icon: Beaker,
    title: { en: 'Test & release', ar: 'اختبار وإفراج' },
    body: { en: 'Analytical testing confirms identity, purity and potency — nothing ships until it passes.', ar: 'يؤكد الاختبار التحليلي الهوية والنقاء والفعالية — ولا يُشحن شيء قبل اجتيازه.' },
  },
];

const labs = [
  {
    icon: Microscope,
    title: { en: 'Analytical laboratory', ar: 'المعمل التحليلي' },
    body: { en: 'Instrumental analysis for identity, assay and purity, supporting both release and stability testing.', ar: 'تحليل آلي للهوية والمقايسة والنقاء، يدعم اختبارات الإفراج والثبات.' },
  },
  {
    icon: Beaker,
    title: { en: 'Physical & chemical testing', ar: 'الاختبارات الفيزيائية والكيميائية' },
    body: { en: 'From dissolution and pH to viscosity and uniformity — the checks that prove a product performs.', ar: 'من الذوبان والأس الهيدروجيني إلى اللزوجة والتجانس — الفحوصات التي تثبت أداء المنتج.' },
  },
  {
    icon: Thermometer,
    title: { en: 'Stability program', ar: 'برنامج الثبات' },
    body: { en: 'Real-time and accelerated studies confirm shelf life and behaviour across storage conditions.', ar: 'دراسات آنية ومُسرَّعة تؤكد مدة الصلاحية والسلوك عبر ظروف التخزين المختلفة.' },
  },
  {
    icon: ShieldCheck,
    title: { en: 'Microbiological control', ar: 'الرقابة الميكروبيولوجية' },
    body: { en: 'Environmental monitoring and product testing safeguard against contamination.', ar: 'مراقبة بيئية واختبار للمنتجات يحميان من التلوث.' },
  },
];

export default function QualityPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Quality', url: '/quality' }])} />
      <PageHero
        eyebrow={<L text={{ en: 'Quality & compliance', ar: 'الجودة والامتثال' }} />}
        title={
          <>
            <L text={{ en: 'Quality is', ar: 'الجودة' }} />{' '}
            <span className="text-gradient"><L text={{ en: 'designed in', ar: 'مصمَّمة داخليًا' }} /></span>
            {', '}
            <L text={{ en: 'not inspected on', ar: 'وليست مجرد فحص لاحق' }} />
          </>
        }
        lead={
          <L
            text={{
              en: 'From the first raw material to the sealed pack, every Loremed product is built and verified to standards that protect the families who use it.',
              ar: 'من أول مادة خام إلى العبوة المختومة، يُبنى كل منتج من لوريمد ويُتحقق منه وفق معايير تحمي العائلات التي تستخدمه.',
            }}
          />
        }
        crumbs={[{ label: <L text={{ en: 'Quality', ar: 'الجودة' }} />, href: '/quality' }]}
      />

      {/* Assurance process */}
      <section id="assurance" className="section pt-4">
        <Container>
          <SectionHeading
            eyebrow={<L text={{ en: 'Quality assurance', ar: 'ضمان الجودة' }} />}
            title={
              <>
                <L text={{ en: 'Four stages,', ar: 'أربع مراحل،' }} />{' '}
                <span className="text-gradient"><L text={{ en: 'zero compromise', ar: 'بلا أي تنازل' }} /></span>
              </>
            }
            lead={
              <L
                text={{
                  en: 'Quality is not a final checkpoint — it is engineered into every stage of how a Loremed product comes to life.',
                  ar: 'الجودة ليست نقطة تفتيش أخيرة — بل هي مصمَّمة في كل مرحلة من مراحل إنتاج منتج لوريمد.',
                }}
              />
            }
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
                  <h3 className="mt-4 text-lg font-semibold text-ink"><L text={s.title} /></h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft"><L text={s.body} /></p>
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
                <Eyebrow><L text={{ en: 'Laboratories & testing', ar: 'المعامل والاختبارات' }} /></Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 text-display-md sm:text-display-lg">
                  <L text={{ en: 'Proof, not', ar: 'إثبات، لا' }} />{' '}
                  <span className="text-gradient"><L text={{ en: 'promises', ar: 'وعود' }} /></span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                  <L
                    text={{
                      en: 'Our laboratories do the quiet, essential work that turns a formulation into a product you can trust — verifying every claim before it reaches the shelf.',
                      ar: 'تقوم معاملنا بالعمل الهادئ والأساسي الذي يحوّل التركيبة إلى منتج يمكنك الوثوق به — من خلال التحقق من كل ادّعاء قبل وصوله إلى الرف.',
                    }}
                  />
                </p>
              </Reveal>
            </div>
            <Stagger className="grid gap-4 sm:grid-cols-2">
              {labs.map((l) => (
                <StaggerItem key={l.title.en} className="h-full">
                  <div className="h-full rounded-3xl border border-line bg-white p-6 shadow-soft">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary-50 text-secondary-600">
                      <l.icon className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <h3 className="mt-4 font-semibold text-ink"><L text={l.title} /></h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft"><L text={l.body} /></p>
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
            eyebrow={<L text={{ en: 'Standards & compliance', ar: 'المعايير والامتثال' }} />}
            title={
              <>
                <L text={{ en: 'Built to the frameworks the', ar: 'مبنيّون وفق الأطر التي' }} />{' '}
                <span className="text-gradient"><L text={{ en: 'world trusts', ar: 'يثق بها العالم' }} /></span>
              </>
            }
            lead={
              <L
                text={{
                  en: 'Our quality system and operations are aligned with the internationally recognised standards that define modern pharmaceutical practice.',
                  ar: 'يتماشى نظام الجودة وعملياتنا مع المعايير المعترف بها دوليًا التي تُحدّد الممارسة الصيدلانية الحديثة.',
                }}
              />
            }
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
                    <h3 className="font-semibold text-ink"><L text={s.title} /></h3>
                    <span className="mt-0.5 inline-block rounded-md bg-secondary-50 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-secondary-700">
                      {s.code}
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft"><L text={s.body} /></p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-ink-muted">
            <L
              text={{
                en: 'Codes shown represent the standards and regulatory frameworks that guide Loremed’s quality system and product development.',
                ar: 'الرموز الموضحة تمثل المعايير والأطر التنظيمية التي توجّه نظام الجودة وتطوير المنتجات لدى لوريمد.',
              }}
            />
          </p>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
