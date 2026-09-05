'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, ChevronDown, ShoppingCart, Building2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { primaryNav } from '@/content/site';
import { NAV_T } from '@/content/navKeys';
import { useI18n } from '@/i18n/LanguageProvider';
import { useCart } from '@/cart/CartProvider';
import { Logo } from '@/components/logo/Logo';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';
import { cn } from '@/lib/utils';
import { L } from '@/i18n/Localized';
import { normalizeSearch, products, productSearchText } from '@/content/products';

export function Navbar() {
  const { t, locale } = useI18n();
  const { count } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mega menu on route change
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.split('?')[0]);
  const suggestions = searchQuery.trim()
    ? products.filter((product) => normalizeSearch(productSearchText(product)).includes(normalizeSearch(searchQuery))).slice(0, 6)
    : [];

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[120] border-b border-line bg-white shadow-soft',
        )}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <nav
          className={cn(
            'mx-auto flex h-20 max-w-[1320px] items-center justify-between gap-4 px-5 sm:px-6 lg:px-8',
          )}
          aria-label="Primary"
        >
          {/* Logo */}
          <Link href="/" className="relative z-10 shrink-0" aria-label="Loremed Pharma — home">
            <Logo />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {primaryNav.map((item) => {
              const hasMenu = !!item.children?.length;
              const active = isActive(item.href);
              return (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(hasMenu ? item.label : null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      // px tightens at lg so the nav list, the language switcher
                      // and both CTAs still fit on a 1024px viewport.
                      'inline-flex items-center gap-1 rounded-full px-3 py-2 text-[0.92rem] font-medium transition-colors xl:px-4',
                      active ? 'text-primary-800' : 'text-ink-soft hover:text-primary-800',
                    )}
                    aria-expanded={hasMenu ? openMenu === item.label : undefined}
                  >
                    {t(NAV_T[item.label] ?? 'nav.home')}
                    {hasMenu && (
                      <ChevronDown
                        className={cn(
                          'h-3.5 w-3.5 transition-transform duration-300',
                          openMenu === item.label && 'rotate-180',
                        )}
                      />
                    )}
                  </Link>
                  {active && (
                    <span
                      className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-secondary-500"
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <Link
              href="/order"
              className="relative grid h-10 w-10 place-items-center rounded-full text-ink-soft transition-colors hover:bg-neutral-100 hover:text-primary-800"
              aria-label={t('nav.cart')}
            >
              <ShoppingCart className="h-[1.1rem] w-[1.1rem]" />
              {count > 0 && (
                <span className="absolute -top-0.5 end-0 grid h-4 min-w-4 place-items-center rounded-full bg-secondary-500 px-1 text-[0.65rem] font-bold text-white">
                  {count}
                </span>
              )}
            </Link>
            <div className="block">
              <LanguageSwitcher />
            </div>
            {/* Trade line, sitting beside the retail CTA: pharmacies and
                distributors don't use the cart, so they get their own door in. */}
            <div className="hidden sm:block">
              <Button
                href="/wholesale"
                size="sm"
                variant="outline"
                title={t('wholesale.navHint')}
                aria-label={t('cta.wholesale')}
                // At lg the full nav list is showing but xl's breathing room
                // isn't there yet, so the label collapses to the icon rather
                // than pushing "Shop Now" off the edge.
                className="px-5 lg:px-3 xl:px-5"
              >
                <Building2 className="h-4 w-4 text-secondary-500" />
                <span className="hidden sm:inline lg:hidden xl:inline">{t('cta.wholesale')}</span>
              </Button>
            </div>
            <div className="hidden sm:block">
              <Button href="/products" size="sm" variant="primary" className="ms-1">
                {t('cta.navExplore')}
              </Button>
            </div>
            <button
              onClick={() => setMobileOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-neutral-100 lg:hidden"
              aria-label={t('nav.menu')}
            >
              <span className="relative flex h-4 w-5 flex-col justify-between">
                <span className="h-0.5 w-full rounded-full bg-current" />
                <span className="h-0.5 w-full rounded-full bg-current" />
                <span className="h-0.5 w-3.5 rounded-full bg-current" />
              </span>
            </button>
          </div>
        </nav>

        <form
          className="border-t border-line bg-surface-muted"
          onSubmit={(event) => {
            event.preventDefault();
            const query = searchQuery.trim();
            router.push(query ? `/products?q=${encodeURIComponent(query)}` : '/products');
          }}
          role="search"
        >
          <div className="mx-auto max-w-[1320px] px-5 py-3 sm:px-6 lg:px-8">
            <label className="relative block">
              <span className="sr-only"><L text={{ en: 'Search products', ar: 'ابحث عن المنتجات' }} /></span>
              <Search className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted" aria-hidden />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={t('nav.openSearch')}
                className="h-11 w-full rounded-xl border border-line bg-white ps-12 pe-4 text-sm text-ink outline-none focus:border-primary-500"
              />
            </label>
            {suggestions.length > 0 && (
              <ul className="mt-2 overflow-hidden rounded-xl border border-line bg-white shadow-soft">
                {suggestions.map((product) => (
                  <li key={product.slug} className="border-b border-line last:border-b-0">
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={() => setSearchQuery('')}
                      className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
                    >
                      <span className="font-semibold text-ink">{product.name[locale]}</span>
                      <span className="text-ink-muted">{product.form[locale]}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </form>

        {/* Mega menu */}
          {openMenu && (
            <MegaMenu
              key={openMenu}
              label={openMenu}
              onNavigate={() => setOpenMenu(null)}
            />
          )}
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

function MegaMenu({ label, onNavigate }: { label: string; onNavigate: () => void }) {
  const { locale, t } = useI18n();
  const item = primaryNav.find((n) => n.label === label);
  if (!item?.children?.length) return null;

  const featured = item.children[0];
  const rest = item.children.slice(1);

  return (
    <div
      className="absolute inset-x-0 top-full hidden lg:block"
    >
      <div className="mx-auto max-w-[1320px] px-6 pb-4 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-line bg-white p-3 shadow-glow">
          <div className="grid grid-cols-3 gap-3">
            <Link
              href={featured.href}
              onClick={onNavigate}
              className="group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-2xl bg-brand-gradient p-6 text-white"
            >
              <div
                aria-hidden
                className="absolute -right-8 -top-10 h-40 w-40 rounded-full bg-white/10"
              />
              <span className="text-eyebrow uppercase text-white/70">{t(NAV_T[item.label] ?? 'nav.home')}</span>
              <span className="mt-8">
                <span className="block text-xl font-semibold">{featured.label[locale]}</span>
                <span className="mt-1 block text-sm text-white/70">{featured.description?.[locale]}</span>
              </span>
            </Link>
            <ul className="col-span-2 grid grid-cols-2 gap-1">
              {rest.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    onClick={onNavigate}
                    className="group flex h-full flex-col gap-1 rounded-2xl p-4 transition-colors hover:bg-primary-50"
                  >
                    <span className="font-medium text-ink transition-colors group-hover:text-primary-800">
                      {child.label[locale]}
                    </span>
                    {child.description && (
                      <span className="text-sm leading-snug text-ink-muted">{child.description[locale]}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
