import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Section';
import { categories } from '@/content/products';
import { L } from '@/i18n/Localized';

/**
 * Photo-led category cards give visitors a faster, more intuitive way to
 * discover the right product range.  These use real Loremed pack photography
 * already supplied with the site, rather than illustrative placeholder art.
 */
const categoryCampaigns = {
  'respiratory-care': {
    image: '/media/campaigns/cough-chest.png',
    eyebrow: { en: 'Breathe easier', ar: 'تنفّس براحة أكبر' },
    message: { en: 'Comfort for every cough season.', ar: 'راحة لكل موسم سعال.' },
    theme: 'from-[#eef5eb] via-white to-[#f8dcc7]',
  },
  'kids-health': {
    image: '/media/campaigns/children.png',
    eyebrow: { en: 'Made for little ones', ar: 'مصمّم للصغار' },
    message: { en: 'Gentle care for growing days.', ar: 'عناية لطيفة لأيام النمو.' },
    theme: 'from-[#fff0d9] via-white to-[#f4e8fb]',
  },
  'vitamins-minerals': {
    image: '/media/campaigns/vitamins-minerals.png',
    eyebrow: { en: 'Everyday essentials', ar: 'أساسيات كل يوم' },
    message: { en: 'Nourish your best every day.', ar: 'تغذية لأفضل أيامك.' },
    theme: 'from-[#e9f2ff] via-white to-[#fff1dc]',
  },
  'immune-support': {
    image: '/media/Imulormed.webp',
    eyebrow: { en: 'Everyday defence', ar: 'دعم يومي' },
    message: { en: 'Support that fits your routine.', ar: 'دعم ينسجم مع روتينك.' },
    theme: 'from-[#f2eafb] via-white to-[#fde7d8]',
  },
  'omega-brain': {
    image: '/media/campaigns/omega-focus.png',
    eyebrow: { en: 'Think brighter', ar: 'تفكير أكثر إشراقاً' },
    message: { en: 'Focused nutrition for growing minds.', ar: 'تغذية مركّزة لعقول تنمو.' },
    theme: 'from-[#e6f4f7] via-white to-[#f1eafb]',
  },
  dermatology: {
    image: '/media/campaigns/skin-care.png',
    eyebrow: { en: 'Skin comfort', ar: 'راحة البشرة' },
    message: { en: 'Restore softness. Feel like yourself.', ar: 'استعيدي النعومة واشعري بالراحة.' },
    theme: 'from-[#f8eee8] via-white to-[#e9f0fb]',
  },
} as const;

export function CategoryTiles() {
  // Campaign photography has been supplied for these currently promoted ranges.
  const promotedCategories = categories.filter((category) => category.id !== 'immune-support');

  return (
    <section className="section-tight bg-surface-subtle">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-secondary-600">
            <L text={{ en: 'Find your everyday care', ar: 'اكتشف عنايتك اليومية' }} />
          </p>
          <h2 className="mt-3 text-display-sm sm:text-display-md">
            <L text={{ en: 'Care made for every day of life.', ar: 'عناية تناسب كل يوم من حياتك.' }} />
          </h2>
          <p className="mt-3 text-base text-ink-soft sm:text-lg">
            <L text={{ en: 'Explore targeted solutions for the moments that matter most.', ar: 'اكتشف حلولاً مخصّصة للحظات التي تهمك أكثر.' }} />
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {promotedCategories.map((category) => {
            const campaign = categoryCampaigns[category.id];
            return (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="group relative isolate aspect-square overflow-hidden rounded-3xl bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-4"
              >
                <Image
                  src={campaign.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/95 via-primary-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary-200">
                    <L text={campaign.eyebrow} />
                  </p>
                  <h3 className="mt-1 text-xl font-semibold leading-tight">
                    <L text={category.label} />
                  </h3>
                  <p className="mt-1 text-sm leading-snug text-white/85">
                    <L text={campaign.message} />
                  </p>
                  <span className="mt-3 inline-flex items-center text-sm font-semibold text-white transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                    <L text={{ en: 'Explore range', ar: 'اكتشف المجموعة' }} /> <span aria-hidden="true" className="ms-1">→</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
