import { cn } from '@/lib/utils';
import { Reveal } from './motion';

/** Max-width content container. */
export function Container({
  children,
  className,
  size = 'default',
}: {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide';
}) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-5 sm:px-6 lg:px-8',
        size === 'narrow' && 'max-w-3xl',
        size === 'default' && 'max-w-[1320px]',
        size === 'wide' && 'max-w-[1560px]',
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Small uppercase kicker with a leading tick mark. */
export function Eyebrow({
  children,
  className,
  variant = 'orange',
}: {
  children: React.ReactNode;
  className?: string;
  variant?: 'orange' | 'purple' | 'inverse';
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 text-eyebrow uppercase',
        variant === 'orange' && 'text-secondary-600',
        variant === 'purple' && 'text-primary-600',
        variant === 'inverse' && 'text-secondary-300',
        className,
      )}
    >
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          variant === 'orange' && 'bg-secondary-500',
          variant === 'purple' && 'bg-primary-500',
          variant === 'inverse' && 'bg-secondary-400',
        )}
      />
      {children}
    </span>
  );
}

/** Standard section heading block: eyebrow + title + optional lead. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  variant = 'orange',
  inverse = false,
  className,
  titleClassName,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: 'left' | 'center';
  variant?: 'orange' | 'purple' | 'inverse';
  inverse?: boolean;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        align === 'left' && 'items-start text-start',
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow variant={inverse ? 'inverse' : variant}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            'text-display-md sm:text-display-lg max-w-2xl',
            align === 'center' && 'mx-auto',
            inverse ? 'text-white' : 'text-ink',
            titleClassName,
          )}
        >
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              'max-w-2xl text-lg leading-relaxed',
              align === 'center' && 'mx-auto',
              inverse ? 'text-white/70' : 'text-ink-soft',
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/** Semantic pill badge. */
export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: React.ReactNode;
  tone?: 'neutral' | 'purple' | 'orange' | 'success' | 'muted';
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide',
        tone === 'neutral' && 'bg-neutral-100 text-ink-soft',
        tone === 'purple' && 'bg-primary-50 text-primary-700',
        tone === 'orange' && 'bg-secondary-50 text-secondary-700',
        tone === 'success' && 'bg-success-50 text-success-700',
        tone === 'muted' && 'bg-white/10 text-white/80 backdrop-blur',
        className,
      )}
    >
      {children}
    </span>
  );
}
