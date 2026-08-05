import { cn } from '@/lib/utils';

/*
 * Plain <img> rather than next/image: the static export disables the image
 * optimiser, so next/image would only add client-side JavaScript for no gain.
 *
 * The logo stays a PNG while the packshots are WebP — it needs an alpha channel
 * for the dark footer and the watermarks, and PNG decodes on every browser,
 * including the older ones this site is built for.
 */

export function Logo({
  className,
}: {
  className?: string;
  variant?: 'default' | 'inverse';
  showWord?: boolean;
  orientation?: 'horizontal' | 'stacked';
  markClassName?: string;
  wordClassName?: string;
}) {
  return (
    <span className={cn('inline-flex select-none items-center', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/media/logo.png"
        alt="Loremed Pharma"
        width={160}
        height={80}
        className="h-10 w-auto"
      />
    </span>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/media/logo.png"
      alt="Loremed Pharma"
      width={160}
      height={80}
      className={cn('h-auto w-auto', className)}
    />
  );
}

export function Wordmark({ className }: { className?: string }) {
  return null;
}
