/**
 * Loremed product catalogue.
 * Product names and categories are taken from the real Loremed range;
 * formulations are described in line with each product's active ingredient.
 * CMS-ready: every field maps cleanly to a headless schema.
 *
 * Note: product-specific fields below (name, tagline, description,
 * keyIngredients, benefits, usage, ageGroup, pack, form) are medical/
 * regulatory content and are intentionally kept English-only. Category
 * taxonomy and status labels are UI chrome and are bilingual.
 */

import type { Bi } from '@/i18n/dictionaries';

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
  name: string;
  tagline: string;
  category: ProductCategory;
  /**
   * Extra categories this product should also surface under when filtering.
   * `category` stays the single one shown on cards and detail pages; these only
   * widen the catalogue filter, for products that genuinely belong in more than
   * one place (e.g. a children's syrup whose actives are omega-3).
   */
  secondaryCategories?: ProductCategory[];
  status: ProductStatus;
  form: string;
  ageGroup: string;
  pack: string;
  accent: 'purple' | 'orange';
  shortDescription: string;
  description: string;
  keyIngredients: { name: string; note: string }[];
  benefits: string[];
  usage: string;
  related: string[];
  featured?: boolean;
  image?: string;
  /** Price in EGP. Placeholder pricing — update with real prices before launch. */
  price: number;
  /** YouTube video ID (the part after watch?v=). When set, an embedded player
   *  is shown on the product detail page. */
  youtubeId?: string;
};

export const categories: {
  id: ProductCategory;
  label: Bi;
  description: Bi;
}[] = [
  {
    id: 'immune-support',
    label: { en: 'Immune Support', ar: 'دعم المناعة' },
    description: {
      en: 'Elderberry & zinc formulas that help the body defend itself.',
      ar: 'تركيبات بالبلسان والزنك تساعد الجسم على الدفاع عن نفسه.',
    },
  },
  {
    id: 'respiratory-care',
    label: { en: 'Respiratory Care', ar: 'رعاية الجهاز التنفسي' },
    description: {
      en: 'Ivy leaf and botanical syrups that soothe coughs and support clear airways.',
      ar: 'شرابات بأوراق اللبلاب ومستخلصات نباتية تُهدئ السعال وتدعم صفاء المجاري التنفسية.',
    },
  },
  {
    id: 'vitamins-minerals',
    label: { en: 'Vitamins & Minerals', ar: 'الفيتامينات والمعادن' },
    description: {
      en: 'Everyday essential nutrition — from daily multivitamins to targeted iron support.',
      ar: 'تغذية أساسية يومية — من الفيتامينات المتعددة اليومية إلى دعم الحديد الموجَّه.',
    },
  },
  {
    id: 'kids-health',
    label: { en: 'Kids Health', ar: 'صحة الأطفال' },
    description: {
      en: 'Gentle, great-tasting formulas designed around the needs of growing children.',
      ar: 'تركيبات لطيفة ولذيذة الطعم مصمَّمة حول احتياجات الأطفال في مرحلة النمو.',
    },
  },
  {
    id: 'omega-brain',
    label: { en: 'Omega & Brain Health', ar: 'أوميغا وصحة الدماغ' },
    description: {
      en: 'High-purity omega-3 concentrates for heart, brain and vision.',
      ar: 'مركزات أوميغا-3 عالية النقاء لصحة القلب والدماغ والبصر.',
    },
  },
  {
    id: 'dermatology',
    label: { en: 'Dermatology & Skin', ar: 'الأمراض الجلدية والبشرة' },
    description: {
      en: 'Dermatologically-guided lotions that protect and restore the skin barrier.',
      ar: 'لوشن موجَّه جلديًا يحمي حاجز البشرة ويُعيد بناءه.',
    },
  },
];

export const statusLabels: Record<ProductStatus, Bi> = {
  available: { en: 'Available Now', ar: 'متوفر الآن' },
  'under-registration': { en: 'Under Registration', ar: 'قيد التسجيل' },
};

