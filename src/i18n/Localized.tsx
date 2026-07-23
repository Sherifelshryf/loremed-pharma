'use client';

import { useI18n } from './LanguageProvider';
import type { Bi } from './dictionaries';

/** Renders the field matching the current locale — for bilingual content used inside server-rendered pages. */
export function L({ text }: { text: Bi }) {
  const { locale } = useI18n();
  return <>{text[locale]}</>;
}
