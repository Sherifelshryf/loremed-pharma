/**
 * Loremed product catalogue.
 * Product names and categories are taken from the real Loremed range;
 * formulations are described in line with each product's active ingredient.
 * CMS-ready: every field maps cleanly to a headless schema.
 */

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
};

export const categories: {
  id: ProductCategory;
  label: string;
  description: string;
}[] = [
  { id: 'immune-support', label: 'Immune Support', description: 'Elderberry, black seed, honey & zinc formulas that help the body defend itself.' },
  { id: 'respiratory-care', label: 'Respiratory Care', description: 'Ivy leaf and botanical syrups that soothe coughs and support clear airways.' },
  { id: 'vitamins-minerals', label: 'Vitamins & Minerals', description: 'Everyday essential nutrition — from daily multivitamins to targeted iron support.' },
  { id: 'kids-health', label: 'Kids Health', description: 'Gentle, great-tasting formulas designed around the needs of growing children.' },
  { id: 'omega-brain', label: 'Omega & Brain Health', description: 'High-purity omega-3 concentrates for heart, brain and vision.' },
  { id: 'dermatology', label: 'Dermatology & Skin', description: 'Dermatologically-guided lotions that protect and restore the skin barrier.' },
];

export const statusLabels: Record<ProductStatus, string> = {
  available: 'Available Now',
  'under-registration': 'Under Registration',
};

