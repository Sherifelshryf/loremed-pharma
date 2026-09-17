import assert from 'node:assert/strict';
import test from 'node:test';
import { sanitiseProducts, sanitiseBundles } from '../src/content/sanitise';
import { aProduct, aBundle, CATEGORIES, STATUSES, ACCENTS, BUNDLE_STATUSES } from './fixtures';

/**
 * Everything here works on synthetic content. Using the real catalogue as a
 * fixture would put the tests back in the business of failing when the content
 * is imperfect — which is the exact thing the sanitiser exists to stop.
 */
const clean = (raw: unknown) => sanitiseProducts(raw, CATEGORIES, STATUSES, ACCENTS);
const product = aProduct;
const bundle = aBundle;

const KNOWN = new Set(['test-syrup', 'other-syrup']);
const cleanB = (raw: unknown) => sanitiseBundles(raw, KNOWN, BUNDLE_STATUSES);

/* ------------------------------------------------------------------ products */

test('well-formed content passes through untouched', () => {
  const list = [aProduct(), aProduct({ slug: 'other-syrup' })];
  const { products, outcome } = clean(list);
  assert.equal(products.length, 2);
  assert.deepEqual(outcome.skipped, []);
  assert.deepEqual(outcome.repaired, []);
});

test('one unusable product is dropped and the rest still publish', () => {
  const broken = product();
  broken.slug = 'NOT A SLUG';
  const good = [aProduct(), aProduct({ slug: 'other-syrup' }), aProduct({ slug: 'third' })];
  const { products, outcome } = clean([broken, ...good]);
  assert.equal(products.length, good.length, 'the good ones all survived');
  assert.equal(outcome.skipped.length, 1);
  assert.match(outcome.skipped[0], /slug/);
});

test('each thing that makes a product undrawable drops only that product', () => {
  const cases: [string, (p: Record<string, unknown>) => void][] = [
    ['no slug', (p) => delete p.slug],
    ['slug with spaces', (p) => { p.slug = 'smart od'; }],
    ['no name at all', (p) => { p.name = { en: '', ar: '' }; }],
    ['price as text', (p) => { p.price = 'free'; }],
    ['price missing', (p) => delete p.price],
    ['unknown category', (p) => { p.category = 'nonsense'; }],
    ['not an object', () => {}],
  ];
  for (const [label, mutate] of cases) {
    const bad = label === 'not an object' ? ('nope' as unknown) : product();
    if (typeof bad === 'object') mutate(bad as Record<string, unknown>);
    const { products, outcome } = clean([bad, aProduct({ slug: 'survivor' })]);
    assert.equal(products.length, 1, label);
    assert.equal(outcome.skipped.length, 1, label);
  }
});

test('a duplicate slug drops the second one, never the first', () => {
  const { products, outcome } = clean([aProduct({ price: 80 }), aProduct({ price: 999 })]);
  assert.equal(products.length, 1);
  assert.equal(products[0].price, 80);
  assert.match(outcome.skipped[0], /already exists/);
});

test('a recoverable mistake is repaired rather than dropped', () => {
  const p = product();
  p.status = 'on-sale-ish';
  p.accent = 'turquoise';
  const { products, outcome } = clean([p]);
  assert.equal(products.length, 1, 'still published');
  assert.equal(products[0].status, 'under-registration', 'unknown status is the cautious one');
  assert.equal(products[0].accent, 'purple');
  // Both repairs are named. Not asserting a count: this product's `related`
  // links also get dropped here, because it is the only product in the list.
  assert.ok(outcome.repaired.some((r) => r.includes('status')));
  assert.ok(outcome.repaired.some((r) => r.includes('card colour')));
  assert.deepEqual(outcome.skipped, [], 'still on sale');
});

test('a related link to a product that was dropped is removed, not left dangling', () => {
  const a = aProduct({ slug: 'alpha', related: ['beta', 'ghost'] });
  const b = aProduct({ slug: 'beta', related: [] });
  const { products, outcome } = clean([a, b]);
  assert.deepEqual(products[0].related, ['beta']);
  assert.ok(outcome.repaired.some((r) => r.includes('related-product')));
});

