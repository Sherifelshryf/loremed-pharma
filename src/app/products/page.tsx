import { Suspense } from 'react';
import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { ProductCatalogue } from '@/components/sections/ProductCatalogue';
import { Container } from '@/components/ui/Section';
import { buildMetadata, breadcrumbSchema, JsonLd } from '@/lib/seo';
import { products } from '@/content/products';
import { medicalDisclaimer } from '@/content/site';
import { L } from '@/i18n/Localized';

export const metadata: Metadata = buildMetadata({
  title: 'Products',
  description:
    'Explore the Loremed Pharma catalogue — immune support, respiratory care, vitamins, kids health, omega and dermatology. Science-backed medicines and nutritional supplements.',
  path: '/products',
  keywords: ['Loremed products', 'nutritional supplements', 'ivy leaf syrup', 'omega-3', 'multivitamin', 'immune support'],
});

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Loremed Pharma Products',
  numberOfItems: products.length,
  itemListElement: products.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.name,
    url: `/products/${p.slug}`,
  })),
};

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={[itemListSchema, breadcrumbSchema([{ name: 'Products', url: '/products' }])]} />
      <PageHero
        eyebrow={<L text={{ en: 'Our catalogue', ar: 'كتالوجنا' }} />}
        title={
          <>
            <L text={{ en: 'Products that raise the', ar: 'منتجات ترفع' }} />{' '}
            <span className="text-gradient"><L text={{ en: 'standard of care', ar: 'معايير الرعاية' }} /></span>
          </>
        }
        lead={
          <L
            text={{
              en: 'From daily essentials to targeted therapeutic support — every Loremed formula is built on standardised actives, honest labels and GMP-grade quality.',
              ar: 'من الأساسيات اليومية إلى الدعم العلاجي الموجَّه — كل تركيبة من لورميد مبنية على مواد فعّالة موحَّدة، وملصقات صادقة، وجودة بمعايير GMP.',
            }}
          />
        }
        crumbs={[{ label: <L text={{ en: 'Products', ar: 'المنتجات' }} />, href: '/products' }]}
      />

      <Suspense
        fallback={
          <div className="py-24 text-center text-ink-muted">
            <L text={{ en: 'Loading products…', ar: 'جارٍ تحميل المنتجات…' }} />
          </div>
        }
      >
        <ProductCatalogue />
      </Suspense>

      <Container className="pb-20">
        <p className="rounded-2xl border border-line bg-neutral-50 px-6 py-5 text-xs leading-relaxed text-ink-muted">
          {medicalDisclaimer}
        </p>
      </Container>
    </>
  );
}
