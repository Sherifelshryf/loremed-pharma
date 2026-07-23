'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, Send, AlertCircle } from 'lucide-react';
import { useRef, useState, type FormEvent } from 'react';
import { useI18n } from '@/i18n/LanguageProvider';
import { cn } from '@/lib/utils';

const departments = ['Sales', 'Medical Information', 'Export', 'Human Resources', 'Support'];

type Errors = Partial<Record<'name' | 'email' | 'department' | 'message', string>>;

export function ContactForm() {
  const { t } = useI18n();
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function validate(data: FormData): Errors {
    const e: Errors = {};
    if (!String(data.get('name') || '').trim()) e.name = 'Please enter your name.';
    const email = String(data.get('email') || '').trim();
    if (!email) e.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Please enter a valid email address.';
    if (!String(data.get('department') || '')) e.department = 'Please choose a department.';
    if (!String(data.get('message') || '').trim()) e.message = 'Please add a short message.';
    return e;
  }

  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const data = new FormData(ev.currentTarget);
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const first = Object.keys(e)[0];
      (formRef.current?.querySelector(`[name="${first}"]`) as HTMLElement | null)?.focus();
      return;
    }
    setSubmitted(true);
  }

  const fieldClass = (hasError?: boolean) =>
    cn(
      'w-full rounded-2xl border bg-white px-4 py-3.5 text-ink outline-none transition-all placeholder:text-ink-muted',
      hasError
        ? 'border-danger-500 focus:border-danger-600 focus:ring-2 focus:ring-danger-500/20'
        : 'border-line focus:border-primary-400 focus:ring-2 focus:ring-primary-500/15',
    );

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center rounded-3xl border border-success-100 bg-success-50/60 px-8 py-16 text-center"
          >
            <span className="grid h-16 w-16 place-items-center rounded-full bg-success-500 text-white">
              <Check className="h-8 w-8" strokeWidth={3} />
            </span>
            <h3 className="mt-6 text-2xl font-semibold text-ink">Message received</h3>
            <p className="mt-2 max-w-sm text-ink-soft">
              Thank you for reaching out to Loremed. The right team will get back to you shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                formRef.current?.reset();
              }}
              className="mt-8 text-sm font-medium text-primary-700 underline-offset-4 hover:underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-5 rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t('contact.name')} required error={errors.name}>
                <input name="name" type="text" autoComplete="name" className={fieldClass(!!errors.name)} aria-invalid={!!errors.name} placeholder="Jane Doe" />
              </Field>
              <Field label={t('contact.email')} required error={errors.email}>
                <input name="email" type="email" autoComplete="email" className={fieldClass(!!errors.email)} aria-invalid={!!errors.email} placeholder="you@example.com" />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t('contact.phone')}>
                <input name="phone" type="tel" autoComplete="tel" className={fieldClass(false)} placeholder="+20 ..." />
              </Field>
              <Field label={t('contact.department')} required error={errors.department}>
                <select name="department" className={cn(fieldClass(!!errors.department), 'appearance-none')} aria-invalid={!!errors.department} defaultValue="">
                  <option value="" disabled>
                    Choose a department
                  </option>
                  {departments.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label={t('contact.subject')}>
              <input name="subject" type="text" className={fieldClass(false)} placeholder="How can we help?" />
            </Field>

            <Field label={t('contact.message')} required error={errors.message}>
              <textarea name="message" rows={5} className={cn(fieldClass(!!errors.message), 'resize-none')} aria-invalid={!!errors.message} placeholder="Tell us a little about your enquiry…" />
            </Field>

            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-800 px-8 py-3.5 font-medium text-white shadow-soft transition-all hover:bg-primary-700 hover:shadow-glow sm:w-auto"
            >
              <Send className="h-4 w-4" />
              {t('contact.send')}
            </button>
            <p className="text-xs text-ink-muted">
              <span className="text-danger-600">*</span> {t('contact.required')} fields.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
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
