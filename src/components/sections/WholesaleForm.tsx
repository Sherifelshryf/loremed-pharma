'use client';

import { useState } from 'react';
import { MapPin, Send, Check, AlertCircle, PhoneCall, MessageCircle, Building2, Store } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageProvider';
import { site } from '@/content/site';
import { Container } from '@/components/ui/Section';
import { cn } from '@/lib/utils';
import { isValidEgyptPhone } from '@/lib/egyptPhone';
import {
  BUSINESS_TYPES,
  buildWholesaleMessage,
  generateEnquiryNumber,
  wholesaleWhatsAppUrl,
  type BusinessType,
} from '@/lib/wholesaleMessage';

/**
 * Trade enquiry form for pharmacies and distributors. Same card, fields and
 * WhatsApp hand-off as the retail checkout, minus the cart: there is nothing to
 * price here, only a request for the wholesale team to call back.
 */
export function WholesaleForm() {
  const { locale, t } = useI18n();
  const [name, setName] = useState('');
  const [businessType, setBusinessType] = useState<BusinessType>('pharmacy');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [locationLink, setLocationLink] = useState<string | null>(null);
  const [locationState, setLocationState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [errors, setErrors] = useState<{ name?: string; phone?: string; address?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [waUrl, setWaUrl] = useState<string | null>(null);

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
    if (!name.trim()) nextErrors.name = t('wholesale.errorName');
    if (!phone.trim()) nextErrors.phone = t('order.errorPhone');
    else if (!isValidEgyptPhone(phone)) nextErrors.phone = t('order.errorPhoneInvalid');
    if (!address.trim()) nextErrors.address = t('wholesale.errorAddress');
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const message = buildWholesaleMessage({
      refNumber: generateEnquiryNumber(),
      name: name.trim(),
      businessType,
      phone: phone.trim(),
      address: address.trim(),
      notes,
      locationLink,
    });
    const url = wholesaleWhatsAppUrl(message);

    // Same ordering as the retail checkout: show the confirmation before handing
    // off, because opening WhatsApp switches tab or app and the visitor would
    // otherwise only meet this screen on the way back.
    setWaUrl(url);
    setSubmitted(true);

    // Must stay inside the click handler or popup blockers eat it. If it is
    // blocked anyway, the confirmation screen keeps the link.
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
      <Container size="narrow" className="pb-20">
        <div className="flex flex-col items-center rounded-3xl border border-success-100 bg-success-50/60 px-8 py-16 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-success-500 text-white">
            <Check className="h-8 w-8" strokeWidth={3} />
          </span>
          <h2 className="mt-6 text-2xl font-semibold text-ink">{t('wholesale.successTitle')}</h2>
          <p className="mt-2 max-w-md text-ink-soft">{t('wholesale.successBody')}</p>

          <div className="mt-6 w-full max-w-md rounded-2xl border border-line bg-white p-5 text-start shadow-soft">
            <p className="flex items-start gap-2 text-sm leading-relaxed text-ink-soft">
              <PhoneCall className="mt-0.5 h-4 w-4 shrink-0 text-secondary-500" />
              <span>{t('wholesale.followUpNote')}</span>
            </p>
            <a
              href={`tel:${site.wholesaleWhatsAppDisplay.replace(/\s/g, '')}`}
              dir="ltr"
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-primary-800 transition-colors hover:border-primary-300 hover:bg-primary-50"
            >
              <PhoneCall className="h-4 w-4 text-secondary-500" />
              {site.wholesaleWhatsAppDisplay}
            </a>
          </div>

          {/* Safety net for a blocked popup — the same pre-filled message. */}
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
        </div>
      </Container>
    );
  }

  return (
    <Container size="narrow" className="pb-20">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8"
      >
        <h2 className="text-lg font-semibold text-ink">{t('wholesale.formHeading')}</h2>

        {/* Which of the two trade audiences this is — it routes the follow-up. */}
        <fieldset>
          <legend className="mb-1.5 block text-sm font-medium text-ink">
            {t('wholesale.businessType')}
            <span className="ms-0.5 text-danger-600">*</span>
          </legend>
          <div className="grid grid-cols-2 gap-3">
            {(Object.keys(BUSINESS_TYPES) as BusinessType[]).map((key) => {
              const Icon = key === 'pharmacy' ? Store : Building2;
              const selected = businessType === key;
              return (
                <label
                  key={key}
                  className={cn(
                    'flex cursor-pointer items-center gap-2.5 rounded-2xl border px-4 py-3.5 text-sm font-medium transition-all',
                    selected
                      ? 'border-primary-400 bg-primary-50/70 text-primary-800 ring-2 ring-primary-500/15'
                      : 'border-line bg-white text-ink-soft hover:border-primary-300 hover:bg-primary-50/40',
                  )}
                >
                  <input
                    type="radio"
                    name="businessType"
                    value={key}
                    checked={selected}
                    onChange={() => setBusinessType(key)}
                    className="sr-only"
                  />
                  <Icon className={cn('h-4 w-4 shrink-0', selected ? 'text-secondary-500' : 'text-ink-muted')} />
                  {BUSINESS_TYPES[key][locale]}
                </label>
              );
            })}
          </div>
        </fieldset>

        <Field label={t('wholesale.name')} required error={errors.name}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            autoComplete="organization"
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

        <Field label={t('wholesale.address')} required error={errors.address}>
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
            placeholder={t('wholesale.notesPlaceholder')}
            className={cn(fieldClass(false), 'resize-none')}
          />
        </Field>

        <button
          type="submit"
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-success-600 px-8 py-3.5 font-medium text-white shadow-soft transition-all hover:bg-success-700 hover:shadow-glow sm:w-auto"
        >
          <Send className="h-4 w-4" />
          {t('wholesale.submit')}
        </button>

        <div className="rounded-2xl border border-line bg-neutral-50 p-4">
          <p className="flex items-start gap-2 text-xs leading-relaxed text-ink-soft">
            <Send className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success-600" />
            <span>{t('wholesale.submitHint')}</span>
          </p>
          <p className="mt-2.5 flex items-start gap-2 text-xs leading-relaxed text-ink-soft">
            <PhoneCall className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary-500" />
            <span>
              {t('wholesale.followUpNote')}{' '}
              <a
                href={`tel:${site.wholesaleWhatsAppDisplay.replace(/\s/g, '')}`}
                dir="ltr"
                className="font-semibold text-primary-800 underline-offset-2 hover:underline"
              >
                {site.wholesaleWhatsAppDisplay}
              </a>
            </span>
          </p>
        </div>
      </form>
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
