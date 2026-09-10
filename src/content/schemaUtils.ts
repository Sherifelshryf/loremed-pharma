/**
 * Shared helpers for the two content validators.
 */

/**
 * Is this optional field effectively unset?
 *
 * Clearing a field at /admin does not delete it from the JSON. Sveltia writes
 * back what the empty form control holds: an emptied text or image field
 * becomes `""`, and a cleared number can arrive as `null`. Both mean "the
 * editor does not want one", which is exactly what leaving the field alone
 * means, so the validators have to read them the same way.
 *
 * They did not, once. Removing a bundle's photo wrote `"image": ""`, the
 * validator rejected it as "not a path starting with /", `npm test` failed,
 * and the deploy refused to upload — so the photo stayed on the live site and
 * the person who removed it had no way of knowing why. The storefront had it
 * right all along: every component guards on truthiness, so `""` renders as no
 * photo. This makes the validators agree with the site.
 */
export function isBlank(value: unknown): boolean {
  return value === undefined || value === null || value === '';
}
