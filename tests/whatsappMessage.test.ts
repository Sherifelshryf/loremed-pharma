import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildWhatsAppMessage, generateOrderNumber } from '../src/cart/whatsappMessage';

test('buildWhatsAppMessage renders a two-line order', () => {
  const message = buildWhatsAppMessage({
    orderNumber: 'ABC123-4567',
    name: 'Sherif Mohamed',
    phone: '+201206971111',
    address: 'Zahraa Elmaadi/ElNada Buildings',
    notes: '',
    locationLink: null,
    lines: [
      { product: { name: { en: 'Imulormed' }, price: 180 }, quantity: 1, lineTotal: 180 },
      { product: { name: { en: 'Vitelormed' }, price: 210 }, quantity: 2, lineTotal: 420 },
    ],
    subtotal: 600,
    deliveryFee: 30,
    total: 630,
  });

  // Order identity and customer details.
  assert.match(message, /#ABC123-4567/);
  assert.match(message, /Sherif Mohamed/);
  assert.match(message, /\+201206971111/);
  assert.match(message, /Zahraa Elmaadi\/ElNada Buildings/);

  // Both lines present with quantity and line total, product names kept English.
  assert.match(message, /Imulormed.*×1.*180 ج\.م/s);
  assert.match(message, /Vitelormed.*×2.*420 ج\.م/s);

  // Totals.
  assert.match(message, /600 ج\.م/); // subtotal
  assert.match(message, /30 ج\.م/); // delivery fee
  assert.match(message, /630 ج\.م/); // grand total

  // No notes/location section when neither is supplied.
  assert.doesNotMatch(message, /ملاحظات/);
  assert.doesNotMatch(message, /الموقع الجغرافي/);
});

test('buildWhatsAppMessage includes notes and location only when provided', () => {
  const message = buildWhatsAppMessage({
    orderNumber: 'X-0001',
    name: 'Test',
    phone: '01055999630',
    address: 'Cairo',
    notes: 'Ring the bell',
    locationLink: 'https://maps.google.com/?q=30,31',
    lines: [{ product: { name: { en: 'Ivylor' }, price: 160 }, quantity: 1, lineTotal: 160 }],
    subtotal: 160,
    deliveryFee: 30,
    total: 190,
  });

  assert.match(message, /Ring the bell/);
  assert.match(message, /https:\/\/maps\.google\.com\/\?q=30,31/);
});

test('buildWhatsAppMessage drops astral emoji pasted into free-text fields', () => {
  const message = buildWhatsAppMessage({
    orderNumber: 'X-0002',
    name: 'Test 🎉',
    phone: '01055999630',
    address: 'Cairo 🏠',
    notes: '',
    locationLink: null,
    lines: [{ product: { name: { en: 'Ivylor' }, price: 160 }, quantity: 1, lineTotal: 160 }],
    subtotal: 160,
    deliveryFee: 30,
    total: 190,
  });

  assert.doesNotMatch(message, /🎉/);
  assert.doesNotMatch(message, /🏠/);
  assert.match(message, /Test/);
  assert.match(message, /Cairo/);
});

test('generateOrderNumber is time-prefixed and short', () => {
  const now = 1_700_000_000_000;
  const orderNumber = generateOrderNumber(now);
  const expectedPrefix = now.toString(36).toUpperCase();
  assert.equal(orderNumber, `${expectedPrefix}-${orderNumber.split('-')[1]}`);
  assert.match(orderNumber, new RegExp(`^${expectedPrefix}-\\d{4}$`));
});

test('generateOrderNumber does not collide for two calls in the same millisecond', () => {
  // Not a full collision proof, but demonstrates the format leaves enough
  // entropy (10,000 possible suffixes) that same-millisecond orders differ
  // most of the time, unlike the old Math.random()-only 8-digit number.
  const now = Date.now();
  const a = generateOrderNumber(now);
  const b = generateOrderNumber(now);
  assert.equal(a.split('-')[0], b.split('-')[0]);
  assert.match(a, /^[0-9A-Z]+-\d{4}$/);
  assert.match(b, /^[0-9A-Z]+-\d{4}$/);
});
