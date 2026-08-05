import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Section';
import { products } from '@/content/products';
import { ProductCard } from '@/components/ui/ProductCard';
import { L } from '@/i18n/Localized';

/**
 * The shop itself, on the homepage.
 *
 * Every product that can actually be bought is shown with its price and an add
 * button, so a shopper never has to navigate before they can buy. Products
 * still in registration are deliberately left out — they cannot be ordered, and
 * mixing them in makes the page look like a brochure rather than a shop.
 */
export function ShopProducts() {
  const available = products.filter((p) => p.status === 'available');

  return (
    <section className="section-tight bg-surface-muted">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-display-sm sm:text-display-md">
            <L text={{ en: 'Our products', ar: 'منتجاتنا' }} />
          </h2>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-base font-semibold text-primary-700 hover:text-secondary-600"
          >
            <L text={{ en: 'See all', ar: 'عرض الكل' }} />
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {available.map((p) => (
            <ProductCard key={p.slug} product={p} className="h-full" />
          ))}
        </div>
      </Container>
    </section>
  );
}
