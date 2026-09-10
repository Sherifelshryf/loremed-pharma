'use client';

import { Tag, ArrowRight } from 'lucide-react';
import { ProductImage } from '@/components/ui/ProductImage';
import { getProduct } from '@/content/products';
import { bundleSaving, type Bundle } from '@/content/bundles';
import { site } from '@/content/site';
import { useI18n } from '@/i18n/LanguageProvider';

/** Beyond this many packshots the row is too small to read; the rest count up. */
const MAX_PACKSHOTS = 4;

/**
 * A featured bundle's slide in the home-page slideshow.
 *
 * Unlike the product banners either side of it, this slide is composed rather
 * than a piece of artwork: the deck's frame is 1:1 on phones and 16:9 on
 * desktop, and neither a square campaign illustration nor a portrait packshot
 * survives being cropped to both. So the picture sits in a panel at its own
 * aspect ratio and the name, price and saving are real text beside it — which
 * also means they are readable, translatable and selectable, rather than baked
 * into a JPEG that would need redrawing every time a price changed.
 *
 * The panel is white because packshots are photographed on white. Dropping them
 * straight onto the purple would leave each one sitting in its own pale box.
 */
export function BundleSlide({ bundle }: { bundle: Bundle }) {
  const { locale } = useI18n();
  const currency = site.currency[locale];
  const saving = bundleSaving(bundle);

  // The bundle's own photo if the editor uploaded one; otherwise the products
  // themselves, side by side. Anything without a packshot drops out rather than
  // leaving a hole in the row.
  const packshots = bundle.items
    .map((item) => getProduct(item.slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p?.image))
    .map((p) => ({ key: p.slug, src: p.image as string, alt: p.name[locale] }));

  const pictures = bundle.image
    ? [{ key: 'bundle', src: bundle.image, alt: bundle.name[locale] }]
    : packshots;
  const shown = pictures.slice(0, MAX_PACKSHOTS);
  const hidden = pictures.length - shown.length;

  return (
    // Both columns stretch to the full height of the frame on purpose. In row
    // direction `flex-1` sizes width, so centring the columns instead would
    // leave the picture side as tall as its contents — and its contents are
    // absolutely positioned, which is to say no height at all. The words are
    // centred within their own column rather than by the frame.
    <div className="flex aspect-square w-full flex-col bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 sm:aspect-video sm:flex-row">
      {/* Picture */}
      <div className="flex min-h-0 flex-[1.15] items-center justify-center p-3 sm:flex-1 sm:p-8">
        <div className="flex h-full w-full items-stretch justify-center gap-1 rounded-2xl bg-white p-2 sm:gap-4 sm:p-6">
          {shown.length > 0 ? (
            <>
              {shown.map((picture) => (
                // A sized, positioned slot per photo, with the image absolute
                // inside it. `max-h-full` on the image alone would not hold: it
                // is wrapped in a <picture>, which is inline and has no height
                // of its own for a percentage to resolve against, so a portrait
                // packshot would render at its natural size and spill out of
                // the frame — which is exactly what it did on phones.
                <div key={picture.key} className="relative min-w-0 flex-1">
                  <ProductImage
                    src={picture.src}
                    alt={picture.alt}
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                </div>
              ))}
              {hidden > 0 && (
                <span className="self-center rounded-full bg-primary-50 px-2.5 py-1 text-sm font-semibold text-primary-800">
                  +{hidden}
                </span>
              )}
            </>
          ) : (
            <Tag className="m-auto h-16 w-16 text-primary-200" strokeWidth={1.5} />
          )}
        </div>
      </div>

      {/* Words */}
      <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-5 text-white sm:px-2 sm:pb-0 sm:pe-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-secondary-300">
          <Tag className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
          {locale === 'ar' ? 'باقة' : 'Bundle'}
        </span>

        <p className="text-xl font-semibold leading-tight sm:text-3xl">{bundle.name[locale]}</p>
        {/* One line on a phone, where the square frame has no height to spare
            and every pixel taken here comes off the photo above. */}
        <p className="line-clamp-1 text-sm text-white/75 sm:line-clamp-2 sm:text-base">
          {bundle.tagline[locale]}
        </p>

        <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-2xl font-bold sm:text-4xl">
            {currency} {bundle.price}
          </span>
          {typeof bundle.compareAtPrice === 'number' && (
            <span className="text-sm text-white/55 line-through sm:text-base">
              {currency} {bundle.compareAtPrice}
            </span>
          )}
          {saving > 0 && (
            <span className="rounded-full bg-secondary-500 px-3 py-1 text-xs font-semibold text-white">
              {locale === 'ar' ? `وفّر ${saving} ${currency}` : `Save ${saving} ${currency}`}
            </span>
          )}
        </div>

        {/* Styled as a button but deliberately not one — the whole slide is
            already a link, and a real button inside it would be a second tab
            stop landing in exactly the same place. */}
        <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-primary-800">
          {locale === 'ar' ? 'شوف الباقة' : 'Shop the bundle'}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
        </span>
      </div>
    </div>
  );
}
