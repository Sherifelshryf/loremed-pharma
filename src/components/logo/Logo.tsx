import Image from 'next/image';
import { cn } from '@/lib/utils';

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
      <Image
        src="/media/logo.png"
        alt="Loremed Pharma"
        width={160}
        height={80}
        className="h-10 w-auto"
        priority
        unoptimized
      />
    </span>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/media/logo.png"
      alt="Loremed Pharma"
      width={160}
      height={80}
      className={cn('h-auto w-auto', className)}
      priority
      unoptimized
    />
  );
}

export function Wordmark({ className }: { className?: string }) {
  return null;
}
