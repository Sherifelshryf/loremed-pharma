import { products, categories } from '@/content/products';
import { Button } from '@/components/ui/Button';
import { Container, Eyebrow } from '@/components/ui/Section';
import { ProductCard, categoryIcons } from '@/components/ui/ProductCard';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/motion';
import Link from 'next/link';

export function FeaturedProducts() {
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <section id="products" className="section relative overflow-hidden">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Featured products</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-display-md sm:text-display-lg">
                Formulas families <span className="text-gradient">reach for</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                A cross-section of the Loremed range — from immune and respiratory care to daily
                essentials and omega nutrition.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <Button href="/products" variant="outline" withArrow className="shrink-0">
              View all products
            </Button>
          </Reveal>
        </div>

        {/* category chips */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((c) => {
              const Icon = categoryIcons[c.id];
              return (
                <Link
                  key={c.id}
                  href={`/products?category=${c.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink-soft transition-all hover:border-primary-300 hover:bg-primary-50 hover:text-primary-800"
                >
                  <Icon className="h-4 w-4 text-secondary-500" strokeWidth={1.8} />
                  {c.label}
                </Link>
              );
            })}
          </div>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <StaggerItem key={p.slug} className="h-full">
              <ProductCard product={p} className="h-full" />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
