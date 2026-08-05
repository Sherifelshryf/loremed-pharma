import Link from 'next/link';
import { Container } from '@/components/ui/Section';
import { categories, products } from '@/content/products';
import { categoryIcons } from '@/components/ui/categoryIcons';
import { L } from '@/i18n/Localized';

/** Products that count toward a category, primary or secondary. */
function countFor(id: (typeof categories)[number]['id']) {
  return products.filter(
    (p) => p.status === 'available' && (p.category === id || p.secondaryCategories?.includes(id)),
  ).length;
}

/**
 * "What are you looking for?" — the main way into the catalogue.
 *
 * Big tap targets with a plain-language label and a one-line explanation, so a
 * shopper who does not know the brand names can still find the right shelf.
 * Empty categories are hidden rather than shown as dead ends.
 */
export function CategoryTiles() {
  const shown = categories.map((c) => ({ ...c, count: countFor(c.id) })).filter((c) => c.count > 0);

  return (
    <section className="section-tight">
      <Container>
        <h2 className="text-center text-display-sm sm:text-display-md">
          <L text={{ en: 'What are you looking for?', ar: 'عن ماذا تبحث؟' }} />
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((c) => {
            const Icon = categoryIcons[c.id];
            return (
              <Link
                key={c.id}
                href={`/products?category=${c.id}`}
                className="flex items-start gap-4 rounded-3xl border border-line bg-white p-5 shadow-soft hover:border-primary-300 hover:bg-primary-50"
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary-50 text-primary-800">
                  <Icon className="h-7 w-7" strokeWidth={1.8} />
                </span>
                <span className="min-w-0">
                  <span className="block text-lg font-semibold text-ink">
                    <L text={c.label} />
                  </span>
                  <span className="mt-1 block text-sm text-ink-soft">
                    <L text={c.description} />
                  </span>
                  <span className="mt-2 block text-sm font-semibold text-secondary-600">
                    {c.count}{' '}
                    <L text={c.count === 1 ? { en: 'product', ar: 'منتج' } : { en: 'products', ar: 'منتجات' }} />
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
