import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { WholesaleForm } from '@/components/sections/WholesaleForm';
import { L } from '@/i18n/Localized';
import { buildMetadata, breadcrumbSchema, JsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Pharmacy & Distributor Orders',
  description:
    'Open a trade account with Loremed Pharma. Pharmacies and distribution companies can send their details and our wholesale team will call back.',
  path: '/wholesale',
  keywords: ['Loremed wholesale', 'pharmacy orders', 'pharmaceutical distributor Egypt', 'trade account'],
});

export default function WholesalePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Wholesale', url: '/wholesale' }])} />
      <PageHero
        eyebrow={<L text={{ en: 'Trade orders', ar: 'طلبات الجملة' }} />}
        title={
          <>
            <L text={{ en: 'For pharmacies and', ar: 'للصيدليات' }} />{' '}
            <span className="text-gradient">
              {/* The Arabic conjunction stays attached to its noun ("وشركات"),
                  so it belongs to the accent span rather than the line before. */}
              <L text={{ en: 'distribution companies', ar: 'وشركات التوزيع' }} />
            </span>
          </>
        }
        lead={
          <L
            text={{
              en: 'Send us your details and our wholesale team will contact you to complete the order — no cart, no account needed.',
              ar: 'أرسل لنا بياناتك وسيتواصل معك فريق المبيعات لاستكمال الطلب — بدون سلة أو حساب.',
            }}
          />
        }
        crumbs={[{ label: <L text={{ en: 'Wholesale', ar: 'طلبات الجملة' }} />, href: '/wholesale' }]}
      />
      <WholesaleForm />
    </>
  );
}
