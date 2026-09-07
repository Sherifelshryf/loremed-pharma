'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageProvider';
import type { Bi } from '@/i18n/dictionaries';
import { cn } from '@/lib/utils';

/** How long a slide stays put before the show moves on. */
const SLIDE_MS = 10_000;

type Slide = {
  key: string;
  alt: Bi;
  /** Where the slide takes you when it is clicked. */
  href: string;
  /** Paths without extension; .webp is served first, .jpg is the fallback. */
  desktop: string;
  mobile: string;
  /** The product banners fill the frame; the wide hero shelf is letterboxed. */
  fit?: 'cover' | 'contain';
  /** Skip the WebP sources and serve the JPEG to every browser. */
  jpegOnly?: boolean;
};

/**
 * Product campaign banner: desktop art is 16:9, mobile 1:1, both in slides/.
 * The key doubles as the product slug, so the banner links to its own product.
 */
const banner = (slug: string, alt: Bi): Slide => ({
  key: slug,
  alt,
  href: `/products/${slug}`,
  desktop: `/media/slides/${slug}-desktop`,
  mobile: `/media/slides/${slug}-mobile`,
});

const SLIDES: Slide[] = [
  // The brand shelf opens the show, as it did before the slideshow existed.
  // Its desktop art is a 4.34:1 strip rather than 16:9, so it is contained
  // inside the frame.
  //
  // It is served as JPEG to everyone. The WebP of this particular shot has a
  // transparent background, which is what the slot wants in theory but not what
  // it looked like in place; the JPEG is the same artwork flattened onto the
  // surface colour, and that is the one to ship. The extra ~84 KB buys a hero
  // that renders the way it is meant to.
  {
    key: 'hero-products',
    alt: {
      en: 'Loremed Pharma — we care about the quality of life',
      ar: 'لورميد فارما — بنهتم بجودة الحياة',
    },
    // The shelf shows the whole range, so it opens the catalogue rather than
    // singling out one of the products on it.
    href: '/products',
    desktop: '/media/hero-products',
    mobile: '/media/slides/hero-products-mobile',
    fit: 'contain',
    jpegOnly: true,
  },
  banner('ivylor', { en: 'Ivylor cough syrup', ar: 'شراب إيفيلور للكحة' }),
  banner('ivylor-advance', { en: 'Ivylor Advance cough syrup', ar: 'شراب إيفيلور أدفانس للكحة' }),
  banner('coglern-syrup', { en: 'Coglern Syrup for focus and growth', ar: 'كوجليرن شراب للتركيز والنمو' }),
  banner('smartod', { en: 'Smartod for kids omega-3 drops', ar: 'نقط سمارتود للأطفال بأوميغا-3' }),
  banner('smartod-d', { en: 'Smartod D vitamin D3 drops', ar: 'نقط سمارتود د بفيتامين د3' }),
  banner('vitelormed', { en: 'Vitelormed multivitamin syrup', ar: 'شراب فيتيلورميد متعدد الفيتامينات' }),
  banner('gotolor', { en: 'Gotolor digestive enzyme syrup', ar: 'جوتولور شراب الإنزيم الهضمي' }),
  banner('welcaderm-lotion', { en: 'Welcaderm skin soothing lotion', ar: 'ويلكاديرم لوشن ملطّف للبشرة' }),
];

/**
 * Auto-advancing hero slideshow.
 *
 * The track is a real horizontally-scrollable list with scroll snapping, so a
 * visitor can swipe on a phone or drag on a trackpad and the browser does the
 * work; the arrows and dots just scroll the same element. Autoplay holds each
 * slide for SLIDE_MS and restarts its clock whenever the visitor scrolls, so a
 * slide someone just navigated to always gets its full time.
 */
