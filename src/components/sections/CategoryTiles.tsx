import Link from 'next/link';
import { ProductImage } from '@/components/ui/ProductImage';
import { Container } from '@/components/ui/Section';
import { categories } from '@/content/products';
import { L } from '@/i18n/Localized';

const categoryCampaigns = {
  'respiratory-care': { image: '/media/campaigns/cough-chest.webp', label: { en: 'Cough Care', ar: 'العناية بالكحة' }, description: { en: 'Comfort for clearer breathing.', ar: 'راحة وتنفس أسهل.' } },
  'kids-health': { image: '/media/campaigns/children.webp', label: { en: 'Children', ar: 'الأطفال' }, description: { en: 'Gentle support for growing days.', ar: 'دعم لطيف لأيام النمو.' } },
  'vitamins-minerals': { image: '/media/campaigns/vitamins-minerals.webp', label: { en: 'Vitamins', ar: 'الفيتامينات' }, description: { en: 'Daily nutrition, simply covered.', ar: 'تغذية يومية بكل بساطة.' } },
  'immune-support': { image: '/media/Imulormed.webp', label: { en: 'Immunity', ar: 'المناعة' }, description: { en: 'Everyday defence for your family.', ar: 'دعم يومي لعيلتك.' } },
  'omega-brain': { image: '/media/campaigns/omega-focus.webp', label: { en: 'Focus', ar: 'التركيز' }, description: { en: 'Nutrition for bright young minds.', ar: 'تغذية لعقول صغيرة نشيطة.' } },
  dermatology: { image: '/media/campaigns/skin-care.webp', label: { en: 'Skin Care', ar: 'العناية بالبشرة' }, description: { en: 'Soothing care for soft skin.', ar: 'عناية مهدئة لبشرة ناعمة.' } },
} as const;

export function CategoryTiles() {
  // These are the categories with dedicated campaign photography.
  const promotedCategories = categories.filter((category) => category.id !== 'immune-support');

  return (
    <section className="section-tight bg-surface-subtle">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-secondary-600">
            <L text={{ en: 'Find your everyday care', ar: 'اعرف عنايتك اليومية' }} />
          </p>
          <h2 className="mt-3 text-display-sm sm:text-display-md">
            <L text={{ en: 'Thoughtful care for every stage of life.', ar: 'عناية مدروسة لكل مرحلة من مراحل الحياة.' }} />
          </h2>
          <p className="mt-3 text-base text-ink-soft sm:text-lg">
            <L text={{ en: 'Explore targeted solutions for the moments that matter most.', ar: 'هتلاقي حلول مخصوصة للحظات اللي بتهمك أكتر.' }} />
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {promotedCategories.map((category) => {
            const campaign = categoryCampaigns[category.id];
            return (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="block overflow-hidden rounded-2xl border border-line bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-4"
              >
                {/* ProductImage rather than next/image: the static export turns
                    the optimiser off, so next/image emitted a plain <img> with
                    no srcset — `sizes` did nothing and every phone downloaded
                    the full file. ProductImage serves the WebP with a JPEG
                    beside it for browsers too old to decode WebP, which is the
                    fallback the rest of the site already relies on. */}
                <div className="relative aspect-square">
                  <ProductImage
                    src={campaign.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <h3 className="p-4 text-center text-lg font-semibold text-ink">
                  <L text={campaign.label} />
                </h3>
                <p className="px-4 pb-2 text-center text-sm text-ink-soft"><L text={campaign.description} /></p>
                <span className="block px-4 pb-4 text-center text-sm font-semibold text-secondary-600">
                  <L text={{ en: 'Explore products →', ar: 'شوف المنتجات ←' }} />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
