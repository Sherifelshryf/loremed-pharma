'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, MapPin, Send, Check, AlertCircle, ShoppingCart, PhoneCall, MessageCircle } from 'lucide-react';
import { useCart } from '@/cart/CartProvider';
import { useI18n } from '@/i18n/LanguageProvider';
import { dictionaries } from '@/i18n/dictionaries';
import { site } from '@/content/site';
import { Container } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const copy = {
  paymentValue: { en: 'Cash on Delivery', ar: 'الدفع عند الاستلام' },
};

// The WhatsApp order message is ALWAYS composed in Arabic, regardless of the
// language the customer used on the site, so the team receives every order in
// one consistent format. Product names stay as-is (they're English by design).
const AR = dictionaries.ar;
const AR_CURRENCY = site.currency.ar;

function buildWhatsAppMessage({
  orderNumber,
  name,
  phone,
  address,
  notes,
  locationLink,
  lines,
  subtotal,
  deliveryFee,
  total,
}: {
  orderNumber: string;
  name: string;
  phone: string;
  address: string;
  notes: string;
  locationLink: string | null;
  lines: { product: { name: string; price: number }; quantity: number; lineTotal: number }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}) {
  const lb = '\n';
  let msg = `*${AR['order.newOrder']} #${orderNumber}*${lb}${lb}`;
  msg += `*${AR['order.messageCustomer']}*${lb}`;
  msg += `  ${AR['order.name']}: ${name}${lb}`;
  msg += `  ${AR['order.phone']}: ${phone}${lb}`;
  msg += `  ${AR['order.address']}: ${address}${lb}`;
  if (notes.trim()) {
    msg += `  ${AR['order.notes']}: ${notes.trim()}${lb}`;
  }
  if (locationLink) {
    msg += `  ${AR['order.location']}: ${locationLink}${lb}`;
  }
  msg += lb;
  msg += `*${AR['order.itemsHeading']}*${lb}`;
  for (const line of lines) {
    msg += `  • ${line.product.name} x${line.quantity} = ${AR_CURRENCY} ${line.lineTotal}${lb}`;
  }
  msg += lb;
  msg += `*${AR['order.messageTotals']}*${lb}`;
  msg += `  ${AR['order.subtotal']}: ${AR_CURRENCY} ${subtotal}${lb}`;
  msg += `  ${AR['order.delivery']}: ${AR_CURRENCY} ${deliveryFee}${lb}`;
  msg += `  *${AR['order.total']}: ${AR_CURRENCY} ${total}*${lb}${lb}`;
  msg += `${AR['order.messagePayment']}: ${copy.paymentValue.ar}${lb}`;
  msg += `${AR['order.messageEta']}: ${AR['order.etaValue']}`;

  // Guard rail: astral-plane characters (emoji, U+10000 and above) arrive
  // corrupted as U+FFFD in the delivered WhatsApp message, so the message is
  // kept to the Basic Multilingual Plane. Bold markers and the • bullet are
  // BMP and come through intact. Strip anything astral that reaches this point
  // via product names or customer input rather than shipping mojibake.
  return msg.replace(/[\u{10000}-\u{10FFFF}]/gu, '');
}

