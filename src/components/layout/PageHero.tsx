import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { Container, Eyebrow } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/motion';
import { GridField, GradientOrb } from '@/components/graphics/BrandBackdrop';
import { L } from '@/i18n/Localized';
import { cn } from '@/lib/utils';

export type Crumb = { label: React.ReactNode; href: string };

export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  align = 'left',
  children,
}: {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  crumbs: Crumb[];
  align?: 'left' | 'center';
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/70 via-white to-white" />
        <GridField className="opacity-50" />
        <GradientOrb color="purple" size={520} className="-left-40 -top-20 opacity-60" />
        <GradientOrb color="orange" size={420} className="-right-28 top-10 opacity-50" />
      </div>

      <Container>
        <div className="pb-14 lg:pb-16">
          {/* Breadcrumb */}
          <Reveal>
            <nav aria-label="Breadcrumb" className={cn('mb-8', align === 'center' && 'flex justify-center')}>
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
                <li>
                  <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-primary-700">
                    <Home className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">
                      <L text={{ en: 'Home', ar: 'الرئيسية' }} />
                    </span>
                  </Link>
                </li>
                {crumbs.map((c, i) => (
                  <li key={c.href} className="flex items-center gap-1.5">
                    <ChevronRight className="h-3.5 w-3.5 text-line-strong rtl:rotate-180" />
                    {i === crumbs.length - 1 ? (
                      <span className="font-medium text-primary-800">{c.label}</span>
                    ) : (
                      <Link href={c.href} className="transition-colors hover:text-primary-700">
                        {c.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>

          <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
            <Reveal delay={0.05}>
              <Eyebrow className={cn(align === 'center' && 'justify-center')}>{eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 text-display-lg text-ink sm:text-display-xl">{title}</h1>
            </Reveal>
            {lead && (
              <Reveal delay={0.15}>
                <p className={cn('mt-6 text-lg leading-relaxed text-ink-soft sm:text-xl', align === 'center' && 'mx-auto max-w-2xl')}>
                  {lead}
                </p>
              </Reveal>
            )}
            {children && (
              <Reveal delay={0.2}>
                <div className={cn('mt-8', align === 'center' && 'flex justify-center')}>{children}</div>
              </Reveal>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