export const products: Product[] = [
  {
    slug: 'imulormed',
    name: 'Imulormed',
    tagline: 'Everyday immune resilience',
    category: 'immune-support',
    status: 'available',
    form: 'Syrup',
    ageGroup: 'Adults & children 3+',
    pack: '120 ml bottle with dosing cup',
    accent: 'orange',
    featured: true,
    shortDescription:
      'A botanical immune syrup combining black elderberry, black seed and honey with vitamin C and zinc.',
    description:
      'Imulormed brings together some of nature’s most trusted botanicals — black elderberry, black seed (Nigella sativa) and pure honey — reinforced with vitamin C and zinc. The formula is designed to support the body’s natural defences through the changing seasons, offering a gentle, great-tasting daily ritual the whole family can share.',
    keyIngredients: [
      { name: 'Black Elderberry', note: 'Rich in anthocyanin antioxidants' },
      { name: 'Black Seed (Nigella sativa)', note: 'Traditional immune botanical' },
      { name: 'Honey', note: 'Soothing natural base' },
      { name: 'Vitamin C + Zinc', note: 'Contribute to normal immune function' },
    ],
    benefits: [
      'Supports the normal function of the immune system',
      'Antioxidant protection from elderberry polyphenols',
      'Gentle honey base — pleasant for children',
      'Free from artificial colours',
    ],
    usage: 'One 10 ml dose once daily, or as advised by your healthcare professional.',
    related: ['vitelormed', 'lvylor', 'smartod'],
  },
  {
    slug: 'lvylor',
    name: 'Lvylor',
    tagline: 'Breathe easier, naturally',
    category: 'respiratory-care',
    status: 'available',
    form: 'Syrup',
    ageGroup: 'Adults & children 2+',
    pack: '100 ml bottle with dosing cup',
    accent: 'purple',
    featured: true,
    image: '/media/ivylor.png',
    shortDescription:
      'A standardised ivy leaf extract syrup that helps loosen mucus and soothe productive coughs.',
    description:
      'Lvylor is built around a standardised dry extract of ivy leaf (Hedera helix), a botanical long valued for respiratory comfort. It helps relieve chesty, productive coughs by supporting the natural clearing of mucus from the airways — a smooth, sugar-conscious syrup for the whole family during the cough and cold season.',
    keyIngredients: [
      { name: 'Ivy Leaf Dry Extract', note: 'Standardised Hedera helix' },
      { name: 'Botanical syrup base', note: 'Smooth, easy to dose' },
    ],
    benefits: [
      'Helps relieve chesty, productive coughs',
      'Supports natural clearing of the airways',
      'Standardised botanical extract for consistent dosing',
      'Suitable from 2 years of age',
    ],
    usage: 'Dose according to age as indicated on the label, twice daily.',
    related: ['lvylor-advance', 'imulormed', 'coglern-syrup'],
  },
  {
    slug: 'vitelormed',
    name: 'Vitelormed',
    tagline: 'Complete daily vitality',
    category: 'vitamins-minerals',
    status: 'available',
    form: 'Film-coated tablets',
    ageGroup: 'Adults',
    pack: '30 tablets',
    accent: 'purple',
    featured: true,
    shortDescription:
      'A comprehensive multivitamin and multimineral complex for everyday energy and wellbeing.',
    description:
      'Vitelormed is a complete daily multivitamin and multimineral, thoughtfully balanced to help fill the nutritional gaps of modern life. From energy-releasing B vitamins to antioxidant vitamins C and E and essential minerals, one tablet a day supports energy metabolism, immune health and overall vitality.',
    keyIngredients: [
      { name: 'B-Vitamin Complex', note: 'Supports energy metabolism' },
      { name: 'Vitamins C & E', note: 'Antioxidant protection' },
      { name: 'Zinc, Selenium & Iron', note: 'Essential trace minerals' },
      { name: 'Vitamin D3', note: 'Bone & immune support' },
    ],
    benefits: [
      'Supports normal energy-yielding metabolism',
      'Contributes to the reduction of tiredness and fatigue',
      'Broad-spectrum vitamin and mineral coverage',
      'Convenient one-a-day tablet',
    ],
    usage: 'One tablet daily with a meal.',
    related: ['ferolormed', 'imulormed', 'smartod-d'],
  },
  {
    slug: 'ferolormed',
    name: 'Ferolormed',
    tagline: 'Gentle iron, restored energy',
    category: 'vitamins-minerals',
    status: 'available',
    form: 'Film-coated tablets',
    ageGroup: 'Adults',
    pack: '30 tablets',
    accent: 'orange',
    shortDescription:
      'A well-tolerated iron formula with folic acid and vitamin B12 to support healthy red blood cells.',
    description:
      'Ferolormed pairs a gentle, well-absorbed form of iron with folic acid and vitamin B12 — the trio at the heart of healthy red blood cell formation. Designed to be kind to the stomach, it helps replenish iron stores and reduce the tiredness and fatigue associated with low iron.',
    keyIngredients: [
      { name: 'Iron (gentle form)', note: 'Supports red blood cell formation' },
      { name: 'Folic Acid', note: 'Normal blood formation' },
      { name: 'Vitamin B12', note: 'Reduces tiredness & fatigue' },
      { name: 'Vitamin C', note: 'Enhances iron absorption' },
    ],
    benefits: [
      'Supports normal formation of red blood cells',
      'Helps reduce tiredness and fatigue',
      'Vitamin C enhances iron absorption',
      'Formulated for gentle tolerability',
    ],
    usage: 'One tablet daily, preferably with a vitamin-C-rich meal.',
    related: ['vitelormed', 'imulormed', 'smartod'],
  },
  {
    slug: 'smartod',
    name: 'SmartOD',
    tagline: 'Pure omega-3 for heart & mind',
    category: 'omega-brain',
    status: 'available',
    form: 'Softgel capsules',
    ageGroup: 'Adults',
    pack: '30 softgels',
    accent: 'orange',
    featured: true,
    image: '/media/smartodkids.png',
    shortDescription:
      'High-purity omega-3 softgels rich in EPA and DHA for cardiovascular and cognitive health.',
    description:
      'SmartOD delivers a concentrated, molecularly-refined omega-3 fish oil rich in EPA and DHA. Purified to remove contaminants and presented in an easy-to-swallow softgel, it supports normal heart function, brain performance and healthy vision — the essential fatty acids your daily diet often misses.',
    keyIngredients: [
      { name: 'Omega-3 (EPA)', note: 'Supports normal heart function' },
      { name: 'Omega-3 (DHA)', note: 'Supports brain & vision' },
      { name: 'Vitamin E', note: 'Protects the oil from oxidation' },
    ],
    benefits: [
      'EPA & DHA support normal heart function',
      'DHA contributes to maintenance of normal brain function',
      'Molecularly refined for purity',
      'Enteric-friendly softgel — no fishy aftertaste',
    ],
    usage: 'One softgel daily with food.',
    related: ['smartod-d', 'vitelormed', 'coglern-syrup'],
  },
  {
    slug: 'welcaderm-lotion',
    name: 'Welcaderm Lotion',
    tagline: 'Restore the skin barrier',
    category: 'dermatology',
    status: 'available',
    form: 'Topical lotion',
    ageGroup: 'All ages',
    pack: '200 ml bottle',
    accent: 'purple',
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
    slug: 'lvylor-advance',
    name: 'Lvylor Advance',
    tagline: 'Extended respiratory support',
    category: 'respiratory-care',
    status: 'under-registration',
    form: 'Syrup',
    ageGroup: 'Adults & children 4+',
    pack: '120 ml bottle with dosing cup',
    accent: 'orange',
    shortDescription:
      'A next-generation ivy leaf and thyme syrup for more persistent, stubborn coughs.',
    description:
      'Lvylor Advance builds on the trusted Lvylor formula, pairing standardised ivy leaf extract with thyme to offer broader botanical support for more persistent coughs. Developed for the moments when the airways need a little more help to clear and settle.',
    keyIngredients: [
      { name: 'Ivy Leaf Dry Extract', note: 'Standardised Hedera helix' },
      { name: 'Thyme Extract', note: 'Traditional respiratory botanical' },
    ],
    benefits: [
      'Dual-botanical respiratory support',
      'Helps soothe persistent, chesty coughs',
      'Standardised extracts for consistency',
      'Great-tasting, family-friendly syrup',
    ],
    usage: 'Dose according to age as indicated on the label.',
    related: ['lvylor', 'imulormed', 'coglern-syrup'],
  },
  {
    slug: 'coglern-syrup',
    name: 'Coglern Syrup',
    tagline: 'Focus & growth for young minds',
    category: 'kids-health',
    status: 'under-registration',
    form: 'Syrup',
    ageGroup: 'Children 3+',
    pack: '150 ml bottle with dosing cup',
    accent: 'purple',
    image: '/media/coglern.png',
    shortDescription:
      'A children’s syrup with omega-3, choline and B vitamins to support learning and concentration.',
    description:
      'Coglern Syrup is formulated for growing, learning children — combining brain-supportive omega-3 (DHA), choline and a gentle B-vitamin complex in a pleasant, easy-to-take syrup. Created to support concentration, memory and healthy development during the busy school years.',
    keyIngredients: [
      { name: 'Omega-3 (DHA)', note: 'Supports normal brain function' },
      { name: 'Choline', note: 'Contributes to normal cognition' },
      { name: 'B-Vitamin Complex', note: 'Supports the nervous system' },
    ],
    benefits: [
      'Supports concentration and learning',
      'DHA for healthy brain development',
      'Gentle, child-friendly formula',
      'Pleasant taste children enjoy',
    ],
    usage: 'One age-appropriate dose daily, or as advised by a paediatrician.',
    related: ['smartod', 'imulormed', 'lvylor'],
  },
  {
    slug: 'smartod-d',
    name: 'SmartOD D',
    tagline: 'Omega-3 meets vitamin D3',
    category: 'omega-brain',
    status: 'under-registration',
    form: 'Softgel capsules',
    ageGroup: 'Adults',
    pack: '30 softgels',
    accent: 'orange',
    image: '/media/smartodd.png',
    shortDescription:
      'The SmartOD omega-3 concentrate enhanced with vitamin D3 for immunity and bone health.',
    description:
      'SmartOD D unites the pure EPA/DHA omega-3 concentrate of SmartOD with a meaningful dose of vitamin D3 — pairing cardiovascular and cognitive support with immune and bone health in a single daily softgel. One capsule, two pillars of wellbeing.',
    keyIngredients: [
      { name: 'Omega-3 (EPA & DHA)', note: 'Heart & brain support' },
      { name: 'Vitamin D3', note: 'Immune & bone health' },
      { name: 'Vitamin E', note: 'Antioxidant stability' },
    ],
    benefits: [
      'Combines omega-3 with vitamin D3',
      'Supports heart, brain and bones',
      'Contributes to normal immune function',
      'One convenient daily softgel',
    ],
    usage: 'One softgel daily with food.',
    related: ['smartod', 'vitelormed', 'imulormed'],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCategory(id: ProductCategory) {
  return categories.find((c) => c.id === id);
}
