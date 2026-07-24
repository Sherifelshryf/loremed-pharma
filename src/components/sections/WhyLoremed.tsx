'use client';

import { valueProps } from '@/content/company';
import { Container, SectionHeading } from '@/components/ui/Section';
import { Stagger, StaggerItem } from '@/components/ui/motion';
import { DotField } from '@/components/graphics/BrandBackdrop';
import { useI18n } from '@/i18n/LanguageProvider';

const copy = {
  eyebrow: { en: 'Why Loremed', ar: 'لماذا لورميد' },
  titlePre: { en: 'Reasons the region is coming to', ar: 'الأسباب التي تجعل المنطقة' },
  titleAccent: { en: 'trust us', ar: 'تثق بنا' },
  lead: {
    en: 'We pair pharmaceutical rigour with a genuine care for the people who take our products — and it shows in everything we make.',
    ar: 'نجمع بين الصرامة الصيدلانية والاهتمام الحقيقي بالأشخاص الذين يتناولون منتجاتنا — وهذا يظهر في كل ما نصنعه.',
  },
};

export function WhyLoremed() {
  const { locale } = useI18n();
  return (
    <section id="why" className="section relative overflow-hidden bg-surface-muted">
      <DotField className="opacity-70" />
      <Container className="relative">
        <SectionHeading
          eyebrow={copy.eyebrow[locale]}
          title={
            <>
              {copy.titlePre[locale]} <span className="text-gradient">{copy.titleAccent[locale]}</span>
            </>
          }
          lead={copy.lead[locale]}
          align="center"
          className="mx-auto max-w-3xl"
        />

        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {valueProps.map((v) => (
            <StaggerItem key={v.title.en}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-white p-8 shadow-soft transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-lift">
                <div
                  aria-hidden
                  className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="relative">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 text-primary-700 transition-colors duration-500 group-hover:from-primary-800 group-hover:to-primary-700 group-hover:text-white">
                    <v.icon className="h-6 w-6" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold text-ink">{v.title[locale]}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{v.body[locale]}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
