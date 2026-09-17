/**
 * Synthetic content for the tests to work on.
 *
 * Deliberately not cloned from products.json. Tests that use the real content
 * as a fixture fail whenever the real content is imperfect — and those tests
 * run in the deploy, so a mistyped field in the CMS would stop the site
 * updating again, by a longer route than before. The whole point of the
 * sanitiser is that content cannot do that, so the tests covering it must not
 * depend on the content either.
 *
 * The only thing any test should assert about the real files is that whatever
 * survived sanitising is sound, which holds however bad the input was.
 */

const bi = (en: string, ar: string) => ({ en, ar });

export const aProduct = (over: Record<string, unknown> = {}): Record<string, unknown> => ({
  slug: 'test-syrup',
  name: bi('Test Syrup', 'شراب تجريبي'),
  tagline: bi('A tagline', 'سطر تعريفي'),
  category: 'respiratory-care',
  status: 'available',
  form: bi('Syrup', 'شراب'),
  ageGroup: bi('Adults', 'الكبار'),
  pack: bi('120 ml', '120 مل'),
  accent: 'purple',
  shortDescription: bi('Short.', 'قصير.'),
  description: bi('Longer description.', 'وصف أطول.'),
  keyIngredients: [{ name: bi('Ivy', 'لبلاب'), note: bi('38 mg', '38 مجم') }],
  benefits: [bi('Helps', 'بيساعد')],
  usage: bi('5 ml twice daily.', '5 مل مرتين يوميًا.'),
  related: [],
  price: 80,
  ...over,
});

export const aBundle = (over: Record<string, unknown> = {}): Record<string, unknown> => ({
  slug: 'test-pack',
  name: bi('Test Pack', 'باقة تجريبية'),
  tagline: bi('Two together', 'اتنين مع بعض'),
  description: bi('A pack.', 'باقة.'),
  items: [{ slug: 'test-syrup', quantity: 1 }],
  price: 140,
  compareAtPrice: 160,
  status: 'active',
  ...over,
});

export const CATEGORIES = [
  'respiratory-care',
  'kids-health',
  'vitamins-minerals',
  'immune-support',
  'omega-brain',
  'dermatology',
];
export const STATUSES = ['available', 'under-registration'];
export const ACCENTS = ['purple', 'orange'];
export const BUNDLE_STATUSES = ['active', 'hidden'];
