import Link from 'next/link';
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'inverse' | 'inverse-outline';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none whitespace-nowrap';

const variants: Record<Variant, string> = {
  primary:
    'bg-primary-800 text-white shadow-soft hover:bg-primary-700 hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'bg-secondary-500 text-white shadow-soft hover:bg-secondary-600 hover:shadow-glow-orange hover:-translate-y-0.5 active:translate-y-0',
  outline:
    'border border-line-strong bg-white text-ink hover:border-primary-300 hover:bg-primary-50 hover:-translate-y-0.5',
  ghost: 'text-ink hover:bg-neutral-100',
  inverse:
    'bg-white text-primary-800 shadow-soft hover:bg-neutral-50 hover:-translate-y-0.5 hover:shadow-glow',
  'inverse-outline':
    'border border-white/25 text-white hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5',
};

const sizes: Record<Size, string> = {
  sm: 'h-10 px-5 text-sm',
  md: 'h-12 px-7 text-[0.95rem]',
  lg: 'h-14 px-8 text-base',
};

export type ButtonProps = {
  variant?: Variant;
  size?: Size;
  href?: string;
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', href, withArrow = false, className, children, ...props },
  ref,
) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const inner = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      {withArrow && (
        <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
      )}
    </>
  );

  if (href) {
    const isInternal = href.startsWith('/') || href.startsWith('#');
    if (isInternal) {
      return (
        <Link href={href} className={classes}>
          {inner}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return (
    <button ref={ref} className={classes} {...props}>
      {inner}
    </button>
  );
});
