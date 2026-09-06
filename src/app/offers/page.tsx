import type { Metadata } from 'next';
import { Tag, Sparkles } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { L } from '@/i18n/Localized';
import { buildMetadata, breadcrumbSchema, JsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Offers & Bundles',
    description: 'Bundle deals and seasonal offers from Loremed Pharma — coming soon.',
    path: '/offers',
  }),
  // Nothing to rank on yet; let it into the index once there are real offers.
  robots: { index: false, follow: true },
};

export default function OffersPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Offers & Bundles', url: '/offers' }])} />
      <PageHero
        eyebrow={<L text={{ en: 'Offers & Bundles', ar: 'العروض والباقات' }} />}
        title={
          <>
            <L text={{ en: 'Offers and bundles', ar: 'العروض والباقات' }} />{' '}
            <span className="text-gradient">
              <L text={{ en: 'coming soon', ar: 'قريبًا' }} />
            </span>
          </>
        }
        lead={
          <L
            text={{
              en: 'We’re putting together bundle deals and seasonal offers. Check back shortly — in the meantime, the full range is ready to order.',
              ar: 'نُجهّز حاليًا عروض الباقات والخصومات الموسمية. تابعنا قريبًا — وحتى ذلك الحين، كل المنتجات جاهزة للطلب.',
            }}
          />
        }
        crumbs={[{ label: <L text={{ en: 'Offers & Bundles', ar: 'العروض والباقات' }} />, href: '/offers' }]}
      />

      <Container size="narrow" className="pb-20">
        <div className="flex flex-col items-center rounded-3xl border border-line bg-white px-8 py-16 text-center shadow-card">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-danger-50 text-danger-600">
            <Tag className="h-7 w-7" />
          </span>
          <h2 className="mt-6 text-2xl font-semibold text-ink">
            <L text={{ en: 'Nothing here just yet', ar: 'لا يوجد شيء هنا بعد' }} />
          </h2>
          <p className="mt-2 max-w-md text-ink-soft">
            <L
              text={{
                en: 'Bundle pricing and limited-time offers are on the way. Pharmacies and distributors can ask about trade pricing today.',
                ar: 'أسعار الباقات والعروض محدودة المدة في الطريق. يمكن للصيدليات وشركات التوزيع الاستفسار عن أسعار الجملة الآن.',
              }}
            />
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/products" variant="primary" withArrow>
              <L text={{ en: 'Shop all products', ar: 'تسوّق كل المنتجات' }} />
            </Button>
            <Button href="/wholesale" variant="outline">
              <Sparkles className="h-4 w-4 text-secondary-500" />
              <L text={{ en: 'Ask about trade pricing', ar: 'اسأل عن أسعار الجملة' }} />
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
