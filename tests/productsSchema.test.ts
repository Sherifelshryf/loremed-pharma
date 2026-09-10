import assert from 'node:assert/strict';
import test from 'node:test';
import { validateProducts } from '../src/content/productsSchema';
import { products } from '../src/content/products';
import raw from '../src/content/products.json';

/** A known-good product, cloned per test so mutations don't leak between them. */
const good = () => JSON.parse(JSON.stringify(raw[0]));

test('the real catalogue is valid', () => {
  assert.deepEqual(validateProducts(raw), []);
});

test('every product survives the cast into Product[]', () => {
  assert.equal(products.length, raw.length);
  assert.ok(products.length >= 10);
  for (const p of products) {
    assert.equal(typeof p.slug, 'string');
    assert.equal(typeof p.price, 'number');
    assert.equal(typeof p.name.ar, 'string');
  }
});

test('an empty catalogue is rejected', () => {
  assert.deepEqual(validateProducts([]), ['top level: no products — the catalogue would be empty']);
  assert.equal(validateProducts({} as unknown).length, 1);
});

test('a missing Arabic translation is caught', () => {
  const p = good();
  p.description.ar = '';
  const problems = validateProducts([p]);
  assert.ok(problems.some((m) => m.includes('description.ar')), problems.join(' | '));
});

test('a price typed as text is caught', () => {
  const p = good();
  p.price = '80';
  assert.ok(validateProducts([p]).some((m) => m.includes('.price')));
});

test('an unknown category is caught', () => {
  const p = good();
  p.category = 'cough-and-chest';
  assert.ok(validateProducts([p]).some((m) => m.includes('.category')));
});

test('duplicate slugs are caught', () => {
  const a = good();
  const b = good();
  const problems = validateProducts([a, b]);
  assert.ok(problems.some((m) => m.includes('duplicate slug')), problems.join(' | '));
});

test('a related product that no longer exists is caught', () => {
  const p = good();
  p.related = ['a-deleted-product'];
  const problems = validateProducts([p]);
  assert.ok(problems.some((m) => m.includes('a-deleted-product')), problems.join(' | '));
});

test('an ingredient missing its note is caught', () => {
  const p = good();
  delete p.keyIngredients[0].note;
  assert.ok(validateProducts([p]).some((m) => m.includes('keyIngredients[0].note')));
});

test('a slug with spaces or capitals is caught', () => {
  for (const slug of ['Ivy Lor', 'IVYLOR', 'ivy_lor']) {
    const p = good();
    p.slug = slug;
    p.related = [];
    assert.ok(validateProducts([p]).some((m) => m.includes('a-z, 0-9')), slug);
  }
});

test('all problems are reported at once, not just the first', () => {
  const p = good();
  p.price = 'free';
  p.category = 'nonsense';
  p.name.ar = '';
  assert.ok(validateProducts([p]).length >= 3);
});

/**
 * The same trap that broke a deploy on the bundles side: clearing a field at
 * /admin leaves it in the JSON as `""` or `null` rather than removing it, and
 * the validator has to read that as "unset" — the storefront already does.
 */
test('a field cleared in the CMS reads as unset, not as invalid', () => {
  const cases: Array<[string, unknown]> = [
    ['image', ''],
    ['image', null],
    ['youtubeId', ''],
    ['youtubeId', null],
    ['featured', null],
    ['secondaryCategories', null],
    ['related', null],
  ];
  for (const [field, cleared] of cases) {
    const p = good();
    p.related = [];
    p[field] = cleared;
    assert.deepEqual(
      validateProducts([p]),
      [],
      `${field} = ${JSON.stringify(cleared)}`,
    );
  }
});

test('a genuinely wrong photo path is still caught', () => {
  const p = good();
  p.related = [];
  p.image = 'media/missing-leading-slash.webp';
  assert.ok(validateProducts([p]).some((m) => m.includes('image')));
});
