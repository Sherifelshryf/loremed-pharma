/**
 * Builds the WhatsApp order invoice text. Pulled out of OrderClient so it can
 * be unit tested without mounting the form, and reused as-is by the submit
 * handler.
 *
 * The invoice is ALWAYS composed in Arabic, regardless of the language the
 * customer used on the site, so the team receives every order in one
 * consistent format. Product names stay as-is (they're English by design).
 * These labels are message-only and intentionally never translated, so they
 * live here rather than in the bilingual UI dictionary.
 */
import { site } from '@/content/site';

const INVOICE = {
  title: 'فاتورة طلب',
  orderNumber: 'رقم الطلب',
  customer: 'بيانات العميل',
  name: 'الاسم',
  phone: 'رقم الهاتف',
  address: 'عنوان التوصيل',
  notes: 'ملاحظات',
  location: 'الموقع الجغرافي',
  items: 'تفاصيل الطلب',
  summary: 'ملخص الفاتورة',
  subtotal: 'الإجمالي الفرعي',
  deliveryFee: 'رسوم التوصيل',
  grandTotal: 'الإجمالي المستحق',
  payment: 'طريقة الدفع',
  eta: 'موعد التوصيل المتوقع',
  etaValue: 'خلال 24–48 ساعة',
  thanks: 'شكراً لثقتكم بنا',
  closingLine1: 'نتمنى لكم دوام الصحة والعافية،',
  closingLine2: 'ونسعد دائماً بخدمتكم.',
};

/** Shown both on the checkout summary and in the WhatsApp invoice — keep in sync. */
export const PAYMENT_METHOD = { en: 'Cash on Delivery', ar: 'الدفع عند الاستلام' };

const RULE = '━━━━━━━━━━━━━━';

/**
 * Product names on the invoice drop the pack size that the catalogue carries
 * for disambiguation ("Smartod for kids 30ml" → "Smartod for kids"). The site
 * keeps the full name; only the message is shortened.
 */
function invoiceName(name: string) {
  return name.replace(/\s*\d+\s*ml\b/i, '').trim();
}

/**
 * The invoice uses a fixed, known-good set of emoji. Anything astral arriving
 * from what the customer typed is dropped, so an emoji pasted into a name or
 * address can't introduce glyphs that fail to render alongside them.
 */
function sanitizeInput(value: string) {
  return value.replace(/[\u{10000}-\u{10FFFF}]/gu, '').trim();
}
/** Width the "name ×qty" column is padded to with dot leaders before the price. */
const LEADER_WIDTH = 28;

const AR_CURRENCY = site.currency.ar;

export function buildWhatsAppMessage({
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
  lines: { product: { name: { en: string }; price: number }; quantity: number; lineTotal: number }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}) {
  const lb = '\n';
  const money = (amount: number) => `${amount} ${AR_CURRENCY}`;

  let msg = `🧾 *${INVOICE.title}*${lb}${lb}`;

  msg += `${RULE}${lb}`;
  msg += `📦 *${INVOICE.orderNumber}*${lb}`;
  msg += `*#${orderNumber}*${lb}`;
  msg += `${RULE}${lb}${lb}`;

  msg += `👤 *${INVOICE.customer}*${lb}${lb}`;
  msg += `*${INVOICE.name}:* ${sanitizeInput(name)}${lb}`;
  msg += `*${INVOICE.phone}:* ${sanitizeInput(phone)}${lb}`;
  msg += `*${INVOICE.address}:* ${sanitizeInput(address)}${lb}`;
  if (sanitizeInput(notes)) {
    msg += `*${INVOICE.notes}:* ${sanitizeInput(notes)}${lb}`;
  }
  if (locationLink) {
    msg += `${lb}📍 *${INVOICE.location}:*${lb}`;
    msg += `${locationLink}${lb}`;
  }
  msg += lb;

  msg += `${RULE}${lb}`;
  msg += `🛍️ *${INVOICE.items}*${lb}${lb}`;
  for (const line of lines) {
    // Dot leaders are padded against the rendered width — the bold asterisks
    // are markup and disappear once WhatsApp formats the line.
    // The invoice stays English for product names so they match the carton.
    const label = invoiceName(line.product.name.en);
    const rendered = `${label} ×${line.quantity}`;
    const dots = '.'.repeat(Math.max(3, LEADER_WIDTH - rendered.length));
    msg += `• *${label}* ×${line.quantity} ${dots} *${money(line.lineTotal)}*${lb}`;
  }
  msg += lb;

  msg += `${RULE}${lb}`;
  msg += `💰 *${INVOICE.summary}*${lb}${lb}`;
  msg += `*${INVOICE.subtotal}:* ${money(subtotal)}${lb}`;
  msg += `*${INVOICE.deliveryFee}:* ${money(deliveryFee)}${lb}${lb}`;
  msg += `💵 *${INVOICE.grandTotal}: ${money(total)}*${lb}${lb}`;

  msg += `${RULE}${lb}`;
  msg += `💳 *${INVOICE.payment}*${lb}${lb}`;
  msg += `*${PAYMENT_METHOD.ar}*${lb}${lb}`;

  msg += `${RULE}${lb}`;
  msg += `🚚 *${INVOICE.eta}*${lb}${lb}`;
  msg += `*${INVOICE.etaValue}*${lb}${lb}`;

  msg += `${RULE}${lb}${lb}`;
  msg += `🙏 *${INVOICE.thanks}*${lb}${lb}`;
  msg += `${INVOICE.closingLine1}${lb}`;
  msg += `${INVOICE.closingLine2} 💙`;

  return msg;
}

/**
 * Short, readable and effectively collision-free: a base-36 millisecond
 * timestamp (so two orders placed a millisecond apart already differ) plus a
 * 4-digit random suffix, replacing a bare Math.random() draw that had a real
 * chance of colliding across concurrent shoppers.
 */
export function generateOrderNumber(now: number = Date.now()): string {
  const suffix = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  return `${now.toString(36).toUpperCase()}-${suffix}`;
}