test('a missing Arabic translation does NOT remove a product from sale', () => {
  const p = product();
  (p.name as Record<string, string>).ar = '';
  (p.description as Record<string, string>).ar = '';
  const { products, outcome } = clean([p]);
  assert.equal(products.length, 1);
  assert.deepEqual(outcome.skipped, []);
});

/* ------------------------------------------------------------------- bundles */

test('an empty bundles list is fine and reports nothing', () => {
  const { bundles, outcome } = cleanB([]);
  assert.deepEqual(bundles, []);
  assert.deepEqual(outcome.skipped, []);
});

test('the slug mistake that stopped two deploys now drops one line, not the deploy', () => {
  const b = bundle();
  b.items = [{ slug: 'SMARTOD D', quantity: 3 }, { slug: 'test-syrup', quantity: 1 }];
  const { bundles, outcome } = cleanB([b]);
  assert.equal(bundles.length, 1, 'the bundle still publishes');
  assert.deepEqual(bundles[0].items, [{ slug: 'test-syrup', quantity: 1 }]);
  assert.ok(outcome.repaired.some((r) => r.includes('SMARTOD D')));
});

test('a bundle whose every line is wrong is skipped, and the rest publish', () => {
  const bad = aBundle({ slug: 'all-wrong', items: [{ slug: 'SMARTOD D', quantity: 1 }] });
  const { bundles, outcome } = cleanB([bad, aBundle()]);
  assert.equal(bundles.length, 1);
  assert.equal(bundles[0].slug, 'test-pack');
  assert.ok(outcome.skipped.some((s) => s.includes('nothing to sell')));
});

test('a "was" price below the price loses the badge instead of the deploy', () => {
  for (const was of [140, 100, 'free', null]) {
    const b = bundle();
    b.compareAtPrice = was;
    const { bundles, outcome } = cleanB([b]);
    assert.equal(bundles.length, 1, String(was));
    assert.equal(bundles[0].compareAtPrice, undefined, String(was));
    if (was !== null) assert.ok(outcome.repaired.length > 0, String(was));
  }
});

test('a good "was" price is kept', () => {
  const { bundles } = cleanB([bundle()]);
  assert.equal(bundles[0].compareAtPrice, 160);
});

test('an unrecognised status hides the bundle rather than dropping it', () => {
  const b = bundle();
  b.status = 'live!';
  const { bundles, outcome } = cleanB([b]);
  assert.equal(bundles[0].status, 'hidden');
  assert.ok(outcome.repaired.some((r) => r.includes('status')));
});

test('a nonsense quantity becomes one', () => {
  for (const q of [0, -3, 1.5, 'two', undefined]) {
    const b = bundle();
    b.items = [{ slug: 'test-syrup', quantity: q }];
    const { bundles } = cleanB([b]);
    assert.equal((bundles[0].items as { quantity: number }[])[0].quantity, 1, String(q));
  }
});

test('an unusable photo path falls back to the products instead of failing', () => {
  const b = bundle();
  b.image = 'media/no-leading-slash.png';
  const { bundles, outcome } = cleanB([b]);
  assert.equal(bundles[0].image, undefined);
  assert.ok(outcome.repaired.some((r) => r.includes('photo')));
});

test('duplicate bundle slugs keep the first', () => {
  const { bundles, outcome } = cleanB([aBundle({ price: 140 }), aBundle({ price: 1 })]);
  assert.equal(bundles.length, 1);
  assert.equal(bundles[0].price, 140);
  assert.ok(outcome.skipped.some((s) => s.includes('already exists')));
});

test('a file that is not a list at all does not throw', () => {
  assert.doesNotThrow(() => cleanB('nonsense'));
  assert.doesNotThrow(() => clean('nonsense'));
  assert.equal(clean('nonsense').products.length, 0);
});
