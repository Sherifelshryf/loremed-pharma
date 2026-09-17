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
import { getProduct, products } from '../src/content/products';

/**
 * Products chosen at run time, not written in.
 *
 * These tests exercise functions that read the live catalogue, so naming
 * "ivylor" and its price of 80 tied them to content an editor can change. A
 * routine price change in the CMS failed `contentsTotal adds up the real
 * product prices` — and these run in the deploy, so a price change would have
 * stopped the site updating. Deriving the fixture from whatever is in the
 * catalogue keeps the assertions true at any prices, under any names.
 */
const onSale = products.filter((p) => p.status === 'available');
const [FIRST, SECOND] = onSale;
const CONTENTS_TOTAL = FIRST.price + SECOND.price;
/** A product that exists but cannot be sold; there may not be one. */
const NOT_FOR_SALE = products.find((p) => p.status !== 'available');

/** A valid bundle built from two products that really exist and are available. */
const good = (): Record<string, unknown> => ({
  slug: 'immunity-pack',
  name: { en: 'Immunity Pack', ar: 'باقة المناعة' },
  tagline: { en: 'Two ways to stay well', ar: 'طريقتين تفضل بيهم بصحة' },
  description: { en: 'Ivylor and Vitelormed together.', ar: 'إيفيلور وفيتيلورميد مع بعض.' },
  items: [
    { slug: FIRST.slug, quantity: 1 },
    { slug: SECOND.slug, quantity: 1 },
  ],
  // Priced against the real contents, so the "was" price is always above the
  // price whatever those products happen to cost today.
  price: CONTENTS_TOTAL - 10,
  compareAtPrice: CONTENTS_TOTAL,
  status: 'active',
});

/**
 * Same reasoning as the catalogue test: what ships has to be sound, not
 * perfect. A bad bundle is skipped on the way in and reported after the deploy
 * rather than stopping it.
 */
test('the bundles the site renders are sound', () => {
  for (const b of bundles) {
    assert.ok(/^[a-z0-9-]+$/.test(b.slug), `bad slug reached the site: ${b.slug}`);
    assert.ok(Number.isFinite(b.price) && b.price >= 0);
    assert.ok(b.items.length > 0, `empty bundle reached the site: ${b.slug}`);
    // Every line is a real product, so no card can render a blank row.
    for (const i of b.items) assert.ok(getProduct(i.slug), `${b.slug} -> ${i.slug}`);
    // A "was" price, if shown at all, is above the price.
    if (b.compareAtPrice !== undefined) assert.ok(b.compareAtPrice > b.price, b.slug);
  }
  assert.equal(new Set(bundles.map((b) => b.slug)).size, bundles.length);
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

test('a bundle containing an unavailable product is caught', (t) => {
  if (!NOT_FOR_SALE) return t.skip('every product is currently on sale');
  const b = good();
  (b.items as unknown[])[0] = { slug: NOT_FOR_SALE.slug, quantity: 1 };
  assert.ok(validateBundles([b]).some((m) => m.includes('not available to buy')));
});

test('a "was" price at or below the price is caught', () => {
  for (const compareAtPrice of [CONTENTS_TOTAL - 10, CONTENTS_TOTAL - 50]) {
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

/**
 * Clearing a field at /admin does not remove it from the JSON — the CMS writes
 * back the empty control, so a removed photo arrives as `""` and a cleared
 * number can arrive as `null`.
 *
 * This is not a hypothetical. Removing a bundle's photo wrote `"image": ""`,
 * the validator called it invalid, `npm test` failed, the deploy refused to
 * upload — and so the photo stayed on the live site, with nothing to tell the
 * person who removed it why. Every one of these cases has to pass.
 */
test('a field cleared in the CMS reads as unset, not as invalid', () => {
  for (const [field, cleared] of [
    ['image', ''],
    ['image', null],
    ['compareAtPrice', null],
    ['compareAtPrice', ''],
    ['featured', null],
  ] as const) {
    const b = good();
    b[field] = cleared;
    assert.deepEqual(validateBundles([b]), [], `${field} = ${JSON.stringify(cleared)}`);
  }
});

test('a genuinely wrong photo path is still caught', () => {
  const b = good();
  b.image = 'media/not-a-path.jpg';
  assert.ok(validateBundles([b]).some((m) => m.includes('image')));
});

test('an empty bundle is caught', () => {
  const b = good();
  b.items = [];
  assert.ok(validateBundles([b]).some((m) => m.includes('at least one product')));
});

test('the same product listed twice is caught', () => {
  const b = good();
  b.items = [
    { slug: FIRST.slug, quantity: 1 },
    { slug: FIRST.slug, quantity: 2 },
  ];
  assert.ok(validateBundles([b]).some((m) => m.includes('listed twice')));
});

test('a fractional or zero quantity is caught', () => {
  for (const quantity of [0, -1, 1.5, '2']) {
    const b = good();
    b.items = [{ slug: FIRST.slug, quantity }];
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
  assert.equal(bundleSaving(b), 10);
  const noCompare = { ...b, compareAtPrice: undefined };
  assert.equal(bundleSaving(noCompare), 0);
});

test('contentsTotal adds up the real product prices', () => {
  const b = good() as unknown as Bundle;
  // Derived from the catalogue rather than written in: a price change at
  // /admin must not be able to fail this.
  assert.equal(contentsTotal(b), CONTENTS_TOTAL);
});

test('a bundle is only sellable when active and everything in it is available', () => {
  const b = good() as unknown as Bundle;
  assert.equal(isBundleSellable(b), true);
  assert.equal(isBundleSellable({ ...b, status: 'hidden' }), false);
  // A slug that is not a product at all can never be sellable, whatever the
  // catalogue looks like.
  assert.equal(isBundleSellable({ ...b, items: [{ slug: 'not-a-product', quantity: 1 }] }), false);
  if (NOT_FOR_SALE) {
    assert.equal(
      isBundleSellable({ ...b, items: [{ slug: NOT_FOR_SALE.slug, quantity: 1 }] }),
      false,
    );
  }
});
