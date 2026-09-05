/**
 * Builds the WhatsApp text for a pharmacy / distributor enquiry.
 *
 * Mirrors the retail invoice in src/cart/whatsappMessage.ts: always composed in
 * Arabic regardless of the language the visitor used, so the trade team
 * receives every enquiry in one consistent format. There are no line items —
 * this is a request to be contacted, not an order — so it carries who is
 * asking, how to reach them and where they are.
 */
import { site } from '@/content/site';

const ENQUIRY = {
  title: 'طلب تعامل تجاري',
  refNumber: 'رقم الطلب',
  applicant: 'بيانات مقدّم الطلب',
  name: 'الاسم',
  type: 'نوع النشاط',
  phone: 'رقم الهاتف',
  address: 'العنوان',
  location: 'الموقع الجغرافي',
  notes: 'ملاحظات',
  next: 'الخطوة التالية',
  nextValue: 'سيتواصل معكم فريق المبيعات لاستكمال الطلب.',
  thanks: 'شكراً لاهتمامكم بالتعامل مع لورميد فارما',
};

/** The two audiences the trade line serves. */
export const BUSINESS_TYPES = {
  pharmacy: { en: 'Pharmacy', ar: 'صيدلية' },
  distributor: { en: 'Distribution company', ar: 'شركة توزيع' },
} as const;

export type BusinessType = keyof typeof BUSINESS_TYPES;

const RULE = '━━━━━━━━━━━━━━';

/**
 * Same guard the retail invoice uses: astral characters pasted into a free-text
 * field are dropped so they can't break the fixed emoji set alongside them.
 */
function sanitizeInput(value: string) {
  return value.replace(/[\u{10000}-\u{10FFFF}]/gu, '').trim();
}

export function buildWholesaleMessage({
  refNumber,
  name,
  businessType,
  phone,
  address,
  notes,
  locationLink,
}: {
  refNumber: string;
  name: string;
  businessType: BusinessType;
  phone: string;
  address: string;
  notes: string;
  locationLink: string | null;
}) {
  const lb = '\n';

  let msg = `🏥 *${ENQUIRY.title}*${lb}${lb}`;

  msg += `${RULE}${lb}`;
  msg += `📌 *${ENQUIRY.refNumber}*${lb}`;
  msg += `*#${refNumber}*${lb}`;
  msg += `${RULE}${lb}${lb}`;

  msg += `👤 *${ENQUIRY.applicant}*${lb}${lb}`;
  msg += `*${ENQUIRY.name}:* ${sanitizeInput(name)}${lb}`;
  msg += `*${ENQUIRY.type}:* ${BUSINESS_TYPES[businessType].ar}${lb}`;
  msg += `*${ENQUIRY.phone}:* ${sanitizeInput(phone)}${lb}`;
  msg += `*${ENQUIRY.address}:* ${sanitizeInput(address)}${lb}`;
  if (sanitizeInput(notes)) {
    msg += `*${ENQUIRY.notes}:* ${sanitizeInput(notes)}${lb}`;
  }
  if (locationLink) {
    msg += `${lb}📍 *${ENQUIRY.location}:*${lb}`;
    msg += `${locationLink}${lb}`;
  }
  msg += lb;

  msg += `${RULE}${lb}`;
  msg += `📞 *${ENQUIRY.next}*${lb}${lb}`;
  msg += `${ENQUIRY.nextValue}${lb}${lb}`;

  msg += `${RULE}${lb}${lb}`;
  msg += `🙏 *${ENQUIRY.thanks}* 💙`;

  return msg;
}

/** Pre-built wa.me-equivalent link for the trade number. */
export function wholesaleWhatsAppUrl(message: string) {
  return `https://api.whatsapp.com/send?phone=${site.wholesaleWhatsAppNumber}&text=${encodeURIComponent(message)}`;
}

/**
 * Trade enquiries get their own prefix so they are obvious next to retail order
 * numbers in the same WhatsApp inbox. Same collision-resistant shape: a base-36
 * millisecond timestamp plus a 4-digit random suffix.
 */
export function generateEnquiryNumber(now: number = Date.now()): string {
  const suffix = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  return `TR-${now.toString(36).toUpperCase()}-${suffix}`;
}
