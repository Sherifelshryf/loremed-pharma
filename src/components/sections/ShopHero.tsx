import Link from 'next/link';
import { ShieldCheck, Truck, Wallet } from 'lucide-react';
import { Container } from '@/components/ui/Section';
import { ProductImage } from '@/components/ui/ProductImage';
import { L } from '@/i18n/Localized';

/**
 * Retail hero. Short on purpose: the job is to say what is sold and get the
 * shopper into the catalogue, so the fold is a headline, one button and the
 * three reassurances people actually ask about before buying.
 */
export function ShopHero() {
  return (
    <section className="border-b border-line bg-surface-muted pt-28 sm:pt-32">
      <Container>
        <div className="pb-12 text-center sm:pb-16">
          <h1 className="mx-auto max-w-3xl text-display-lg sm:text-display-xl">
            <L
              text={{
                en: 'Vitamins, cough syrups and children’s health',
                ar: 'فيتامينات وأدوية سعال ومنتجات لصحة الأطفال',
              }}
            />
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">
            <L
              text={{
                en: 'Order in a minute. Pay cash when it arrives.',
                ar: 'اطلب في دقيقة. وادفع نقدًا عند الاستلام.',
              }}
            />
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/products"
              className="inline-flex w-full items-center justify-center rounded-full bg-primary-800 px-8 py-4 text-lg font-semibold text-white shadow-soft hover:bg-primary-700 sm:w-auto"
            >
              <L text={{ en: 'Shop all products', ar: 'تسوّق كل المنتجات' }} />
            </Link>
          </div>

          {/* The three things a first-time buyer wants to know */}
          <ul className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                icon: Wallet,
                text: { en: 'Cash on delivery', ar: 'الدفع عند الاستلام' },
              },
              {
                icon: Truck,
                text: { en: 'Delivered in 24–48 hours', ar: 'التوصيل خلال 24–48 ساعة' },
              },
              {
                icon: ShieldCheck,
                text: { en: 'Genuine, GMP-made products', ar: 'منتجات أصلية بمعايير GMP' },
              },
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
        </div>

        {/* Decorative shelf of the available packshots — purely visual, so it
            carries no alt text; the real product names/prices live in the
            cards below. */}
        <ProductImage
          src="/media/hero-products.webp"
          alt=""
          priority
          className="mx-auto w-full max-w-5xl select-none"
        />
      </Container>
    </section>
  );
}
