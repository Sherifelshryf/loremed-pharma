import Link from 'next/link';
import { Tag } from 'lucide-react';
import { L } from '@/i18n/Localized';

/** Repeats per copy. Two identical copies make the loop seamless. */
const PER_COPY = 6;

/**
 * Red announcement strip above the hero slideshow: "Offers and bundles coming
 * soon", drifting rightwards forever.
 *
 * Full-bleed by design — it is rendered outside the hero's Container so the
 * band runs edge to edge with square corners, the way a broadcast ticker does.
 *
 * The track holds the phrase twice; the animation moves it from -50% to 0, so
 * the moment the first copy finishes crossing, the second is exactly where the
 * first began and the reset is invisible. Pure CSS — no JavaScript and no
 * hydration cost — and it stops outright under prefers-reduced-motion, where an
 * endlessly moving band is exactly what a visitor asked not to see.
 */
export function OffersTicker() {
  const phrase = (
    <span className="inline-flex items-center gap-2.5 px-6">
      <Tag className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden />
      <L text={{ en: 'Offers and bundles coming soon', ar: 'العروض والباقات قريبًا' }} />
    </span>
  );

  return (
    <Link
      href="/offers"
      className="group mb-4 block w-full overflow-hidden bg-danger-600 py-2.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-danger-700 sm:text-base"
    >
      {/* One accessible copy of the message; the moving band is decorative so a
          screen reader isn't read the same phrase twelve times. */}
      <span className="sr-only">
        <L text={{ en: 'Offers and bundles coming soon', ar: 'العروض والباقات قريبًا' }} />
      </span>
      <div
        aria-hidden
        // `animate-marquee-right` is what makes Tailwind emit the keyframes;
        // `.ticker-track` in globals.css is what actually wins against the
        // site-wide `animation: none !important`.
        className="ticker-track flex w-max animate-marquee-right whitespace-nowrap motion-reduce:justify-center"
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0">
            {Array.from({ length: PER_COPY }, (_, i) => (
              <span key={i} className="flex items-center">
                {phrase}
                <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </Link>
  );
}
