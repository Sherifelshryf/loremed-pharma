'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageProvider';
import type { Bi } from '@/i18n/dictionaries';
import { cn } from '@/lib/utils';

/** How long a slide stays put before the show moves on. */
const SLIDE_MS = 10_000;

type Slide = { slug: string; alt: Bi };

/** Campaign banners, one per available product. Desktop art is 16:9, mobile 1:1. */
const SLIDES: Slide[] = [
  { slug: 'ivylor', alt: { en: 'Ivylor cough syrup', ar: 'شراب إيفيلور للسعال' } },
  { slug: 'ivylor-advance', alt: { en: 'Ivylor Advance cough syrup', ar: 'شراب إيفيلور أدفانس للسعال' } },
  { slug: 'coglern-syrup', alt: { en: 'Coglern Syrup for focus and growth', ar: 'كوجليرن شراب للتركيز والنمو' } },
  { slug: 'smartod', alt: { en: 'Smartod for kids omega-3 drops', ar: 'نقط سمارتود للأطفال بأوميغا-3' } },
  { slug: 'smartod-d', alt: { en: 'Smartod D vitamin D3 drops', ar: 'نقط سمارتود د بفيتامين د3' } },
  { slug: 'vitelormed', alt: { en: 'Vitelormed multivitamin syrup', ar: 'شراب فيتيلورميد متعدد الفيتامينات' } },
  { slug: 'gotolor', alt: { en: 'Gotolor digestive enzyme syrup', ar: 'جوتولور شراب الإنزيم الهضمي' } },
  { slug: 'welcaderm-lotion', alt: { en: 'Welcaderm skin soothing lotion', ar: 'ويلكاديرم لوشن ملطّف للبشرة' } },
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
  useEffect(() => {
    if (paused || reduced || SLIDES.length < 2) return;
    const id = window.setTimeout(() => goTo((index + 1) % SLIDES.length), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, reduced, goTo]);

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
            key={s.slug}
            className="w-full shrink-0 snap-start"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${SLIDES.length}`}
          >
            {/* One download per viewport: the browser picks the desktop or the
                mobile art from the media queries, and older browsers that can't
                decode WebP fall through to the JPEG. */}
            <picture>
              <source media="(min-width: 640px)" srcSet={`/media/slides/${s.slug}-desktop.webp`} type="image/webp" />
              <source media="(min-width: 640px)" srcSet={`/media/slides/${s.slug}-desktop.jpg`} />
              <source srcSet={`/media/slides/${s.slug}-mobile.webp`} type="image/webp" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/media/slides/${s.slug}-mobile.jpg`}
                alt={label(s.alt)}
                className="aspect-square w-full select-none object-cover sm:aspect-video"
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </picture>
          </li>
        ))}
      </ul>

      {/* Arrows sit inside the frame on desktop; on phones the swipe is the
          primary gesture and the dots below are enough. */}
      <button
        type="button"
        onClick={() => step(-1)}
        aria-label={label({ en: 'Previous slide', ar: 'الشريحة السابقة' })}
        className="absolute start-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-primary-800 shadow-soft backdrop-blur transition-colors hover:bg-white sm:grid"
      >
        <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
      </button>
      <button
        type="button"
        onClick={() => step(1)}
        aria-label={label({ en: 'Next slide', ar: 'الشريحة التالية' })}
        className="absolute end-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-primary-800 shadow-soft backdrop-blur transition-colors hover:bg-white sm:grid"
      >
        <ChevronRight className="h-5 w-5 rtl:rotate-180" />
      </button>

      <div className="mt-4 flex justify-center gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.slug}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`${label({ en: 'Go to slide', ar: 'اذهب إلى الشريحة' })} ${i + 1}`}
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
