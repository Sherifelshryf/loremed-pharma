import { cn } from '@/lib/utils';

/** A soft, blurred gradient orb. Purely decorative. */
export function GradientOrb({
  className,
  color = 'purple',
  size = 480,
}: {
  className?: string;
  color?: 'purple' | 'orange' | 'mix';
  size?: number;
}) {
  const bg =
    color === 'purple'
      ? 'radial-gradient(circle at 30% 30%, rgba(84,62,132,0.55), rgba(50,35,83,0) 70%)'
      : color === 'orange'
        ? 'radial-gradient(circle at 30% 30%, rgba(236,105,29,0.42), rgba(236,105,29,0) 70%)'
        : 'radial-gradient(circle at 30% 30%, rgba(109,81,162,0.4), rgba(236,105,29,0.22) 60%, rgba(255,255,255,0) 78%)';
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute rounded-full blur-3xl', className)}
      style={{ width: size, height: size, background: bg }}
    />
  );
}

/** Fine grid overlay with a radial fade so it never distracts. */
export function GridField({ className, fade = true }: { className?: string; fade?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 bg-grid', className)}
      style={
        fade
          ? {
              maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%)',
            }
          : undefined
      }
    />
  );
}

/** Dotted overlay with a radial fade. */
export function DotField({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 bg-dots', className)}
      style={{
        maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent 72%)',
        WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent 72%)',
      }}
    />
  );
}

/** A single logo-derived quarter-arc ring. */
export function QuarterArc({
  className,
  stroke = 'rgba(50,35,83,0.14)',
  width = 2,
}: {
  className?: string;
  stroke?: string;
  width?: number;
}) {
  return (
    <svg viewBox="0 0 200 200" className={cn('absolute', className)} aria-hidden fill="none">
      <path d="M10 190 A180 180 0 0 1 190 10" stroke={stroke} strokeWidth={width} strokeLinecap="round" />
    </svg>
  );
}

/**
 * Minimal molecular node network — an abstract nod to pharmaceutical
 * science, drawn from the brand palette rather than cliché stock DNA.
 */
export function Molecule({ className, tone = 'purple' }: { className?: string; tone?: 'purple' | 'orange' }) {
  const c = tone === 'purple' ? '#543E84' : '#EC691D';
  return (
    <svg viewBox="0 0 220 200" className={cn('absolute', className)} aria-hidden fill="none">
      <g stroke={c} strokeOpacity="0.35" strokeWidth="1.5">
        <line x1="40" y1="60" x2="110" y2="30" />
        <line x1="110" y1="30" x2="180" y2="70" />
        <line x1="180" y1="70" x2="150" y2="150" />
        <line x1="150" y1="150" x2="70" y2="160" />
        <line x1="70" y1="160" x2="40" y2="60" />
        <line x1="110" y1="30" x2="110" y2="110" />
        <line x1="110" y1="110" x2="150" y2="150" />
        <line x1="110" y1="110" x2="70" y2="160" />
      </g>
      {[
        [40, 60],
        [110, 30],
        [180, 70],
        [150, 150],
        [70, 160],
        [110, 110],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 2 ? 5 : 7} fill={c} fillOpacity={i % 2 ? 0.5 : 0.75} />
      ))}
    </svg>
  );
}

/**
 * A translucent, layered composition of quarter-discs echoing the logo
 * mark — the signature abstract centrepiece for hero areas.
 */
export function LogoBloom({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 520" className={cn(className)} aria-hidden fill="none">
      <defs>
        <linearGradient id="bloomPurple" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#543E84" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#322353" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="bloomOrange" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F18841" />
          <stop offset="100%" stopColor="#EC691D" />
        </linearGradient>
        <linearGradient id="bloomGhost" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6D51A2" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#EC691D" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {/* Ghost echoes */}
      <path d="M260 470 L260 150 A210 210 0 0 1 470 360 Z" fill="url(#bloomGhost)" />
      <path
        d="M70 470 A190 190 0 0 1 260 280"
        stroke="#543E84"
        strokeOpacity="0.14"
        strokeWidth="2"
        fill="none"
      />

      {/* Core bowl — orange top quarter */}
      <path d="M250 250 L250 70 A180 180 0 0 1 430 250 Z" fill="url(#bloomOrange)" />
      {/* Core bowl — purple bottom quarter */}
      <path d="M250 268 L430 268 A180 180 0 0 1 250 448 Z" fill="url(#bloomPurple)" />
      {/* Purple stem */}
      <rect x="70" y="70" width="120" height="378" rx="28" fill="url(#bloomPurple)" />
      <rect x="70" y="330" width="180" height="118" rx="28" fill="url(#bloomPurple)" />
    </svg>
  );
}

/** Full ambient field for light sections: orbs + grid, positioned behind content. */
export function AmbientField({ className, variant = 'default' }: { className?: string; variant?: 'default' | 'soft' }) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <GridField className="opacity-60" />
      {variant === 'default' && (
        <>
          <GradientOrb color="purple" size={520} className="-left-40 top-[-10%] opacity-70" />
          <GradientOrb color="orange" size={420} className="-right-32 bottom-[-15%] opacity-60" />
        </>
      )}
    </div>
  );
}