export function OrderClient() {
  const { locale, t } = useI18n();
  const { lines, count, subtotal, setQuantity, removeItem, clear } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [locationLink, setLocationLink] = useState<string | null>(null);
  const [locationState, setLocationState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [errors, setErrors] = useState<{ name?: string; phone?: string; address?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [waUrl, setWaUrl] = useState<string | null>(null);

  const currency = site.currency[locale];
  const deliveryFee = site.deliveryFee;
  const total = subtotal + (subtotal > 0 ? deliveryFee : 0);

  function handleUseLocation() {
    if (!navigator.geolocation) {
      setLocationState('error');
      return;
    }
    setLocationState('loading');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationLink(`https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`);
        setLocationState('done');
      },
      () => setLocationState('error'),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: typeof errors = {};
    if (!name.trim()) nextErrors.name = t('order.errorName');
    if (!phone.trim()) nextErrors.phone = t('order.errorPhone');
    if (!address.trim()) nextErrors.address = t('order.errorAddress');
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const orderNumber = String(Math.floor(10000000 + Math.random() * 90000000));
    const message = buildWhatsAppMessage({
      orderNumber,
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      notes,
      locationLink,
      lines,
      subtotal,
      deliveryFee,
      total,
    });

    const url = `https://wa.me/${site.orderWhatsAppNumber}?text=${encodeURIComponent(message)}`;

    // Show the confirmation (and the follow-up note) *before* handing off to
    // WhatsApp. Opening WhatsApp switches tabs or apps, so if the state flipped
    // afterwards the customer would only ever see this screen on their way back.
    setWaUrl(url);
    setSubmitted(true);
    clear();

    // Must stay inside the click handler — a deferred window.open gets caught by
    // popup blockers. If it is blocked anyway, the confirmation screen keeps the
    // link so the order is never lost.
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  const fieldClass = (hasError?: boolean) =>
    cn(
      'w-full rounded-2xl border bg-white px-4 py-3.5 text-ink outline-none transition-all placeholder:text-ink-muted',
      hasError
        ? 'border-danger-500 focus:border-danger-600 focus:ring-2 focus:ring-danger-500/20'
        : 'border-line focus:border-primary-400 focus:ring-2 focus:ring-primary-500/15',
    );

  if (submitted) {
    return (
      <Container size="narrow" className="py-16">
        <div className="flex flex-col items-center rounded-3xl border border-success-100 bg-success-50/60 px-8 py-16 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-success-500 text-white">
            <Check className="h-8 w-8" strokeWidth={3} />
          </span>
          <h2 className="mt-6 text-2xl font-semibold text-ink">{t('order.successTitle')}</h2>
          <p className="mt-2 max-w-md text-ink-soft">{t('order.successBody')}</p>

          {/* What happens next: the team calls back, with the same WhatsApp number
              offered as a fallback if nobody does. */}
          <div className="mt-6 w-full max-w-md rounded-2xl border border-line bg-white p-5 text-start shadow-soft">
            <p className="flex items-start gap-2 text-sm leading-relaxed text-ink-soft">
              <PhoneCall className="mt-0.5 h-4 w-4 shrink-0 text-secondary-500" />
              <span>{t('order.followUpNote')}</span>
            </p>
            <a
              href={`tel:${site.orderWhatsAppDisplay.replace(/\s/g, '')}`}
              dir="ltr"
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-primary-800 transition-colors hover:border-primary-300 hover:bg-primary-50"
            >
              <PhoneCall className="h-4 w-4 text-secondary-500" />
              {site.orderWhatsAppDisplay}
            </a>
          </div>

          {/* Safety net: if the browser blocked the WhatsApp popup, the order would
              otherwise be stranded — the cart is already cleared by this point. */}
          {waUrl && (
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-success-600 px-6 py-3 text-sm font-medium text-white shadow-soft transition-all hover:bg-success-700 hover:shadow-glow"
            >
              <MessageCircle className="h-4 w-4" />
              {t('order.reopenWhatsApp')}
            </a>
          )}

          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-800 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-primary-700 hover:shadow-glow"
          >
            {t('order.continueShopping')}
          </Link>
        </div>
      </Container>
    );
  }

  if (count === 0) {
    return (
      <Container size="narrow" className="py-16">
        <div className="flex flex-col items-center rounded-3xl border border-dashed border-line-strong bg-neutral-50 px-8 py-20 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-white text-ink-muted shadow-soft">
            <ShoppingCart className="h-7 w-7" />
          </span>
          <h2 className="mt-6 text-xl font-semibold text-ink">{t('order.emptyTitle')}</h2>
          <p className="mt-2 max-w-sm text-ink-soft">{t('order.emptyBody')}</p>
          <Button href="/products" variant="primary" className="mt-8" withArrow>
            {t('order.continueShopping')}
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="pb-20">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        {/* Items */}
        <div>
          <h2 className="text-lg font-semibold text-ink">{t('order.itemsHeading')}</h2>
          <ul className="mt-4 space-y-4">
            {lines.map((line) => (
              <li
                key={line.product.slug}
                className="flex gap-3 rounded-2xl border border-line bg-white p-3 shadow-soft sm:gap-4 sm:p-4"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-neutral-50">
                  {line.product.image && (
                    <Image src={line.product.image} alt={line.product.name} fill className="object-contain p-1.5" sizes="64px" />
                  )}
                </div>
                {/* Name/remove on top, quantity + line total below — keeps the row from
                    overflowing on narrow phones (esp. RTL) */}
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <Link
                        href={`/products/${line.product.slug}`}
                        className="block truncate font-medium text-ink hover:text-primary-800"
                      >
                        {line.product.name}
                      </Link>
                      <div className="mt-0.5 text-sm text-ink-muted">
                        {currency} {line.product.price}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(line.product.slug)}
                      className="-me-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-muted transition-colors hover:bg-danger-50 hover:text-danger-600"
                      aria-label={t('order.remove')}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="inline-flex shrink-0 items-center rounded-full border border-line">
                      <button
                        type="button"
                        onClick={() => setQuantity(line.product.slug, line.quantity - 1)}
                        className="grid h-9 w-9 place-items-center text-ink-soft transition-colors hover:text-primary-800"
                        aria-label={t('order.quantity')}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-ink">{line.quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(line.product.slug, line.quantity + 1)}
                        className="grid h-9 w-9 place-items-center text-ink-soft transition-colors hover:text-primary-800"
                        aria-label={t('order.quantity')}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="font-semibold text-ink">
                      {currency} {line.lineTotal}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Totals */}
          <div className="mt-6 space-y-2 rounded-2xl border border-line bg-surface-muted p-5">
            <div className="flex items-center justify-between text-sm text-ink-soft">
              <span>{t('order.subtotal')}</span>
              <span>
                {currency} {subtotal}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-ink-soft">
              <span>{t('order.delivery')}</span>
              <span>
                {currency} {deliveryFee}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-line pt-2 text-base font-bold text-ink">
              <span>{t('order.total')}</span>
              <span>
                {currency} {total}
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-2xl border border-primary-100 bg-primary-50/60 px-5 py-3.5 text-sm">
            <span className="font-medium text-ink">{t('order.paymentMethod')}</span>
            <span className="text-ink-soft">{t('order.cashOnDelivery')}</span>
          </div>
        </div>

        {/* Customer form */}
        <form onSubmit={handleSubmit} className="h-fit space-y-5 rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8">
          <h2 className="text-lg font-semibold text-ink">{t('order.customerDetails')}</h2>

          <Field label={t('order.name')} required error={errors.name}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              autoComplete="name"
              className={fieldClass(!!errors.name)}
              aria-invalid={!!errors.name}
            />
          </Field>

          <Field label={t('order.phone')} required error={errors.phone}>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              autoComplete="tel"
              placeholder="+20 ..."
              className={fieldClass(!!errors.phone)}
              aria-invalid={!!errors.phone}
            />
          </Field>

          <Field label={t('order.address')} required error={errors.address}>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              className={cn(fieldClass(!!errors.address), 'resize-none')}
              aria-invalid={!!errors.address}
            />
          </Field>

          <div>
            <button
              type="button"
              onClick={handleUseLocation}
              disabled={locationState === 'loading'}
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-primary-300 hover:bg-primary-50 disabled:opacity-60"
            >
              <MapPin className="h-4 w-4 text-secondary-500" />
              {locationState === 'done' ? t('order.locationShared') : t('order.useLocation')}
            </button>
            {locationState === 'error' && (
              <p className="mt-1.5 flex items-center gap-1.5 text-sm text-danger-600">
                <AlertCircle className="h-3.5 w-3.5" />
                {t('order.locationError')}
              </p>
            )}
          </div>

          <Field label={t('order.notes')}>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder={t('order.notesPlaceholder')}
              className={cn(fieldClass(false), 'resize-none')}
            />
          </Field>

          <button
            type="submit"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-success-600 px-8 py-3.5 font-medium text-white shadow-soft transition-all hover:bg-success-700 hover:shadow-glow sm:w-auto"
          >
            <Send className="h-4 w-4" />
            {t('order.placeOrder')}
          </button>
          {/* Set expectations before submitting: the WhatsApp redirect needs an
              explicit Send, and the team calls back within 15–30 minutes. */}
          <div className="rounded-2xl border border-line bg-neutral-50 p-4">
            <p className="flex items-start gap-2 text-xs leading-relaxed text-ink-soft">
              <Send className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success-600" />
              <span>{t('order.placeOrderHint')}</span>
            </p>
            <p className="mt-2.5 flex items-start gap-2 text-xs leading-relaxed text-ink-soft">
              <PhoneCall className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary-500" />
              <span>
                {t('order.followUpNote')}{' '}
                <a
                  href={`tel:${site.orderWhatsAppDisplay.replace(/\s/g, '')}`}
                  dir="ltr"
                  className="font-semibold text-primary-800 underline-offset-2 hover:underline"
                >
                  {site.orderWhatsAppDisplay}
                </a>
              </span>
            </p>
          </div>
        </form>
      </div>
    </Container>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="ms-0.5 text-danger-600">*</span>}
      </span>
      {children}
      {error && (
        <span className="mt-1.5 flex items-center gap-1.5 text-sm text-danger-600" role="alert">
          <AlertCircle className="h-3.5 w-3.5" />
          {error}
        </span>
      )}
    </label>
  );
}