export const products: Product[] = [
  {
    slug: 'imulormed',
    name: 'Imulormed',
    tagline: 'Everyday immune resilience',
    category: 'immune-support',
    status: 'under-registration',
    form: 'Oral drops',
    ageGroup: 'Infants & children 3 months – 5 years',
    pack: 'Dropper bottle with measuring guide',
    accent: 'orange',
    image: '/media/Imulormed.jpg',
    price: 180,
    shortDescription:
      'A botanical immune formula combining elderberry extract with vitamin C, zinc, folic acid and vitamin B12.',
    description:
      'Imulormed brings together elderberry extract — one of nature’s most trusted immune botanicals — reinforced with vitamin C, zinc, folic acid and vitamin B12. The formula is designed to support the body’s natural defences from infancy, offering a gentle daily ritual that’s easy to add to juice or water.',
    keyIngredients: [
      { name: 'Elderberry Extract', note: 'Traditional immunostimulant botanical' },
      { name: 'Vitamin C', note: 'Contributes to normal immune function' },
      { name: 'Zinc', note: 'Supports the immune system' },
      { name: 'Folic Acid', note: 'Supports normal development' },
      { name: 'Vitamin B12', note: 'Supports normal immune function' },
    ],
    benefits: [
      'Supports the normal function of the immune system',
      'Antioxidant protection from elderberry extract',
      'Simple dosing — added to juice or water',
      'Suitable from 3 months of age',
    ],
    usage:
      'Infants & children 3 months – 1 year: 1 ml once daily, added to juice or water. Children 1–5 years: 1 ml twice daily.',
    related: ['vitelormed', 'ivylor', 'smartod'],
  },
  {
    slug: 'ivylor',
    youtubeId: 'AttkQ_uo1DY',
    name: 'Ivylor',
    tagline: 'Ivy & more',
    category: 'respiratory-care',
    status: 'available',
    form: 'Syrup',
    ageGroup: 'Adults & children 2+',
    pack: '100 ml bottle with dosing cup',
    accent: 'purple',
    featured: true,
    image: '/media/ivylornew.png',
    price: 80,
    shortDescription:
      'A natural extract syrup combining ivy leaf, black elderberry and black honey with vitamin C and zinc for cough relief.',
    description:
      'Ivylor supports respiratory system health through a natural extract blend: ivy leaf extract (38 mg per 5 ml) acting as a bronchodilator, mucolytic and antispasmodic, black elderberry (25 mg per 5 ml) and black honey (6 g per 5 ml), reinforced with vitamin C and zinc. Together they help relieve cough and support the natural clearing of mucus from the airways, while the antioxidant and immunostimulant botanicals support the body through the cough and cold season.',
    keyIngredients: [
      { name: 'Ivy Leaves Extract', note: '38 mg per 5 ml — bronchodilator, mucolytic, antispasmodic, antioxidant & anti-inflammatory' },
      { name: 'Black Elderberry', note: '25 mg per 5 ml — antioxidant, anti-inflammatory & immunostimulant' },
      { name: 'Black Honey', note: '6 g per 5 ml — antibacterial, antioxidant, immunostimulant & demulcent' },
      { name: 'Vitamin C & Zinc', note: 'Antioxidant; both support the immune system' },
    ],
    benefits: [
      'Indicated for cough, asthma and bronchitis',
      'Supports relief of common cold and flu',
      'Immunostimulant support',
      'Supports the airways in COPD',
    ],
    usage: '5 ml three times daily.',
    related: ['ivylor-advance', 'imulormed', 'coglern-syrup'],
  },
  {
    slug: 'vitelormed',
    youtubeId: 'd_kyUQSb5NM',
    name: 'Vitelormed',
    tagline: 'Build bodies, bright minds & big appetites',
    category: 'vitamins-minerals',
    status: 'available',
    form: 'Syrup',
    ageGroup: 'Children 3+ & adults',
    pack: '100 ml bottle',
    accent: 'purple',
    featured: true,
    image: '/media/Vitelormed.jpg',
    price: 185,
    shortDescription:
      'A 12-vitamin, 5-mineral syrup with L-lysine that improves appetite and immunity and supports maximum growth and development.',
    description:
      'Vitelormed combines 12 vitamins and 5 minerals with the essential amino acid L-lysine in a single daily syrup formulated for maximum growth and development. A full B-complex (B1, B2, B3, B5, B6, B7, B9 and B12) supports energy metabolism, vitamins A, C, D3 and E add antioxidant, immune and bone support, and zinc, iron, magnesium, calcium and iodine cover the essential minerals. Together they help improve appetite and immunity, support the management of malnutrition, and sustain mental and physical activity.',
    keyIngredients: [
      { name: 'L-Lysine', note: 'Essential amino acid — supports appetite, growth and development' },
      { name: 'Vitamin B Complex', note: 'B1, B2, B3 (niacin), B5, B6, B7 (biotin), B9 (folic acid) & B12 — support energy metabolism' },
      { name: 'Vitamins A, C, D3 & E', note: 'Antioxidant, immune & bone support' },
      { name: 'Zinc, Iron, Magnesium, Calcium & Iodine', note: 'Five essential minerals' },
    ],
    benefits: [
      'Helps improve appetite',
      'Supports immunity',
      'Supports the management of malnutrition',
      'Supports mental and physical activity',
    ],
    usage:
      'Children 3–6 years: 2.5 ml daily. Children 7–12 years: 5 ml daily. Children above 12 & adults: 10 ml daily. For infants under 3, use only after consulting a doctor.',
    related: ['ferolormed', 'imulormed', 'smartod-d'],
  },
  {
    slug: 'ferolormed',
    name: 'Ferolormed',
    tagline: 'Gentle iron, restored energy',
    category: 'vitamins-minerals',
    status: 'under-registration',
    form: 'Oral drops',
    ageGroup: 'Infants & children 3 months – 5 years',
    pack: 'Dropper bottle',
    accent: 'orange',
    image: '/media/Ferolormed.jpg',
    price: 150,
    shortDescription:
      'A well-tolerated iron formula with folate and vitamin C to support healthy red blood cell production.',
    description:
      'Ferolormed pairs a gentle, well-absorbed form of iron (ferrous bisglycinate) with folate and vitamin C — supporting healthy red blood cell production from infancy. Simply add the measured dose to juice or water for easy, accurate dosing.',
    keyIngredients: [
      { name: 'Iron (Ferrous Bisglycinate)', note: 'Supports red blood cell formation' },
      { name: 'Folate (Folic Acid)', note: 'Supports normal blood formation' },
      { name: 'Vitamin C (L-Ascorbic Acid)', note: 'Enhances iron absorption' },
    ],
    benefits: [
      'Supports healthy red blood cell production',
      'Gentle, well-absorbed iron form',
      'Vitamin C enhances iron absorption',
      'Simple dosing — added to juice or water',
    ],
    usage:
      'Infants 3–6 months: 0.5 ml daily, added to juice or water. Infants & children 7 months – 5 years: 1 ml daily, added to juice or water. Do not exceed the suggested dose.',
    related: ['vitelormed', 'imulormed', 'smartod'],
  },
  {
    slug: 'smartod',
    youtubeId: 'ttFUNOaUUKo',
    // A children's product by name and dosing, so it belongs under Kids Health
    // as well as its primary Omega & Brain Health category.
    secondaryCategories: ['kids-health'],
    name: 'Smartod for kids 30ml',
    tagline: 'Pure omega-3 for heart & mind',
    category: 'omega-brain',
    status: 'available',
    form: 'Oral drops',
    ageGroup: 'Infants & neonates',
    pack: '30 ml dropper bottle',
    accent: 'orange',
    featured: true,
    image: '/media/smartodkids.png',
    price: 165,
    shortDescription:
      'DHA, vitamin E and vitamin D drops for early brain health, immunity and healthy growth.',
    description:
      'Smartod combines DHA with vitamin E and vitamin D in an easy-to-dose liquid drop. Formulated for the earliest stages of life, it supports brain health and mood, healthy bone and tooth development, and the normal function of the immune system.',
    keyIngredients: [
      { name: 'Omega-3 DHA', note: 'Enhances brain health and mood; supports better sleep' },
      { name: 'Vitamin D', note: 'Supports bone, tooth and immune development' },
      { name: 'Vitamin E', note: 'Antioxidant that supports immunity and DNA repair' },
    ],
    benefits: [
      'Immunostimulant support for infants',
      'Supports healthy growth in cases of malnutrition',
      'Supportive care for neonatal anemia',
      'DHA promotes brain health, mood and better sleep',
    ],
    usage: '0.5 ml twice daily.',
    related: ['smartod-d', 'vitelormed', 'coglern-syrup'],
  },
  {
    slug: 'welcaderm-lotion',
    youtubeId: 'uklJ3AK7xB8',
    name: 'Welcaderm Lotion',
    tagline: 'Restore the skin barrier',
    category: 'dermatology',
    status: 'available',
    featured: true,
    form: 'Topical lotion',
    ageGroup: 'All ages',
    pack: '200 ml bottle',
    accent: 'purple',
    image: '/media/welcaderm.png',
    price: 95,
    shortDescription:
      'A dermatologically-guided moisturising lotion that soothes and rebuilds dry, sensitive skin.',
    description:
      'Welcaderm Lotion is a lightweight, deeply hydrating emulsion formulated for dry and sensitive skin. Its blend of humectants, emollients and skin-identical lipids helps lock in moisture and reinforce the natural skin barrier, leaving skin comfortable, supple and calm — fragrance-conscious and suitable for daily use.',
    keyIngredients: [
      { name: 'Glycerin & Humectants', note: 'Draw and hold water in the skin' },
      { name: 'Skin-identical lipids', note: 'Reinforce the moisture barrier' },
      { name: 'Soothing emollients', note: 'Calm dryness and tightness' },
    ],
    benefits: [
      'Intense, long-lasting hydration',
      'Helps restore the natural skin barrier',
      'Lightweight, non-greasy finish',
      'Suitable for sensitive skin',
    ],
    usage: 'Apply to clean, dry skin as needed, morning and night.',
    related: ['imulormed', 'vitelormed', 'welcaderm-lotion'],
  },
  {
    slug: 'ivylor-advance',
    youtubeId: 'Enqmj8qD0UU',
    name: 'Ivylor Advance',
    tagline: 'Relief cough naturally',
    category: 'respiratory-care',
    status: 'available',
    form: 'Syrup (orange flavour)',
    ageGroup: 'Infants, children & adults',
    pack: '30 ml bottle',
    accent: 'orange',
    image: '/media/ivyloradvance.png',
    price: 65,
    shortDescription:
      'An orange-flavoured ivy leaf, thyme and licorice cough syrup for paediatric and adult use, supporting respiratory system health.',
    description:
      'Ivylor Advance builds on the Ivylor formula with a triple-botanical blend in every 5 ml: ivy leaf extract (35 mg) for its expectorant action, thyme leaf extract (21.5 mg) for its antiseptic and antimicrobial effect, and licorice root (21.7 mg), whose liquiritin apioside acts as an antitussive and expectorant with anti-inflammatory and antiviral activity. Together they help clear mucus from the airways and calm cough inflammation — an orange-flavoured syrup suitable for infants, children and adults.',
    keyIngredients: [
      { name: 'Ivy Leaf Extract', note: '35 mg per 5 ml — expectorant; helps clear mucus from the airways' },
      { name: 'Thyme Leaf Extract', note: '21.5 mg per 5 ml — antiseptic & antimicrobial; helps reduce cough inflammation' },
      { name: 'Licorice Root', note: '21.7 mg per 5 ml — liquiritin apioside; antitussive, expectorant, anti-inflammatory & antiviral' },
    ],
    benefits: [
      'Indicated for cough and for acute and chronic bronchitis',
      'Expectorant action helps clear mucus from the airways',
      'Helps reduce cough inflammation',
      'Suitable for infants, children and adults',
    ],
    usage:
      'Infants: 2.5 ml (½ teaspoonful) three times daily. Children: 5 ml (1 teaspoonful) three times daily. Adults: 10 ml (2 teaspoonfuls) three times daily.',
    related: ['ivylor', 'imulormed', 'coglern-syrup'],
  },
  {
    slug: 'coglern-syrup',
    youtubeId: 'HYnY3uAEvaY',
    // Highest omega-3 content in the range (EPA 718.2 mg + DHA 448.9 mg per
    // 5 ml), so it belongs under Omega & Brain Health as well as Kids Health.
    secondaryCategories: ['omega-brain'],
    name: 'Coglern Syrup',
    tagline: 'Focus & growth for young minds',
    category: 'kids-health',
    status: 'available',
    form: 'Syrup',
    ageGroup: 'Children 3+',
    pack: '150 ml bottle with dosing cup',
    accent: 'purple',
    image: '/media/coglernnew.png',
    price: 300,
    shortDescription:
      'A children’s syrup with high-strength omega-3 (EPA & DHA) and marigold flower extract to support learning and growth.',
    description:
      'Coglern Syrup is formulated for growing, learning children — combining high-strength omega-3 (EPA and DHA) with marigold flower extract (lutein) in a pleasant, easy-to-take syrup. Created to support brain growth and function, concentration and healthy development during the busy school years.',
    keyIngredients: [
      { name: 'Omega-3 EPA', note: '718.2 mg per 5 ml' },
      { name: 'Omega-3 DHA', note: '448.9 mg per 5 ml — supports normal brain function' },
      { name: 'Marigold Flower Extract', note: '5.5 mg lutein per 5 ml' },
    ],
    benefits: [
      'Supports brain growth and brain function',
      'May improve reading, maths and sleep in children',
      'Supportive care for ADHD and childhood depression',
      'Omega-3s may support healthy bone and reduce allergy and insulin-resistance risk',
    ],
    usage: '5 ml once daily.',
    related: ['smartod', 'imulormed', 'ivylor'],
  },
  {
    slug: 'smartod-d',
    youtubeId: 'R--0km-crJM',
    name: 'Smartod D 15ml',
    tagline: 'Vitamin D3, drop by drop',
    category: 'vitamins-minerals',
    status: 'available',
    form: 'Oral drops',
    ageGroup: '6 months & above',
    pack: '15 ml dropper bottle',
    accent: 'orange',
    image: '/media/smartodd.png',
    price: 85,
    shortDescription:
      'A vitamin D3 drop formula that supports bone and immune health from six months of age.',
    description:
      'Smartod D delivers vitamin D3 (cholecalciferol) in an easy-to-dose liquid drop — supporting healthy bone development and normal immune function for infants, children and adults alike.',
    keyIngredients: [
      { name: 'Vitamin D3 (Cholecalciferol)', note: 'Supports bone and immune health' },
    ],
    benefits: [
      'Supports bone and immune health',
      'Simple, accurate drop dosing',
      'Suitable from 6 months of age',
    ],
    usage:
      'Children 6 months – 12 years: 2 to 8 drops daily. Adults: 4 to 10 drops daily, or as advised by a healthcare professional.',
    related: ['smartod', 'vitelormed', 'imulormed'],
  },
  {
    slug: 'gotolor',
    youtubeId: '9gBnA-kvZLo',
    name: 'Gotolor',
    tagline: 'A step to easier days',
    category: 'kids-health',
    status: 'available',
    form: 'Syrup',
    ageGroup: 'Infants & children',
    pack: '100 ml bottle',
    accent: 'orange',
    image: '/media/gotolor.png',
    price: 90,
    shortDescription:
      'An alpha-amylase digestive enzyme syrup that soothes sore throat, eases digestion and helps defend against respiratory infections.',
    description:
      'Gotolor is a children’s digestive enzyme syrup built around alpha-amylase (200 U.CEIP per ml). Its anti-inflammatory action helps relieve sore throat and reduce swelling — especially after surgery or injury — while the enzyme supports the breakdown of starches for easier carbohydrate digestion. It also helps boost the immune system to prevent and relieve upper respiratory tract infections. A gentle, great-tasting dietary supplement for easier days.',
    keyIngredients: [
      { name: 'Alpha-Amylase', note: 'Digestive enzyme — 200 U.CEIP per ml' },
    ],
    benefits: [
      'Helps relieve sore throat and reduce inflammation',
      'Eases swelling — beneficial post-surgery or injury',
      'Supports carbohydrate digestion and relieves indigestion',
      'Boosts immunity against upper respiratory tract infections',
    ],
    usage:
      'Infants & children up to 3 years (15 kg): 5 ml (1 teaspoon, 1000 U.CEIP) three times daily. Children over 3 years (above 15 kg): 10 ml (1 tablespoon, 2000 U.CEIP) three times daily.',
    related: ['ivylor', 'coglern-syrup', 'imulormed'],
  },
];

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
 * Everything a product should be findable by. Ingredient notes, benefits and
 * the long description are included so searches for an active ingredient or an
 * indication (e.g. "EPA", "asthma") reach the products that actually contain
 * them, not just the ones that happen to name it in the tagline.
 */
export function productSearchText(p: Product) {
  return [
    p.name,
    p.tagline,
    p.form,
    p.shortDescription,
    p.description,
    ...p.keyIngredients.flatMap((k) => [k.name, k.note]),
    ...p.benefits,
  ].join(' ');
}
