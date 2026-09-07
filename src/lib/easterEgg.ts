import { normalizeSearch } from '@/content/products';

/**
 * Names that answer with "Goat" when searched.
 *
 * Compared against the whole normalised query rather than matched inside it, so
 * the name has to be typed out in full: "sherif" lands, "sher" and "sherifa"
 * do not. Nothing on the site points at this — it is only found by someone who
 * already knows to look.
 */
const GOATS = ['sherif', 'youssef', 'ahmed'];

/** The reply. Deliberately the same in both languages. */
export const GOAT = 'Goat';

/**
 * `normalizeSearch` lowercases and drops everything that is not a letter or a
 * digit, so casing, spaces around the name and stray punctuation all still
 * count as the name typed in full.
 */
export function isGoatQuery(query: string) {
  return GOATS.includes(normalizeSearch(query));
}
