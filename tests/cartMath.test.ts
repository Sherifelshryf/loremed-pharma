import { test } from 'node:test';
import assert from 'node:assert/strict';
import { clampQuantity, computeOrderTotal, sanitizeCartItems, MAX_QUANTITY } from '../src/cart/cartMath';

test('clampQuantity keeps a normal quantity as-is', () => {
  assert.equal(clampQuantity(3), 3);
});

test('clampQuantity floors below 1 up to 1', () => {
  assert.equal(clampQuantity(0), 1);
  assert.equal(clampQuantity(-5), 1);
});

test('clampQuantity caps above MAX_QUANTITY', () => {
  assert.equal(clampQuantity(150), MAX_QUANTITY);
});

test('clampQuantity truncates fractional input', () => {
  assert.equal(clampQuantity(2.9), 2);
});

test('sanitizeCartItems keeps well-formed entries', () => {
  const result = sanitizeCartItems([
    { slug: 'ivylor', quantity: 2 },
    { slug: 'smartod-d', quantity: 1 },
  ]);
  assert.deepEqual(result, [
    { slug: 'ivylor', quantity: 2 },
    { slug: 'smartod-d', quantity: 1 },
  ]);
});

test('sanitizeCartItems drops entries with a non-string slug', () => {
  const result = sanitizeCartItems([{ slug: 42, quantity: 1 }]);
  assert.deepEqual(result, []);
});

test('sanitizeCartItems drops entries with a negative, fractional or NaN quantity', () => {
  const result = sanitizeCartItems([
    { slug: 'a', quantity: -1 },
    { slug: 'b', quantity: 1.5 },
    { slug: 'c', quantity: Number.NaN },
    { slug: 'd', quantity: 0 },
  ]);
  assert.deepEqual(result, []);
});

test('sanitizeCartItems drops entries with a string quantity', () => {
  const result = sanitizeCartItems([{ slug: 'a', quantity: '3' }]);
  assert.deepEqual(result, []);
});

test('sanitizeCartItems clamps a surviving entry above MAX_QUANTITY', () => {
  const result = sanitizeCartItems([{ slug: 'a', quantity: 500 }]);
  assert.deepEqual(result, [{ slug: 'a', quantity: MAX_QUANTITY }]);
});

test('sanitizeCartItems returns an empty array for non-array input', () => {
  assert.deepEqual(sanitizeCartItems(null), []);
  assert.deepEqual(sanitizeCartItems('not an array'), []);
  assert.deepEqual(sanitizeCartItems({ slug: 'a', quantity: 1 }), []);
});

test('computeOrderTotal adds delivery only when there is a subtotal', () => {
  assert.equal(computeOrderTotal(0, 30), 0);
  assert.equal(computeOrderTotal(200, 30), 230);
});
