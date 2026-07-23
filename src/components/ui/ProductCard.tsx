import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Eye, Wind, Pill, Baby, Brain, Droplets, ShieldPlus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Product, ProductCategory } from '@/content/products';
import { statusLabels } from '@/content/products';
import { cn } from '@/lib/utils';

export const categoryIcons: Record<ProductCategory, LucideIcon> = {
  'immune-support': ShieldPlus,
  'respiratory-care': Wind,
  'vitamins-minerals': Pill,
  'kids-health': Baby,
  'omega-brain': Brain,
  dermatology: Droplets,
};

const categoryLabels: Record<ProductCategory, string> = {
  'immune-support': 'Immune Support',
  'respiratory-care': 'Respiratory Care',
  'vitamins-minerals': 'Vitamins & Minerals',
  'kids-health': 'Kids Health',
  'omega-brain': 'Omega & Brain',
  dermatology: 'Dermatology',
};

/** Product visual — shows product image if available, otherwise falls back to branded gradient. */
export function ProductVisual({
  accent,
  category,
  image,
  name,
  className,
}: {
  accent: 'purple' | 'orange';
  category: ProductCategory;
  image?: string;
  name?: string;
  className?: string;
}) {
  const Icon = categoryIcons[category];

  if (image) {
    return (
      <div className={cn('relative aspect-[16/11] w-full overflow-hidden bg-white', className)}>
        <Image
          src={image}
          alt={name ?? ''}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative aspect-[16/11] w-full overflow-hidden',
        accent === 'purple'
          ? 'bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900'
          : 'bg-gradient-to-br from-secondary-400 via-secondary-500 to-secondary-700',
        className,
      )}
    >
      {/* geometric quarter arcs */}
      <svg viewBox="0 0 400 260" className="absolute inset-0 h-full w-full" aria-hidden fill="none">
        <circle cx="320" cy="40" r="150" stroke="white" strokeOpacity="0.12" strokeWidth="1.5" />
        <circle cx="320" cy="40" r="100" stroke="white" strokeOpacity="0.14" strokeWidth="1.5" />
        <path d="M0 230 Q120 150 400 210" stroke="white" strokeOpacity="0.14" strokeWidth="1.5" />
      </svg>
      <div
        aria-hidden
        className="absolute -right-10 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl"
      />
      {/* glass emblem */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid h-20 w-20 place-items-center rounded-3xl border border-white/25 bg-white/15 backdrop-blur-md">
          <Icon className="h-9 w-9 text-white" strokeWidth={1.6} />
        </div>
      </div>
    </div>
  );
}

export function ProductCard({
  product,
  onQuickView,
  className,
}: {
  product: Product;
  onQuickView?: (slug: string) => void;
  className?: string;
}) {
  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-lift',
        className,
      )}
    >
      <div className="relative overflow-hidden">
        <div className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]">
          <ProductVisual accent={product.accent} category={product.category} image={product.image} name={product.name} />
        </div>
        {/* status badge */}
        <span
          className={cn(
            'absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur',
            product.status === 'available'
              ? 'bg-white/90 text-success-700'
              : 'bg-primary-950/70 text-white',
          )}
        >
          <span
            className={cn(
              'h-1.5 w-1.5 rounded-full',
              product.status === 'available' ? 'bg-success-500' : 'bg-secondary-400',
            )}
          />
          {statusLabels[product.status]}
        </span>
        {onQuickView && (
          <button
            onClick={() => onQuickView(product.slug)}
            className="absolute right-4 top-4 grid h-9 w-9 translate-y-1 place-items-center rounded-full bg-white/90 text-primary-800 opacity-0 shadow-soft backdrop-blur transition-all duration-300 hover:bg-white group-hover:translate-y-0 group-hover:opacity-100"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">
          <span className="text-secondary-600">{categoryLabels[product.category]}</span>
          <span className="text-line-strong">·</span>
          <span>{product.form}</span>
        </div>
        <h3 className="mt-2 text-xl font-semibold text-ink transition-colors group-hover:text-primary-800">
          <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-medium text-secondary-600">{product.tagline}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{product.shortDescription}</p>

        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <span className="text-xs text-ink-muted">{product.ageGroup}</span>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-700 transition-colors group-hover:text-secondary-600">
            View product
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
          </span>
        </div>
      </div>
    </article>
  );
}
