import Link from 'next/link';
import { ShieldCheck, Truck, Wallet, Building2, Tag } from 'lucide-react';
import { Container } from '@/components/ui/Section';
import { ProductImage } from '@/components/ui/ProductImage';
import { L } from '@/i18n/Localized';

/**
 * Image-first retail hero. The desktop shelf and mobile campaign visual are
 * intentionally separate so each device gets a clear, well-composed image.
 */
export function ShopHero() {
  return (
    <section className="border-b border-line bg-surface-muted pt-40 sm:pt-44">
      <Container>
        {/* Existing wide product image is reserved for desktop. */}
        <ProductImage
          src="/media/hero-products.webp"
          alt=""
          priority
          className="mx-auto hidden w-full select-none sm:block"
        />
        {/* Client-supplied campaign visual is shown only on mobile. */}
        <ProductImage
          src="/media/hero-products-mobile.png"
          alt=""
          priority
          className="mx-auto w-full select-none sm:hidden"
        />

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
