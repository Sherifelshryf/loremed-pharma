import type { Metadata } from 'next';
import { Tag, Sparkles } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { BundleGrid } from '@/components/sections/BundleGrid';
import { sellableBundles } from '@/content/bundles';
import { L } from '@/i18n/Localized';
import { buildMetadata, breadcrumbSchema, JsonLd } from '@/lib/seo';

/**
 * Everything below keys off whether there are bundles to sell.
 *
 * The page is built at export time, so this is decided once per deploy: adding
 * the first bundle at /admin commits, the deploy rebuilds, and the page turns
 * from a placeholder into a shop. Until then it keeps saying "coming soon",
 * which is true and is what the ticker on the home page promises.
 */
const bundles = sellableBundles();
const hasBundles = bundles.length > 0;

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Offers & Bundles',
    description: hasBundles
      ? 'Bundle deals from Loremed Pharma — sets of our products at a set price.'
      : 'Bundle deals and seasonal offers from Loremed Pharma — coming soon.',
    path: '/offers',
  }),
  // Nothing to rank on while the page is a placeholder; let it into the index
  // as soon as there are real offers on it.
  robots: hasBundles ? undefined : { index: false, follow: true },
};

export default function OffersPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Offers & Bundles', url: '/offers' }])} />
      <PageHero
        eyebrow={<L text={{ en: 'Offers & Bundles', ar: 'العروض والباقات' }} />}
        title={
          hasBundles ? (
            <>
              <L text={{ en: 'Offers and', ar: 'العروض' }} />{' '}
              <span className="text-gradient">
                <L text={{ en: 'bundles', ar: 'والباقات' }} />
              </span>
            </>
          ) : (
            <>
              <L text={{ en: 'Offers and bundles', ar: 'العروض والباقات' }} />{' '}
              <span className="text-gradient">
                <L text={{ en: 'coming soon', ar: 'قريبًا' }} />
              </span>
            </>
          )
        }
        lead={
          hasBundles ? (
            <L
              text={{
                en: 'Sets of our products at a set price. Add one to your cart and it goes through on WhatsApp like any other order.',
                ar: 'مجموعات من منتجاتنا بسعر واحد. ضيف الباقة للسلة وهتكمل على واتساب زي أي طلب تاني.',
              }}
            />
          ) : (
            <L
              text={{
                en: 'We’re putting together bundle deals and seasonal offers. Check back shortly — in the meantime, the full range is ready to order.',
                ar: 'بنجهّز دلوقتي عروض الباقات والخصومات الموسمية. تابعنا قريب — ولحد ما تنزل، كل المنتجات جاهزة للطلب.',
              }}
            />
          )
        }
        crumbs={[{ label: <L text={{ en: 'Offers & Bundles', ar: 'العروض والباقات' }} />, href: '/offers' }]}
      />

      {hasBundles ? (
        <Container className="pb-20">
          <BundleGrid bundles={bundles} />
        </Container>
      ) : (
        <Container size="narrow" className="pb-20">
          <div className="flex flex-col items-center rounded-3xl border border-line bg-white px-8 py-16 text-center shadow-card">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-danger-50 text-danger-600">
              <Tag className="h-7 w-7" />
            </span>
            <h2 className="mt-6 text-2xl font-semibold text-ink">
              <L text={{ en: 'Nothing here just yet', ar: 'لسه مفيش حاجة هنا' }} />
            </h2>
            <p className="mt-2 max-w-md text-ink-soft">
              <L
                text={{
                  en: 'Bundle pricing and limited-time offers are on the way. Pharmacies and distributors can ask about trade pricing today.',
                  ar: 'أسعار الباقات والعروض المحدودة المدة في الطريق. الصيدليات وشركات التوزيع تقدر تسأل عن أسعار الجملة من دلوقتي.',
                }}
              />
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/products" variant="primary" withArrow>
                <L text={{ en: 'Shop all products', ar: 'شوف كل المنتجات' }} />
              </Button>
              <Button href="/wholesale" variant="outline">
                <Sparkles className="h-4 w-4 text-secondary-500" />
                <L text={{ en: 'Ask about trade pricing', ar: 'اسأل عن أسعار الجملة' }} />
              </Button>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
