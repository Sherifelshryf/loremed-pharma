import type { TranslationKey } from '@/i18n/dictionaries';

/** Maps a top-level primaryNav label (plain string key) to its nav.* dictionary entry. */
export const NAV_T: Record<string, TranslationKey> = {
  Home: 'nav.home',
  Products: 'nav.products',
  About: 'nav.about',
  Quality: 'nav.quality',
  'R&D': 'nav.research',
  Contact: 'nav.contact',
};
