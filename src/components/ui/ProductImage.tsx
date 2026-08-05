/**
 * Product photo with a JPEG fallback.
 *
 * The packshots ship as WebP, which browsers older than roughly iOS 14 and
 * Android 5 cannot decode — they would show nothing at all. A <picture> element
 * hands those browsers the JPEG instead, and every browser understands the
 * markup even if it ignores the <source>.
 *
 * This is a plain <img> rather than next/image on purpose: the static export
 * disables the optimiser anyway, so next/image only added client-side JavaScript
 * for no benefit.
 */
export function ProductImage({
  src,
  alt,
  className,
  priority = false,
}: {
  /** Path to the .webp; the .jpg beside it is used as the fallback. */
  src: string;
  alt: string;
  className?: string;
  /** Skip lazy-loading for images visible without scrolling. */
  priority?: boolean;
}) {
  const jpg = src.replace(/\.webp$/i, '.jpg');
  return (
    <picture>
      <source srcSet={src} type="image/webp" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={jpg}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </picture>
  );
}
