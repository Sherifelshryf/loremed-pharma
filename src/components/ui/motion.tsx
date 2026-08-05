/**
 * Layout primitives that used to animate.
 *
 * The site is built for shoppers on older, slower phones, so every animation
 * was removed along with the framer-motion runtime. These components keep their
 * original names and props so call sites did not have to change, but they now
 * render plain elements and paint immediately.
 *
 * No 'use client' directive: with the motion gone these are pure markup and can
 * render on the server, which keeps them out of the client bundle entirely.
 */
import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Was a scroll-triggered fade-and-rise. Now renders its children directly. */
export function Reveal({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  /** Retained so existing call sites keep working; no longer has any effect. */
  delay?: number;
  y?: number;
  once?: boolean;
  as?: 'div' | 'section' | 'span' | 'li' | 'article';
}) {
  const Tag = as;
  return <Tag className={className}>{children}</Tag>;
}

/** Was a staggered container. Now a plain wrapper. */
export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
}) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

/** Was a cursor-following hover effect. Now a static inline wrapper. */
export function Magnetic({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  return <span className={cn('inline-flex', className)}>{children}</span>;
}

/** Was a count-up on scroll. Now prints the final figure straight away. */
export function Counter({
  value,
  prefix = '',
  suffix = '',
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  return (
    <span className={cn('tabular', className)}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

/** Was a scroll-linked parallax drift. Now a static wrapper. */
export function Parallax({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  return <div className={className}>{children}</div>;
}
