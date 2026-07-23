import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { OrderClient } from '@/components/sections/OrderClient';
import { L } from '@/i18n/Localized';
import { buildMetadata, breadcrumbSchema, JsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Your Order',
  description: 'Review your cart and place your order with Loremed Pharma.',
  path: '/order',
});

export default function OrderPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Order', url: '/order' }])} />
      <PageHero
        eyebrow={<L text={{ en: 'Checkout', ar: 'إتمام الطلب' }} />}
        title={<L text={{ en: 'Your Order', ar: 'طلبك' }} />}
        lead={
          <L
            text={{
              en: 'Review your items, add your delivery details, and send your order straight to our team on WhatsApp.',
              ar: 'راجع منتجاتك، أضف بيانات التوصيل، وأرسل طلبك مباشرة إلى فريقنا عبر واتساب.',
            }}
          />
        }
        crumbs={[{ label: <L text={{ en: 'Order', ar: 'الطلب' }} />, href: '/order' }]}
      />
      <OrderClient />
    </>
  );
}
