import { Suspense } from 'react';
import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { ProductCatalogue } from '@/components/sections/ProductCatalogue';
import { Container } from '@/components/ui/Section';
import { buildMetadata, breadcrumbSchema, JsonLd } from '@/lib/seo';
import { products } from '@/content/products';
import { medicalDisclaimer } from '@/content/site';

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
        eyebrow="Our catalogue"
        title={
          <>
            Products that raise the <span className="text-gradient">standard of care</span>
          </>
        }
        lead="From daily essentials to targeted therapeutic support — every Loremed formula is built on standardised actives, honest labels and GMP-grade quality."
        crumbs={[{ label: 'Products', href: '/products' }]}
      />

      <Suspense fallback={<div className="py-24 text-center text-ink-muted">Loading products…</div>}>
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
