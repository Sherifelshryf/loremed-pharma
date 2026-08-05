import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, Download, Package, Users, Pipette, ArrowRight, Leaf } from 'lucide-react';
import { products, getProduct, getCategory, statusLabels } from '@/content/products';
import { medicalDisclaimer } from '@/content/site';
import { Container, Eyebrow, Badge } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { ProductVisual, ProductCard } from '@/components/ui/ProductCard';
import { categoryIcons } from '@/components/ui/categoryIcons';
import { AddToCartBox } from '@/components/sections/AddToCartBox';
import { ProductVideo } from '@/components/sections/ProductVideo';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/motion';
import { GridField, GradientOrb } from '@/components/graphics/BrandBackdrop';
import { L } from '@/i18n/Localized';
import { buildMetadata, productSchema, breadcrumbSchema, JsonLd } from '@/lib/seo';
import { cn } from '@/lib/utils';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProduct(params.slug);
  if (!product) return buildMetadata({ title: 'Product', path: '/products' });
  return buildMetadata({
    title: product.name.en,
    description: product.shortDescription.en,
    path: `/products/${product.slug}`,
    keywords: [product.name.en, product.tagline.en, ...product.keyIngredients.map((k) => k.name.en)],
  });
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const CatIcon = categoryIcons[product.category];
  const related = product.related
    .map((slug) => getProduct(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p) && p!.slug !== product.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          productSchema(product),
          breadcrumbSchema([
            { name: 'Products', url: '/products' },
            { name: product.name.en, url: `/products/${product.slug}` },
          ]),
        ]}
      />

      {/* Header */}
      <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-50/70 via-white to-white" />
          <GridField className="opacity-50" />
          <GradientOrb color={product.accent === 'orange' ? 'orange' : 'purple'} size={520} className="-right-28 -top-16 opacity-60" />
        </div>

        <Container>
          <Reveal>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-primary-700"
            >
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
              <L text={{ en: 'All products', ar: 'كل المنتجات' }} />
            </Link>
          </Reveal>

          <div className="mt-8 grid items-start gap-12 pb-16 lg:grid-cols-2 lg:gap-16">
            {/* Visual */}
            <Reveal>
              <div className="relative">
                <div className="overflow-hidden rounded-4xl border border-line shadow-glow">
                  <ProductVisual accent={product.accent} category={product.category} image={product.image} name={product.name.en} className="aspect-[4/3]" />
                </div>
                <div className="absolute -bottom-5 left-6 flex items-center gap-2 rounded-2xl border border-line bg-white px-4 py-2.5 shadow-card">
                  <CatIcon className="h-5 w-5 text-secondary-500" strokeWidth={1.8} />
                  <span className="text-sm font-medium text-ink">{category && <L text={category.label} />}</span>
                </div>
              </div>
            </Reveal>

            {/* Info */}
            <div>
              <Reveal>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge tone={product.status === 'available' ? 'success' : 'purple'}>
                    <L text={statusLabels[product.status]} />
                  </Badge>
                  <Eyebrow>{category && <L text={category.label} />}</Eyebrow>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-4 text-display-lg text-ink">
                  <L text={product.name} />
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-2 text-xl font-medium text-secondary-600">
                  <L text={product.tagline} />
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                  <L text={product.description} />
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <MetaCard icon={Pipette} label={<L text={{ en: 'Form', ar: 'الشكل الدوائي' }} />} value={<L text={product.form} />} />
                  <MetaCard icon={Users} label={<L text={{ en: 'Suitable for', ar: 'مناسب لـ' }} />} value={<L text={product.ageGroup} />} />
                  <MetaCard icon={Package} label={<L text={{ en: 'Pack size', ar: 'حجم العبوة' }} />} value={<L text={product.pack} />} />
                </div>
              </Reveal>

              {product.status === 'available' && (
                <Reveal delay={0.2}>
                  <div className="mt-8">
                    <AddToCartBox product={product} />
                  </div>
                </Reveal>
              )}

              <Reveal delay={0.25}>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="/contact" variant={product.status === 'available' ? 'outline' : 'primary'} withArrow={product.status !== 'available'}>
                    <L text={{ en: 'Enquire about', ar: 'استفسر عن' }} /> <L text={product.name} />
                  </Button>
                  <Button href="/contact#departments" variant="outline">
                    <Download className="h-4 w-4" />
                    <L text={{ en: 'Request datasheet', ar: 'اطلب النشرة الفنية' }} />
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Product video */}
      {product.youtubeId && <ProductVideo youtubeId={product.youtubeId} name={product.name} />}

      {/* Ingredients + benefits */}
      <section className="section pt-0">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Ingredients */}
            <Reveal>
              <div className="h-full rounded-4xl border border-line bg-surface-muted p-8 sm:p-10">
                <div className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-success-600" />
                  <h2 className="text-xl font-semibold text-ink"><L text={{ en: 'Key ingredients', ar: 'المكونات الرئيسية' }} /></h2>
                </div>
                <ul className="mt-6 space-y-4">
                  {product.keyIngredients.map((k) => (
                    <li key={k.name.en} className="flex items-start justify-between gap-4 border-b border-line pb-4 last:border-0 last:pb-0">
                      <span className="font-medium text-ink"><L text={k.name} /></span>
                      <span className="text-end text-sm text-ink-muted"><L text={k.note} /></span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Benefits + usage */}
            <Reveal delay={0.05}>
              <div className="flex h-full flex-col gap-6">
                <div className="rounded-4xl border border-line bg-white p-8 shadow-soft sm:p-10">
                  <h2 className="text-xl font-semibold text-ink"><L text={{ en: 'Benefits', ar: 'الفوائد' }} /></h2>
                  <Stagger className="mt-6 space-y-3">
                    {product.benefits.map((b) => (
                      <StaggerItem key={b.en}>
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-success-50 text-success-600">
                            <Check className="h-3.5 w-3.5" strokeWidth={3} />
                          </span>
                          <span className="text-ink-soft"><L text={b} /></span>
                        </div>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
                <div className="rounded-4xl border border-primary-100 bg-primary-50/60 p-8 sm:p-10">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-700"><L text={{ en: 'How to use', ar: 'طريقة الاستخدام' }} /></h3>
                  <p className="mt-2 text-ink-soft"><L text={product.usage} /></p>
                </div>
              </div>
            </Reveal>
          </div>

          <p className="mt-10 rounded-2xl border border-line bg-neutral-50 px-6 py-5 text-xs leading-relaxed text-ink-muted">
            {medicalDisclaimer}
          </p>
        </Container>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section bg-surface-muted pt-0 sm:pt-0">
          <div className="pt-20 sm:pt-24">
            <Container>
              <div className="mb-10 flex items-end justify-between">
                <div>
                  <Eyebrow><L text={{ en: 'You might also like', ar: 'قد يعجبك أيضًا' }} /></Eyebrow>
                  <h2 className="mt-3 text-display-sm sm:text-display-md"><L text={{ en: 'Related products', ar: 'منتجات ذات صلة' }} /></h2>
                </div>
                <Link
                  href="/products"
                  className="hidden items-center gap-1 text-sm font-medium text-primary-700 hover:text-secondary-600 sm:inline-flex"
                >
                  <L text={{ en: 'View all', ar: 'عرض الكل' }} />
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <ProductCard key={p.slug} product={p} className="h-full" />
                ))}
              </div>
            </Container>
          </div>
        </section>
      )}
    </>
  );
}

function MetaCard({ icon: Icon, label, value }: { icon: typeof Package; label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className={cn('rounded-2xl border border-line bg-white p-4 shadow-soft')}>
      <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-ink-muted">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="mt-1.5 text-sm font-semibold text-ink">{value}</div>
    </div>
  );
}