export function HeroSlideshow() {
  const { locale } = useI18n();
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  /** Autoplay holds off until the opening image is on screen. */
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const goTo = useCallback((i: number, smooth = true) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[i] as HTMLElement | undefined;
    if (!slide) return;
    // offsetLeft rather than i * width: it stays correct in RTL, where the
    // first slide is on the right and scrollLeft runs negative in some engines.
    track.scrollTo({ left: slide.offsetLeft, behavior: smooth && !reduced ? 'smooth' : 'auto' });
  }, [reduced]);

  // Follow the scroll position so the dots and the autoplay clock agree with
  // whatever the visitor actually dragged to.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        let nearest = 0;
        let best = Infinity;
        for (let i = 0; i < track.children.length; i++) {
          const el = track.children[i] as HTMLElement;
          const d = Math.abs(el.offsetLeft - track.scrollLeft);
          if (d < best) { best = d; nearest = i; }
        }
        setIndex(nearest);
      });
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Autoplay. Keyed on `index`, so the timer resets every time the current
  // slide changes — by timer, by arrow or by the visitor's own swipe.
  //
  // It also waits for the opening image to actually paint. Counting from mount
  // would spend part of the first slide's ten seconds on an image the visitor
  // cannot see yet, which is worst on the slow connections that need the time
  // most.
  useEffect(() => {
    if (!started || paused || reduced || SLIDES.length < 2) return;
    const id = window.setTimeout(() => goTo((index + 1) % SLIDES.length), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [index, started, paused, reduced, goTo]);

  // Don't cycle through the deck while the tab is in the background.
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const step = (delta: number) => goTo((index + delta + SLIDES.length) % SLIDES.length);
  const label = (b: Bi) => b[locale];

  return (
    <div
      className="group relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      // Keyboard focus pauses, so a keyboard user isn't moved out from under
      // themselves. A mouse click also focuses the button it hit, though, and
      // latching on that would stop the show for good — :focus-visible is what
      // separates the two.
      onFocusCapture={(e) => {
        const el = e.target as HTMLElement;
        if (typeof el.matches === 'function' && el.matches(':focus-visible')) setPaused(true);
      }}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label={label({ en: 'Loremed product campaigns', ar: 'حملات منتجات لورميد' })}
    >
      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-3xl [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {SLIDES.map((s, i) => (
          <li
            key={s.key}
            className="w-full shrink-0 snap-start"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${SLIDES.length}`}
          >
            {/* The banner is the link: clicking Ivylor's slide opens Ivylor.
                Only the slide in view is reachable by keyboard, so Tab moves on
                to the buttons below instead of walking every slide in the deck;
                the arrows and dots change which one that is. */}
            <Link
              href={s.href}
              tabIndex={i === index ? undefined : -1}
              className="block"
            >
              {/* One download per viewport: the browser picks the desktop or the
                  mobile art from the media queries, and older browsers that can't
                  decode WebP fall through to the JPEG. */}
              <picture>
                {!s.jpegOnly && (
                  <source media="(min-width: 640px)" srcSet={`${s.desktop}.webp`} type="image/webp" />
                )}
                <source media="(min-width: 640px)" srcSet={`${s.desktop}.jpg`} />
                {!s.jpegOnly && <source srcSet={`${s.mobile}.webp`} type="image/webp" />}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${s.mobile}.jpg`}
                  alt={label(s.alt)}
                  // Without this a mouse-drag starts a native image drag instead
                  // of doing nothing, which feels broken on a swipeable strip.
                  draggable={false}
                  className={cn(
                    'aspect-square w-full select-none sm:aspect-video',
                    s.fit === 'contain' ? 'object-contain' : 'object-cover',
                  )}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  {...(i === 0
                    ? {
                        ref: (el: HTMLImageElement | null) => {
                          if (el?.complete) setStarted(true);
                        },
                        onLoad: () => setStarted(true),
                        // A broken or blocked image must not freeze the show.
                        onError: () => setStarted(true),
                      }
                    : {})}
                />
              </picture>
            </Link>
          </li>
        ))}
      </ul>

      {/* Arrows sit inside the frame on desktop, revealed on hover so they
          never cover artwork at rest — the hero's slogan sits right where the
          left arrow would be. On phones the swipe is the gesture and the dots
          below are enough. */}
      <button
        type="button"
        onClick={() => step(-1)}
        aria-label={label({ en: 'Previous slide', ar: 'الصورة السابقة' })}
        className="absolute start-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-primary-800 opacity-0 shadow-soft backdrop-blur transition-all hover:bg-white focus-visible:opacity-100 group-hover:opacity-100 sm:grid"
      >
        <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
      </button>
      <button
        type="button"
        onClick={() => step(1)}
        aria-label={label({ en: 'Next slide', ar: 'الصورة التالية' })}
        className="absolute end-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-primary-800 opacity-0 shadow-soft backdrop-blur transition-all hover:bg-white focus-visible:opacity-100 group-hover:opacity-100 sm:grid"
      >
        <ChevronRight className="h-5 w-5 rtl:rotate-180" />
      </button>

      <div className="mt-4 flex justify-center gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.key}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`${label({ en: 'Go to slide', ar: 'روح للصورة' })} ${i + 1}`}
            aria-current={i === index}
            className={cn(
              'h-2.5 rounded-full transition-all',
              i === index ? 'w-7 bg-primary-800' : 'w-2.5 bg-line-strong hover:bg-primary-300',
            )}
          />
        ))}
      </div>
    </div>
  );
}
