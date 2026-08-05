'use client';

import { ShieldCheck } from 'lucide-react';
import { Container, Eyebrow } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/motion';
import { LogoMark } from '@/components/logo/Logo';
import { useI18n } from '@/i18n/LanguageProvider';

const steps = [
  {
    n: '01',
    title: { en: 'Responsible sourcing', ar: 'مصادر مسؤولة' },
    body: { en: 'Every raw material is qualified and verified before it enters our process.', ar: 'يخضع كل مادة خام للتأهيل والتحقق قبل دخولها في عملية الإنتاج.' },
  },
  {
    n: '02',
    title: { en: 'Precise formulation', ar: 'تركيب دقيق' },
    body: { en: 'Validated methods turn actives and botanicals into a consistent product.', ar: 'طرق معتمَدة تحوّل المواد الفعّالة والمستخلصات النباتية إلى منتج ثابت الجودة.' },
  },
  {
    n: '03',
    title: { en: 'Controlled production', ar: 'إنتاج محكوم' },
    body: { en: 'GMP-grade manufacturing with in-process checks at every critical step.', ar: 'تصنيع بمعايير GMP مع فحوصات أثناء الإنتاج في كل خطوة حرجة.' },
  },
  {
    n: '04',
    title: { en: 'Test & release', ar: 'اختبار وإفراج' },
    body: { en: 'Analytical testing confirms identity, purity and potency before release.', ar: 'يؤكد الاختبار التحليلي الهوية والنقاء والفعالية قبل الإفراج عن المنتج.' },
  },
];

const copy = {
  eyebrow: { en: 'Quality assurance', ar: 'ضمان الجودة' },
  titlePre: { en: 'Trust is', ar: 'الثقة' },
  titleAccent: { en: 'built', ar: 'تُبنى' },
  titlePost: { en: ', one batch at a time', ar: '، دفعة تلو الأخرى' },
  lead: {
    en: 'Quality is not a final checkpoint — it is designed into every stage. From the first raw material to the sealed pack, nothing reaches a family until it meets our specification in full.',
    ar: 'الجودة ليست نقطة تفتيش أخيرة — بل هي مصمَّمة في كل مرحلة. من أول مادة خام إلى العبوة المختومة، لا يصل شيء إلى أي أسرة قبل أن يستوفي مواصفاتنا بالكامل.',
  },
  badge: {
    en: 'GMP-grade production · Full batch traceability · Analytical release testing',
    ar: 'إنتاج بمعايير GMP · تتبّع كامل للدفعات · اختبار تحليلي للإفراج',
  },
  cta: { en: 'Inside our quality system', ar: 'داخل نظام الجودة لدينا' },
};

export function QualityAssurance() {
  const { locale } = useI18n();
  return (
    <section id="quality" className="relative overflow-hidden bg-primary-950 py-24 text-white sm:py-28 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-primary-700/30" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-secondary-500/15" />
        <LogoMark className="absolute -left-10 bottom-0 hidden h-80 opacity-[0.06] lg:block" />
      </div>

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Reveal>
              <Eyebrow variant="inverse">{copy.eyebrow[locale]}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-display-md text-white sm:text-display-lg">
                {copy.titlePre[locale]} <span className="text-gradient-orange">{copy.titleAccent[locale]}</span>
                {copy.titlePost[locale]}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/60">{copy.lead[locale]}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/12 bg-white/5 px-5 py-4">
                <ShieldCheck className="h-6 w-6 text-success-500" />
                <span className="text-sm text-white/80">{copy.badge[locale]}</span>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-9">
                <Button href="/quality" variant="inverse" withArrow>
                  {copy.cta[locale]}
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Steps */}
          <Stagger className="grid gap-4 sm:grid-cols-2">
            {steps.map((s) => (
              <StaggerItem key={s.n}>
                <div className="group h-full rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition-colors hover:border-white/20 hover:bg-white/[0.07]">
                  <span className="text-3xl font-bold text-secondary-400">{s.n}</span>
                  <h3 className="mt-4 text-lg font-semibold text-white">{s.title[locale]}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{s.body[locale]}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
