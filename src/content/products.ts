/**
 * Loremed product catalogue.
 *
 * Every customer-facing field is bilingual. Medical and regulatory copy —
 * ingredients, dosing, indications — is translated too, so an Arabic-speaking
 * shopper reads the whole product in Arabic rather than hitting English
 * halfway down the page. Product names are transliterated so only the selected
 * language ever appears on screen.
 *
 * The Arabic medical copy is a faithful rendering of the English, which itself
 * comes from the product brochures. It should still be signed off by whoever
 * owns regulatory copy before it is treated as label-equivalent.
 */

import type { Bi } from '@/i18n/dictionaries';
import productsData from './products.json';

export type ProductStatus = 'available' | 'under-registration';

export type ProductCategory =
  | 'immune-support'
  | 'respiratory-care'
  | 'vitamins-minerals'
  | 'kids-health'
  | 'omega-brain'
  | 'dermatology';

export type Product = {
  slug: string;
  name: Bi;
  tagline: Bi;
  category: ProductCategory;
  /**
   * Extra categories this product should also surface under when filtering.
   * `category` stays the single one shown on cards and detail pages; these only
   * widen the catalogue filter, for products that genuinely belong in more than
   * one place (e.g. a children's syrup whose actives are omega-3).
   */
  secondaryCategories?: ProductCategory[];
  status: ProductStatus;
  form: Bi;
  ageGroup: Bi;
  pack: Bi;
  accent: 'purple' | 'orange';
  shortDescription: Bi;
  description: Bi;
  keyIngredients: { name: Bi; note: Bi }[];
  benefits: Bi[];
  usage: Bi;
  related: string[];
  featured?: boolean;
  image?: string;
  /** Price in EGP. */
  price: number;
  /** YouTube video ID (the part after watch?v=). */
  youtubeId?: string;
};

export const categories: {
  id: ProductCategory;
  label: Bi;
  /** Plain-language line telling a shopper what the group is for. */
  description: Bi;
}[] = [
  {
    id: 'respiratory-care',
    label: { en: 'Cough & Chest', ar: 'الكحة والصدر' },
    description: {
      en: 'For coughs, colds and blocked chests.',
      ar: 'للكحة ونزلات البرد واحتقان الصدر.',
    },
  },
  {
    id: 'kids-health',
    label: { en: 'For Children', ar: 'للأطفال' },
    description: {
      en: 'Gentle, good-tasting formulas made for children.',
      ar: 'تركيبات لطيفة وطعمها حلو، متعملة مخصوص للأطفال.',
    },
  },
  {
    id: 'vitamins-minerals',
    label: { en: 'Vitamins & Minerals', ar: 'الفيتامينات والمعادن' },
    description: {
      en: 'Daily vitamins, iron and vitamin D.',
      ar: 'فيتامينات يومية وحديد وفيتامين د.',
    },
  },
  {
    id: 'immune-support',
    label: { en: 'Immunity', ar: 'المناعة' },
    description: {
      en: 'Helps the body defend itself.',
      ar: 'بيساعد الجسم يدافع عن نفسه.',
    },
  },
  {
    id: 'omega-brain',
    label: { en: 'Omega-3 & Focus', ar: 'أوميغا-3 والتركيز' },
    description: {
      en: 'Omega-3 for brain, focus and growth.',
      ar: 'أوميغا-3 لصحة المخ والتركيز والنمو.',
    },
  },
  {
    id: 'dermatology',
    label: { en: 'Skin Care', ar: 'العناية بالبشرة' },
    description: {
      en: 'Lotions that soothe and soften the skin.',
      ar: 'لوشن بيهدّي البشرة وبينعّمها.',
    },
  },
];

export const statusLabels: Record<ProductStatus, Bi> = {
  available: { en: 'Available Now', ar: 'متوفر الآن' },
  'under-registration': { en: 'Coming Soon', ar: 'قريبًا' },
};

/**
 * The catalogue itself lives in `products.json` so it can be edited through the
 * CMS at /admin without touching code. Everything above — the category IDs, the
 * status values, the `Product` shape — stays here, because those are structural:
 * `ProductCategory` is a union type the compiler enforces, and each ID is also
 * a key in `categoryIcons`. Adding a category is a code change; adding a
 * product is not.
 *
 * Importing JSON widens the literal types (`accent` becomes `string`, not
 * `'purple' | 'orange'`), so the cast below is the boundary where static
 * checking stops. `validateProducts` in `productsSchema.ts` is what actually
 * guarantees the shape, and `npm test` runs it — including in the deploy
 * workflow, so a malformed CMS write fails there rather than on the live site.
 */
export const products = productsData as unknown as Product[];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCategory(id: ProductCategory) {
  return categories.find((c) => c.id === id);
}

/**
 * Strip everything except letters and digits so punctuation and spacing stop
 * mattering. Ingredient names are written with hyphens ("Omega-3"), but people
 * type "omega 3" or "omega3" — all three have to find the same products.
 * Arabic letters are preserved so the AR side keeps working.
 */
export function normalizeSearch(value: string) {
  return value.toLowerCase().replace(/[^\p{Letter}\p{Number}]+/gu, '');
}

/**
 * Everything a product should be findable by, in *both* languages — an Arabic
 * shopper searching "لبلاب" and an English one searching "ivy" must both land on
 * the same product, whichever language the site is currently showing.
 */
export function productSearchText(p: Product) {
  const both = (b: Bi) => `${b.en} ${b.ar}`;
  return [
    both(p.name),
    both(p.tagline),
    both(p.form),
    both(p.shortDescription),
    both(p.description),
    ...p.keyIngredients.flatMap((k) => [both(k.name), both(k.note)]),
    ...p.benefits.map(both),
  ].join(' ');
}
