/**
 * Accepts Egyptian mobile numbers with an optional +20 / 0020 / trunk-0
 * prefix ahead of the 01[0125] + 8-digit body, tolerating spaces and dashes
 * (e.g. "+20 10 5599 9630", "01055999630", "0020-100-1164300").
 *
 * Shared by the retail checkout and the trade enquiry form so both accept
 * exactly the same set of numbers.
 */
const EGYPT_MOBILE_RE = /^(?:\+20|0020|0)?1[0125]\d{8}$/;

export function isValidEgyptPhone(raw: string) {
  return EGYPT_MOBILE_RE.test(raw.replace(/[\s-]/g, ''));
}
