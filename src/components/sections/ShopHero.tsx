import Link from 'next/link';
import { ShieldCheck, Truck, Wallet, Building2, Tag } from 'lucide-react';
import { Container } from '@/components/ui/Section';
import { HeroSlideshow } from '@/components/sections/HeroSlideshow';
import { OffersTicker } from '@/components/sections/OffersTicker';
import { L } from '@/i18n/Localized';

/**
 * Image-first retail hero: a campaign slideshow, then the three ways in
 * (retail, trade, offers), then the three reassurances a first-time buyer wants.
 */
export function ShopHero() {
  return (
    <section className="border-b border-line bg-surface-muted pt-40 sm:pt-44">
      <Container>
        {/* Scrolling announcement strip, then the campaign slideshow — one
            banner per available product, in desktop and mobile crops.
            Swipeable, and each slide holds for 10 seconds. */}
        <OffersTicker />
        <HeroSlideshow />

        {/* Three ways in, in priority order: retail, trade, then offers. They
            stack full-width on phones and sit in one centred row from sm up. */}
        <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full bg-primary-800 px-8 py-4 text-lg font-semibold text-white shadow-soft transition-colors hover:bg-primary-700"
          >
            <L text={{ en: 'Shop now', ar: 'تسوّق الآن' }} />
          </Link>
          <Link
            href="/wholesale"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line-strong bg-white px-8 py-4 text-lg font-semibold text-ink shadow-soft transition-colors hover:border-primary-300 hover:bg-primary-50"
          >
            <Building2 className="h-5 w-5 shrink-0 text-secondary-500" strokeWidth={2} />
            <L text={{ en: 'Wholesale', ar: 'طلبات الجملة' }} />
          </Link>
          <Link
            href="/offers"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-danger-600 px-8 py-4 text-lg font-semibold text-white shadow-soft transition-colors hover:bg-danger-700"
          >
            <Tag className="h-5 w-5 shrink-0" strokeWidth={2} />
            <L text={{ en: 'Offers & Bundles', ar: 'العروض والباقات' }} />
          </Link>
        </div>

        <ul className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-3 pb-12 sm:grid-cols-3 sm:pb-16">
          {[
            { icon: Wallet, text: { en: 'Cash on delivery', ar: 'الدفع عند الاستلام' } },
            { icon: Truck, text: { en: 'Delivered in 24–48 hours', ar: 'التوصيل خلال 24–48 ساعة' } },
            { icon: ShieldCheck, text: { en: 'Genuine, GMP-made products', ar: 'منتجات أصلية بمعايير GMP' } },
          ].map(({ icon: Icon, text }) => (
            <li
              key={text.en}
              className="flex items-center justify-center gap-2 rounded-2xl border border-line bg-white px-4 py-3 text-sm font-medium text-ink"
            >
              <Icon className="h-5 w-5 shrink-0 text-secondary-500" strokeWidth={2} />
              <L text={text} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
