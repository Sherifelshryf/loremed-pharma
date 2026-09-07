import assert from 'node:assert/strict';
import test from 'node:test';
import { GOAT, isGoatQuery } from '../src/lib/easterEgg';

test('the three names, typed in full, are goats', () => {
  for (const name of ['sherif', 'youssef', 'ahmed']) {
    assert.equal(isGoatQuery(name), true, name);
  }
});

test('casing, surrounding space and stray punctuation still count', () => {
  for (const q of ['Sherif', 'SHERIF', '  ahmed  ', 'Youssef!', 'ahmed?']) {
    assert.equal(isGoatQuery(q), true, q);
  }
});

test('a partial name is not a goat — the name has to be written out', () => {
  for (const q of ['sher', 'she', 'yous', 'ahm', 'a', 'ahme']) {
    assert.equal(isGoatQuery(q), false, q);
  }
});

test('a name with anything extra on it is not a goat', () => {
  for (const q of ['sherifa', 'sherif ali', 'mohamed ahmed', 'ahmeds', 'xyoussef']) {
    assert.equal(isGoatQuery(q), false, q);
  }
});

test('an empty or blank query is never a goat', () => {
  for (const q of ['', '   ', '!!!']) {
    assert.equal(isGoatQuery(q), false, JSON.stringify(q));
  }
});

test('real product searches are untouched', () => {
  for (const q of ['ivylor', 'omega', 'زنك', 'smartod d']) {
    assert.equal(isGoatQuery(q), false, q);
  }
});

test('the reply is the same in both languages', () => {
  assert.equal(GOAT, 'Goat');
});
