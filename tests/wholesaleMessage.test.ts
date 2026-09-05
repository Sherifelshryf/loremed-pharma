import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildWholesaleMessage,
  generateEnquiryNumber,
  wholesaleWhatsAppUrl,
} from '../src/lib/wholesaleMessage';
import { site } from '../src/content/site';

test('buildWholesaleMessage carries the applicant details', () => {
  const message = buildWholesaleMessage({
    refNumber: 'TR-ABC123-4567',
    name: 'Zahraa Pharmacy',
    businessType: 'pharmacy',
    phone: '+201206971111',
    address: 'Zahraa Elmaadi / ElNada Buildings',
    notes: '',
    locationLink: null,
  });

  assert.match(message, /#TR-ABC123-4567/);
  assert.match(message, /Zahraa Pharmacy/);
  assert.match(message, /\+201206971111/);
  assert.match(message, /Zahraa Elmaadi \/ ElNada Buildings/);
  // Business type is written out in Arabic, like the rest of the message.
  assert.match(message, /صيدلية/);
  // No cart involved — nothing that belongs to the retail invoice leaks in.
  assert.doesNotMatch(message, /الإجمالي/);
  assert.doesNotMatch(message, /رسوم التوصيل/);
});

test('buildWholesaleMessage labels distributors distinctly and omits empty notes', () => {
  const message = buildWholesaleMessage({
    refNumber: 'TR-XYZ-0001',
    name: 'Nile Distribution Co.',
    businessType: 'distributor',
    phone: '01055999630',
    address: 'Nasr City',
    notes: '   ',
    locationLink: null,
  });

  assert.match(message, /شركة توزيع/);
  assert.doesNotMatch(message, /ملاحظات/);
});

test('buildWholesaleMessage includes the map link only when one was shared', () => {
  const base = {
    refNumber: 'TR-1',
    name: 'Al Shifa Pharmacy',
    businessType: 'pharmacy' as const,
    phone: '01055999630',
    address: 'Giza',
    notes: 'Needs a monthly quote',
  };

  const without = buildWholesaleMessage({ ...base, locationLink: null });
  assert.doesNotMatch(without, /maps\.google\.com/);
  assert.match(without, /Needs a monthly quote/);

  const withPin = buildWholesaleMessage({
    ...base,
    locationLink: 'https://maps.google.com/?q=30.09,31.31',
  });
  assert.match(withPin, /https:\/\/maps\.google\.com\/\?q=30\.09,31\.31/);
});

test('buildWholesaleMessage strips astral characters out of free text', () => {
  const message = buildWholesaleMessage({
    refNumber: 'TR-2',
    name: 'Pharmacy 🎉🎊',
    businessType: 'pharmacy',
    phone: '01055999630',
    address: 'Maadi 🚀',
    notes: '',
    locationLink: null,
  });

  assert.match(message, /Pharmacy/);
  assert.match(message, /Maadi/);
  // The message's own fixed emoji stay; only what the visitor typed is stripped.
  assert.doesNotMatch(message, /🎉/);
  assert.doesNotMatch(message, /🚀/);
  assert.match(message, /🏥/);
});

test('wholesaleWhatsAppUrl targets the trade number, not the retail one', () => {
  const url = wholesaleWhatsAppUrl('hello');
  assert.match(url, new RegExp(`phone=${site.wholesaleWhatsAppNumber}`));
  assert.notEqual(site.wholesaleWhatsAppNumber, site.orderWhatsAppNumber);
});

test('generateEnquiryNumber is prefixed and unique across a run', () => {
  const first = generateEnquiryNumber(1_700_000_000_000);
  assert.match(first, /^TR-[0-9A-Z]+-\d{4}$/);

  const seen = new Set(Array.from({ length: 200 }, () => generateEnquiryNumber()));
  assert.ok(seen.size > 190, `expected near-unique numbers, got ${seen.size}/200`);
});
