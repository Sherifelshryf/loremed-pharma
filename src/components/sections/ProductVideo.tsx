import { PlayCircle } from 'lucide-react';
import { Container, Eyebrow } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/motion';
import { L } from '@/i18n/Localized';
import type { Bi } from '@/i18n/dictionaries';

/**
 * Embedded product video (YouTube). Rendered on the product detail page when a
 * product has a `youtubeId`. Uses the privacy-enhanced youtube-nocookie host and
 * a lazily-loaded iframe so it doesn't slow the initial page load. The 16:9 frame
 * is fully responsive down to mobile.
 */
export function ProductVideo({ youtubeId, name }: { youtubeId: string; name: Bi }) {
  return (
    <section className="section pt-0">
      <Container>
        <Reveal>
          <div className="mb-8 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>
                <PlayCircle className="h-4 w-4" />
                <L text={{ en: 'Watch', ar: 'شاهد' }} />
              </Eyebrow>
              <h2 className="mt-3 text-display-sm sm:text-display-md">
                <L text={{ en: `${name.en} in motion`, ar: `${name.ar} بالفيديو` }} />
              </h2>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="relative aspect-video overflow-hidden rounded-4xl border border-line bg-primary-950 shadow-glow">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
              title={`${name.en} — Loremed Pharma`}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
