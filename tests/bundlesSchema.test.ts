import assert from 'node:assert/strict';
import test from 'node:test';
import { validateBundles } from '../src/content/bundlesSchema';
import {
  bundles,
  activeBundles,
  sellableBundles,
  featuredBundles,
  featuredFirst,
  bundleSaving,
  contentsTotal,
  isBundleSellable,
  type Bundle,
} from '../src/content/bundles';
import raw from '../src/content/bundles.json';

/** A valid bundle built from two products that really exist and are available. */
const good = (): Record<string, unknown> => ({
  slug: 'immunity-pack',
  name: { en: 'Immunity Pack', ar: 'باقة المناعة' },
  tagline: { en: 'Two ways to stay well', ar: 'طريقتين تفضل بيهم بصحة' },
  description: { en: 'Ivylor and Vitelormed together.', ar: 'إيفيلور وفيتيلورميد مع بعض.' },
  items: [
    { slug: 'ivylor', quantity: 1 },
    { slug: 'vitelormed', quantity: 1 },
  ],
  price: 240,
  compareAtPrice: 265,
  status: 'active',
});

test('the shipped bundles file is valid', () => {
  assert.deepEqual(validateBundles(raw), []);
});

test('an empty list is valid — it is the coming-soon state', () => {
  assert.deepEqual(validateBundles([]), []);
});

/**
 * Deliberately not asserting the file is empty.
 *
 * It is empty today, but the whole point of the CMS is that someone adds to it
 * without touching code — and the deploy workflow runs these tests before it
 * uploads. A test pinned to "there are no bundles" would fail on the first
 * bundle anyone created and block their own deploy. What is worth pinning is
 * the relationship between the three lists, which holds at any size.
 */
test('the bundle lists stay consistent with each other', () => {
  const all = bundles;
  const active = activeBundles();
  const sellable = sellableBundles();

  // Each is a subset of the one before it.
  assert.ok(active.every((b) => all.includes(b)));
  assert.ok(sellable.every((b) => active.includes(b)));

  // Active means exactly that, and sellable additionally means everything
  // inside is on sale.
  assert.ok(active.every((b) => b.status === 'active'));
  assert.ok(sellable.every((b) => isBundleSellable(b)));

  // Featured is a subset again, and every one of them is sellable — a hidden
  // bundle must not reach the slideshow just because the box is ticked.
  assert.ok(featuredBundles().every((b) => sellable.includes(b) && b.featured));
});

test('featured bundles come first, and the rest keep their order', () => {
  for (const list of [activeBundles(), sellableBundles()]) {
    const flags = list.map((b) => Boolean(b.featured));
    // Once an unfeatured bundle appears, no featured one may follow it.
    for (let i = 1; i < flags.length; i++) {
      assert.ok(!(flags[i] && !flags[i - 1]), `featured bundle behind an unfeatured one at ${i}`);
    }
  }

  // The relative order of two bundles that share a flag is the file's, not the
  // sort's. Built here rather than read from bundles.json so the assertion
  // holds whatever the shop happens to be selling today.
  const list = [
    { ...(good() as unknown as Bundle), slug: 'plain-one' },
    { ...(good() as unknown as Bundle), slug: 'starred', featured: true },
    { ...(good() as unknown as Bundle), slug: 'plain-two' },
    { ...(good() as unknown as Bundle), slug: 'starred-too', featured: true },
  ];
  assert.deepEqual(
    featuredFirst(list).map((b) => b.slug),
    ['starred', 'starred-too', 'plain-one', 'plain-two'],
  );

  // And it does not reorder the caller's array underneath them.
  assert.equal(list[0].slug, 'plain-one');
});

test('a well-formed bundle passes', () => {
  assert.deepEqual(validateBundles([good()]), []);
});

test('a bundle containing a product that does not exist is caught', () => {
  const b = good();
  (b.items as unknown[])[0] = { slug: 'not-a-product', quantity: 1 };
  assert.ok(validateBundles([b]).some((m) => m.includes('not an existing product')));
});

test('a bundle containing an unavailable product is caught', () => {
  const b = good();
  // imulormed is real but under registration, so it cannot be sold.
  (b.items as unknown[])[0] = { slug: 'imulormed', quantity: 1 };
  assert.ok(validateBundles([b]).some((m) => m.includes('not available to buy')));
});

test('a "was" price at or below the price is caught', () => {
  for (const compareAtPrice of [240, 200]) {
    const b = good();
    b.compareAtPrice = compareAtPrice;
    assert.ok(
      validateBundles([b]).some((m) => m.includes('not above the price')),
      String(compareAtPrice),
    );
  }
});

test('omitting the "was" price entirely is fine', () => {
  const b = good();
  delete b.compareAtPrice;
  assert.deepEqual(validateBundles([b]), []);
});

test('an empty bundle is caught', () => {
  const b = good();
  b.items = [];
  assert.ok(validateBundles([b]).some((m) => m.includes('at least one product')));
});

test('the same product listed twice is caught', () => {
  const b = good();
  b.items = [
    { slug: 'ivylor', quantity: 1 },
    { slug: 'ivylor', quantity: 2 },
  ];
  assert.ok(validateBundles([b]).some((m) => m.includes('listed twice')));
});

test('a fractional or zero quantity is caught', () => {
  for (const quantity of [0, -1, 1.5, '2']) {
    const b = good();
    b.items = [{ slug: 'ivylor', quantity }];
    assert.ok(validateBundles([b]).some((m) => m.includes('quantity')), String(quantity));
  }
});

test('duplicate bundle slugs are caught', () => {
  assert.ok(validateBundles([good(), good()]).some((m) => m.includes('duplicate slug')));
});

test('a missing Arabic name is caught', () => {
  const b = good();
  (b.name as Record<string, string>).ar = '';
  assert.ok(validateBundles([b]).some((m) => m.includes('name.ar')));
});

test('all problems are reported at once', () => {
  const b = good();
  b.price = 'free';
  b.status = 'nonsense';
  (b.name as Record<string, string>).ar = '';
  assert.ok(validateBundles([b]).length >= 3);
});

test('saving is the difference, and zero when no "was" price is set', () => {
  const b = good() as unknown as Bundle;
  assert.equal(bundleSaving(b), 25);
  const noCompare = { ...b, compareAtPrice: undefined };
  assert.equal(bundleSaving(noCompare), 0);
});

test('contentsTotal adds up the real product prices', () => {
  const b = good() as unknown as Bundle;
  // Ivylor 80 + Vitelormed 185. Read from the catalogue, not hard-coded twice.
  assert.equal(contentsTotal(b), 265);
});

test('a bundle is only sellable when active and everything in it is available', () => {
  const b = good() as unknown as Bundle;
  assert.equal(isBundleSellable(b), true);
  assert.equal(isBundleSellable({ ...b, status: 'hidden' }), false);
  assert.equal(
    isBundleSellable({ ...b, items: [{ slug: 'imulormed', quantity: 1 }] }),
    false,
  );
});
