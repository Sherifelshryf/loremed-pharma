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
    label: { en: 'Cough & Chest', ar: 'السعال والصدر' },
    description: {
      en: 'For coughs, colds and blocked chests.',
      ar: 'للسعال ونزلات البرد واحتقان الصدر.',
    },
  },
  {
    id: 'kids-health',
    label: { en: 'For Children', ar: 'للأطفال' },
    description: {
      en: 'Gentle, good-tasting formulas made for children.',
      ar: 'تركيبات لطيفة ولذيذة الطعم مصمَّمة للأطفال.',
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
      ar: 'يساعد الجسم على الدفاع عن نفسه.',
    },
  },
  {
    id: 'omega-brain',
    label: { en: 'Omega-3 & Focus', ar: 'أوميغا-3 والتركيز' },
    description: {
      en: 'Omega-3 for brain, focus and growth.',
      ar: 'أوميغا-3 لصحة الدماغ والتركيز والنمو.',
    },
  },
  {
    id: 'dermatology',
    label: { en: 'Skin Care', ar: 'العناية بالبشرة' },
    description: {
      en: 'Lotions that soothe and soften the skin.',
      ar: 'لوشن يهدّئ البشرة ويُنعّمها.',
    },
  },
];

export const statusLabels: Record<ProductStatus, Bi> = {
  available: { en: 'Available Now', ar: 'متوفر الآن' },
  'under-registration': { en: 'Coming Soon', ar: 'قريبًا' },
};

export const products: Product[] = [
  {
    slug: 'ivylor',
    youtubeId: 'AttkQ_uo1DY',
    name: { en: 'Ivylor', ar: 'إيفيلور' },
    tagline: { en: 'Ivy & more', ar: 'لبلاب وأكثر' },
    category: 'respiratory-care',
    status: 'available',
    form: { en: 'Syrup', ar: 'شراب' },
    ageGroup: { en: 'Adults & children 2+', ar: 'البالغون والأطفال من سنتين فأكثر' },
    pack: { en: '100 ml bottle with dosing cup', ar: 'زجاجة 100 مل مع كوب قياس' },
    accent: 'purple',
    featured: true,
    image: '/media/ivylornew.webp',
    price: 80,
    shortDescription: {
      en: 'A natural extract syrup combining ivy leaf, black elderberry and bee honey with vitamin C and zinc for cough relief.',
      ar: 'شراب بمستخلصات طبيعية يجمع أوراق اللبلاب والبلسان الأسود وعسل النحل مع فيتامين ج والزنك لتخفيف السعال.',
    },
    description: {
      en: 'Ivylor supports respiratory system health through a natural extract blend: ivy leaf extract (38 mg per 5 ml) acting as a bronchodilator, mucolytic and antispasmodic, black elderberry (25 mg per 5 ml) and bee honey (6 g per 5 ml), reinforced with vitamin C and zinc. Together they help relieve cough and support the natural clearing of mucus from the airways, while the antioxidant and immunostimulant botanicals support the body through the cough and cold season.',
      ar: 'يدعم إيفيلور صحة الجهاز التنفسي عبر مزيج من المستخلصات الطبيعية: مستخلص أوراق اللبلاب (38 مجم لكل 5 مل) الذي يعمل كموسّع للشعب الهوائية ومذيب للبلغم ومضاد للتقلصات، والبلسان الأسود (25 مجم لكل 5 مل)، وعسل النحل (6 جم لكل 5 مل)، مدعّمة بفيتامين ج والزنك. تساعد معًا على تخفيف السعال ودعم التخلص الطبيعي من البلغم في المجرى التنفسي، بينما تدعم المستخلصات المضادة للأكسدة والمنشّطة للمناعة الجسم خلال موسم البرد والسعال.',
    },
    keyIngredients: [
      {
        name: { en: 'Ivy Leaves Extract', ar: 'مستخلص أوراق اللبلاب' },
        note: {
          en: '38 mg per 5 ml — bronchodilator, mucolytic, antispasmodic, antioxidant & anti-inflammatory',
          ar: '38 مجم لكل 5 مل — موسّع للشعب الهوائية، مذيب للبلغم، مضاد للتقلصات، مضاد للأكسدة ومضاد للالتهاب',
        },
      },
      {
        name: { en: 'Black Elderberry', ar: 'البلسان الأسود' },
        note: {
          en: '25 mg per 5 ml — antioxidant, anti-inflammatory & immunostimulant',
          ar: '25 مجم لكل 5 مل — مضاد للأكسدة، مضاد للالتهاب ومنشّط للمناعة',
        },
      },
      {
        name: { en: 'Bee Honey', ar: 'عسل النحل' },
        note: {
          en: '6 g per 5 ml — antibacterial, antioxidant, immunostimulant & demulcent',
          ar: '6 جم لكل 5 مل — مضاد للبكتيريا، مضاد للأكسدة، منشّط للمناعة وملطّف للحلق',
        },
      },
      {
        name: { en: 'Vitamin C & Zinc', ar: 'فيتامين ج والزنك' },
        note: {
          en: 'Antioxidant; both support the immune system',
          ar: 'مضاد للأكسدة؛ كلاهما يدعم الجهاز المناعي',
        },
      },
    ],
    benefits: [
      { en: 'Indicated for cough, asthma and bronchitis', ar: 'يُستخدم للسعال والربو والتهاب الشعب الهوائية' },
      { en: 'Supports relief of common cold and flu', ar: 'يساعد على تخفيف نزلات البرد والإنفلونزا' },
      { en: 'Immunostimulant support', ar: 'دعم منشّط للمناعة' },
      { en: 'Supports the airways in COPD', ar: 'يدعم المجرى التنفسي في حالات الانسداد الرئوي المزمن' },
    ],
    usage: { en: '5 ml three times daily.', ar: '5 مل ثلاث مرات يوميًا.' },
    related: ['ivylor-advance', 'imulormed', 'coglern-syrup'],
  },
  {
    slug: 'ivylor-advance',
    youtubeId: 'Enqmj8qD0UU',
    name: { en: 'Ivylor Advance', ar: 'إيفيلور أدفانس' },
    tagline: { en: 'Relief cough naturally', ar: 'راحة من السعال بشكل طبيعي' },
    category: 'respiratory-care',
    status: 'available',
    form: { en: 'Syrup (orange flavour)', ar: 'شراب (بنكهة البرتقال)' },
    ageGroup: { en: 'Infants, children & adults', ar: 'الرضع والأطفال والبالغون' },
    pack: { en: '30 ml bottle', ar: 'زجاجة 30 مل' },
    accent: 'orange',
    image: '/media/ivyloradvance.webp',
    price: 65,
    shortDescription: {
      en: 'A cough syrup of ivy leaf, thyme and licorice — in an orange flavour — for paediatric and adult use, supporting respiratory system health.',
      ar: 'شراب للسعال من أوراق اللبلاب والزعتر وعرق السوس — بنكهة البرتقال — للأطفال والبالغين، يدعم صحة الجهاز التنفسي.',
    },
    description: {
      en: 'Ivylor Advance builds on the Ivylor formula with a triple-botanical blend in every 5 ml: ivy leaf extract (35 mg) for its expectorant action, thyme leaf extract (21.5 mg) for its antiseptic and antimicrobial effect, and licorice root (21.7 mg), whose liquiritin apioside acts as an antitussive and expectorant with anti-inflammatory and antiviral activity. Together they help clear mucus from the airways and calm cough inflammation. The syrup is orange-flavoured — the flavouring only, it contains no orange — and is suitable for infants, children and adults.',
      ar: 'يبني إيفيلور أدفانس على تركيبة إيفيلور بمزيج ثلاثي من النباتات في كل 5 مل: مستخلص أوراق اللبلاب (35 مجم) لعمله الطارد للبلغم، ومستخلص أوراق الزعتر (21.5 مجم) لتأثيره المطهّر والمضاد للميكروبات، وجذر عرق السوس (21.7 مجم) الذي يعمل مركّب الليكويريتين أبيوسيد فيه كمهدّئ للسعال وطارد للبلغم مع نشاط مضاد للالتهاب ومضاد للفيروسات. تساعد معًا على التخلص من البلغم في المجرى التنفسي وتهدئة التهاب السعال. الشراب بنكهة البرتقال — نكهة فقط ولا يحتوي على البرتقال — ومناسب للرضع والأطفال والبالغين.',
    },
    keyIngredients: [
      {
        name: { en: 'Ivy Leaf Extract', ar: 'مستخلص أوراق اللبلاب' },
        note: {
          en: '35 mg per 5 ml — expectorant; helps clear mucus from the airways',
          ar: '35 مجم لكل 5 مل — طارد للبلغم؛ يساعد على تنظيف المجرى التنفسي',
        },
      },
      {
        name: { en: 'Thyme Leaf Extract', ar: 'مستخلص أوراق الزعتر' },
        note: {
          en: '21.5 mg per 5 ml — antiseptic & antimicrobial; helps reduce cough inflammation',
          ar: '21.5 مجم لكل 5 مل — مطهّر ومضاد للميكروبات؛ يساعد على تقليل التهاب السعال',
        },
      },
      {
        name: { en: 'Licorice Root', ar: 'جذر عرق السوس' },
        note: {
          en: '21.7 mg per 5 ml — liquiritin apioside; antitussive, expectorant, anti-inflammatory & antiviral',
          ar: '21.7 مجم لكل 5 مل — ليكويريتين أبيوسيد؛ مهدّئ للسعال، طارد للبلغم، مضاد للالتهاب ومضاد للفيروسات',
        },
      },
    ],
    benefits: [
      { en: 'Indicated for cough and for acute and chronic bronchitis', ar: 'يُستخدم للسعال والتهاب الشعب الهوائية الحاد والمزمن' },
      { en: 'Expectorant action helps clear mucus from the airways', ar: 'عمل طارد للبلغم يساعد على تنظيف المجرى التنفسي' },
      { en: 'Helps reduce cough inflammation', ar: 'يساعد على تقليل التهاب السعال' },
      { en: 'Suitable for infants, children and adults', ar: 'مناسب للرضع والأطفال والبالغين' },
    ],
    usage: {
      en: 'Infants: 2.5 ml (½ teaspoonful) three times daily. Children: 5 ml (1 teaspoonful) three times daily. Adults: 10 ml (2 teaspoonfuls) three times daily.',
      ar: 'الرضع: 2.5 مل (نصف ملعقة صغيرة) ثلاث مرات يوميًا. الأطفال: 5 مل (ملعقة صغيرة) ثلاث مرات يوميًا. البالغون: 10 مل (ملعقتان صغيرتان) ثلاث مرات يوميًا.',
    },
    related: ['ivylor', 'imulormed', 'coglern-syrup'],
  },
  {
    slug: 'coglern-syrup',
    youtubeId: 'HYnY3uAEvaY',
    secondaryCategories: ['omega-brain'],
    name: { en: 'Coglern Syrup', ar: 'كوجليرن شراب' },
    tagline: { en: 'Focus & growth for young minds', ar: 'تركيز ونمو للعقول الصغيرة' },
    category: 'kids-health',
    status: 'available',
    form: { en: 'Syrup', ar: 'شراب' },
    ageGroup: { en: 'Children', ar: 'الأطفال' },
    pack: { en: 'Bottle with dosing cup', ar: 'زجاجة مع كوب قياس' },
    accent: 'purple',
    image: '/media/coglernnew.webp',
    price: 300,
    shortDescription: {
      en: 'A children’s syrup with high-strength fish-oil omega-3 (EPA & DHA) and marigold flower extract to support learning and growth.',
      ar: 'شراب للأطفال بتركيز عالٍ من أوميغا-3 المستخلص من زيت السمك (إي بي إيه ودي إتش إيه) ومستخلص زهرة الآذريون لدعم التعلّم والنمو.',
    },
    description: {
      en: 'Coglern Syrup is formulated for growing, learning children — combining high-strength omega-3 (EPA and DHA) from fish oil with marigold flower extract (lutein) in a pleasant, easy-to-take syrup. Created to support brain growth and function, concentration and healthy development during the busy school years.',
      ar: 'صُمم كوجليرن شراب للأطفال في مرحلة النمو والتعلّم — يجمع أوميغا-3 عالي التركيز (إي بي إيه ودي إتش إيه) المستخلص من زيت السمك مع مستخلص زهرة الآذريون (اللوتين) في شراب لذيذ وسهل التناول. طُوّر لدعم نمو الدماغ ووظائفه والتركيز والنمو الصحي خلال سنوات الدراسة.',
    },
    keyIngredients: [
      {
        name: { en: 'Omega-3 EPA (from fish oil)', ar: 'أوميغا-3 إي بي إيه (من زيت السمك)' },
        note: { en: '718.2 mg per 5 ml', ar: '718.2 مجم لكل 5 مل' },
      },
      {
        name: { en: 'Omega-3 DHA (from fish oil)', ar: 'أوميغا-3 دي إتش إيه (من زيت السمك)' },
        note: {
          en: '448.9 mg per 5 ml — supports normal brain function',
          ar: '448.9 مجم لكل 5 مل — يدعم وظائف الدماغ الطبيعية',
        },
      },
      {
        name: { en: 'Marigold Flower Extract', ar: 'مستخلص زهرة الآذريون' },
        note: { en: '5.5 mg lutein per 5 ml', ar: '5.5 مجم لوتين لكل 5 مل' },
      },
    ],
    benefits: [
      { en: 'Supports brain growth, function and concentration', ar: 'يدعم نمو الدماغ ووظائفه والتركيز' },
      { en: 'High-strength omega-3 in a child-friendly syrup', ar: 'أوميغا-3 عالي التركيز في شراب محبب للأطفال' },
      { en: 'Lutein from marigold supports eye health', ar: 'اللوتين من الآذريون يدعم صحة العين' },
      { en: 'Omega-3s may support healthy bone and reduce allergy and insulin-resistance risk', ar: 'قد يدعم أوميغا-3 صحة العظام ويقلل خطر الحساسية ومقاومة الإنسولين' },
    ],
    usage: {
      en: 'Toddlers & children 13 months – under 6 years: ½ teaspoon twice daily. Children 6 – under 12 years: 1 teaspoon twice daily. Adults & adolescents over 12 years: 1 teaspoon three times daily.',
      ar: 'الأطفال من 13 شهرًا حتى أقل من 6 سنوات: نصف ملعقة صغيرة مرتين يوميًا. الأطفال من 6 حتى أقل من 12 سنة: ملعقة صغيرة مرتين يوميًا. البالغون والمراهقون فوق 12 سنة: ملعقة صغيرة ثلاث مرات يوميًا.',
    },
    related: ['smartod', 'imulormed', 'ivylor'],
  },
  {
    slug: 'smartod',
    youtubeId: 'ttFUNOaUUKo',
    secondaryCategories: ['kids-health'],
    name: { en: 'Smartod for kids 30ml', ar: 'سمارتود للأطفال 30 مل' },
    tagline: { en: 'Pure omega-3 for heart & mind', ar: 'أوميغا-3 نقي للقلب والعقل' },
    category: 'omega-brain',
    status: 'available',
    form: { en: 'Oral drops', ar: 'نقط بالفم' },
    ageGroup: { en: 'Infants & neonates', ar: 'الرضع وحديثو الولادة' },
    pack: { en: '30 ml dropper bottle', ar: 'زجاجة بقطارة 30 مل' },
    accent: 'orange',
    featured: true,
    image: '/media/smartodkids.webp',
    price: 165,
    shortDescription: {
      en: 'Fish-oil DHA with vitamin E and vitamin D in drops for early brain health, immunity and healthy growth.',
      ar: 'نقط تحتوي على دي إتش إيه من زيت السمك وفيتامين هـ وفيتامين د لصحة الدماغ المبكرة والمناعة والنمو السليم.',
    },
    description: {
      en: 'Smartod combines DHA from fish oil with vitamin E and vitamin D in an easy-to-dose liquid drop. Formulated for the earliest stages of life, it supports brain health and mood, healthy bone and tooth development, and the normal function of the immune system.',
      ar: 'يجمع سمارتود بين دي إتش إيه المستخلص من زيت السمك وفيتامين هـ وفيتامين د في نقط سائلة سهلة الجرعة. صُمم لأولى مراحل الحياة، ويدعم صحة الدماغ والمزاج، ونمو العظام والأسنان بشكل سليم، والوظيفة الطبيعية للجهاز المناعي.',
    },
    keyIngredients: [
      {
        name: { en: 'Omega-3 DHA (from fish oil)', ar: 'أوميغا-3 دي إتش إيه (من زيت السمك)' },
        note: {
          en: 'Enhances brain health and mood; supports better sleep',
          ar: 'يعزز صحة الدماغ والمزاج؛ ويدعم نومًا أفضل',
        },
      },
      {
        name: { en: 'Vitamin D', ar: 'فيتامين د' },
        note: {
          en: 'Supports bone, tooth and immune development',
          ar: 'يدعم نمو العظام والأسنان والمناعة',
        },
      },
      {
        name: { en: 'Vitamin E', ar: 'فيتامين هـ' },
        note: {
          en: 'Antioxidant that supports immunity and DNA repair',
          ar: 'مضاد للأكسدة يدعم المناعة وإصلاح الحمض النووي',
        },
      },
    ],
    benefits: [
      { en: 'Immunostimulant support for infants', ar: 'دعم منشّط للمناعة عند الرضع' },
      { en: 'Supports healthy growth in cases of malnutrition', ar: 'يدعم النمو الصحي في حالات سوء التغذية' },
      { en: 'Supportive care for neonatal anemia', ar: 'دعم في حالات فقر الدم عند حديثي الولادة' },
      { en: 'DHA promotes brain health, mood and better sleep', ar: 'يعزز دي إتش إيه صحة الدماغ والمزاج والنوم' },
    ],
    usage: { en: '0.5 ml twice daily.', ar: '0.5 مل مرتين يوميًا.' },
    related: ['smartod-d', 'vitelormed', 'coglern-syrup'],
  },
  {
    slug: 'smartod-d',
    youtubeId: 'R--0km-crJM',
    secondaryCategories: ['kids-health'],
    name: { en: 'Smartod D 15ml', ar: 'سمارتود د 15 مل' },
    tagline: { en: 'Vitamin D3, drop by drop', ar: 'فيتامين د3، نقطة بنقطة' },
    category: 'vitamins-minerals',
    status: 'available',
    form: { en: 'Oral drops', ar: 'نقط بالفم' },
    ageGroup: { en: '6 months & above', ar: 'من 6 أشهر فأكثر' },
    pack: { en: '15 ml dropper bottle', ar: 'زجاجة بقطارة 15 مل' },
    accent: 'orange',
    image: '/media/smartodd.webp',
    price: 85,
    shortDescription: {
      en: 'A vitamin D3 drop formula that supports bone and immune health from six months of age.',
      ar: 'نقط فيتامين د3 تدعم صحة العظام والمناعة من عمر ستة أشهر.',
    },
    description: {
      en: 'Smartod D delivers vitamin D3 (cholecalciferol) in a simple daily drop. Vitamin D supports the normal absorption of calcium, the development of healthy bones and teeth, and the normal function of the immune system — especially valuable where sunlight exposure is limited.',
      ar: 'يقدّم سمارتود د فيتامين د3 (كوليكالسيفيرول) في نقطة يومية بسيطة. يدعم فيتامين د الامتصاص الطبيعي للكالسيوم، ونمو عظام وأسنان صحية، والوظيفة الطبيعية للجهاز المناعي — وهو مفيد بشكل خاص عند قلة التعرض لأشعة الشمس.',
    },
    keyIngredients: [
      {
        name: { en: 'Vitamin D3 (Cholecalciferol)', ar: 'فيتامين د3 (كوليكالسيفيرول)' },
        note: { en: 'Supports bone and immune health', ar: 'يدعم صحة العظام والمناعة' },
      },
    ],
    benefits: [
      { en: 'Supports normal calcium absorption', ar: 'يدعم الامتصاص الطبيعي للكالسيوم' },
      { en: 'Supports healthy bones and teeth', ar: 'يدعم صحة العظام والأسنان' },
      { en: 'Supports normal immune function', ar: 'يدعم الوظيفة الطبيعية للمناعة' },
      { en: 'Simple once-daily drop', ar: 'نقطة واحدة بسيطة يوميًا' },
    ],
    usage: { en: 'One drop daily, or as directed by your doctor.', ar: 'نقطة واحدة يوميًا، أو حسب إرشادات الطبيب.' },
    related: ['smartod', 'imulormed', 'ivylor'],
  },
  {
    slug: 'vitelormed',
    youtubeId: 'd_kyUQSb5NM',
    name: { en: 'Vitelormed', ar: 'فيتيلورميد' },
    tagline: { en: 'Build bodies, bright minds & big appetites', ar: 'أجسام قوية وعقول نشطة وشهية مفتوحة' },
    category: 'vitamins-minerals',
    status: 'available',
    form: { en: 'Syrup', ar: 'شراب' },
    ageGroup: { en: 'Children 3+ & adults', ar: 'الأطفال من 3 سنوات فأكثر والبالغون' },
    pack: { en: '100 ml bottle', ar: 'زجاجة 100 مل' },
    accent: 'purple',
    featured: true,
    image: '/media/Vitelormed.webp',
    price: 185,
    shortDescription: {
      en: 'A 12-vitamin, 5-mineral syrup with L-lysine that improves appetite and immunity and supports maximum growth and development.',
      ar: 'شراب بـ12 فيتامينًا و5 معادن مع إل-ليسين يحسّن الشهية والمناعة ويدعم أقصى نمو وتطور.',
    },
    description: {
      en: 'Vitelormed combines 12 vitamins and 5 minerals with the essential amino acid L-lysine in a single daily syrup formulated for maximum growth and development. A full B-complex (B1, B2, B3, B5, B6, B7, B9 and B12) supports energy metabolism, vitamins A, C, D3 and E add antioxidant, immune and bone support, and zinc, iron, magnesium, calcium and iodine cover the essential minerals. Together they help improve appetite and immunity, support the management of malnutrition, and sustain mental and physical activity.',
      ar: 'يجمع فيتيلورميد 12 فيتامينًا و5 معادن مع الحمض الأميني الأساسي إل-ليسين في شراب يومي واحد صُمم لأقصى نمو وتطور. تدعم مجموعة فيتامينات ب الكاملة (ب1، ب2، ب3، ب5، ب6، ب7، ب9 وب12) استقلاب الطاقة، بينما تضيف فيتامينات أ وج ود3 وهـ دعمًا مضادًا للأكسدة وللمناعة والعظام، ويغطي الزنك والحديد والمغنيسيوم والكالسيوم واليود المعادن الأساسية. تساعد معًا على تحسين الشهية والمناعة، ودعم علاج سوء التغذية، والحفاظ على النشاط الذهني والبدني.',
    },
    keyIngredients: [
      {
        name: { en: 'L-Lysine', ar: 'إل-ليسين' },
        note: {
          en: 'Essential amino acid — supports appetite, growth and development',
          ar: 'حمض أميني أساسي — يدعم الشهية والنمو والتطور',
        },
      },
      {
        name: { en: 'Vitamin B Complex', ar: 'مجموعة فيتامينات ب' },
        note: {
          en: 'B1, B2, B3 (niacin), B5, B6, B7 (biotin), B9 (folic acid) & B12 — support energy metabolism',
          ar: 'ب1، ب2، ب3 (نياسين)، ب5، ب6، ب7 (بيوتين)، ب9 (حمض الفوليك) وب12 — تدعم استقلاب الطاقة',
        },
      },
      {
        name: { en: 'Vitamins A, C, D3 & E', ar: 'فيتامينات أ، ج، د3 وهـ' },
        note: {
          en: 'Antioxidant, immune & bone support',
          ar: 'دعم مضاد للأكسدة وللمناعة والعظام',
        },
      },
      {
        name: { en: 'Zinc, Iron, Magnesium, Calcium & Iodine', ar: 'الزنك، الحديد، المغنيسيوم، الكالسيوم واليود' },
        note: { en: 'Five essential minerals', ar: 'خمسة معادن أساسية' },
      },
    ],
    benefits: [
      { en: 'Helps improve appetite', ar: 'يساعد على تحسين الشهية' },
      { en: 'Supports immunity', ar: 'يدعم المناعة' },
      { en: 'Supports the management of malnutrition', ar: 'يدعم علاج سوء التغذية' },
      { en: 'Supports mental and physical activity', ar: 'يدعم النشاط الذهني والبدني' },
    ],
    usage: {
      en: 'Children 3–6 years: 2.5 ml daily. Children 7–12 years: 5 ml daily. Children above 12 & adults: 10 ml daily. For infants under 3, use only after consulting a doctor.',
      ar: 'الأطفال 3–6 سنوات: 2.5 مل يوميًا. الأطفال 7–12 سنة: 5 مل يوميًا. الأطفال فوق 12 سنة والبالغون: 10 مل يوميًا. للأطفال دون 3 سنوات، يُستخدم فقط بعد استشارة الطبيب.',
    },
    related: ['ferolormed', 'imulormed', 'smartod-d'],
  },
  {
    slug: 'gotolor',
    youtubeId: '9gBnA-kvZLo',
    name: { en: 'Gotolor', ar: 'جوتولور' },
    tagline: { en: 'A step to easier days', ar: 'خطوة نحو أيام أسهل' },
    category: 'kids-health',
    status: 'available',
    form: { en: 'Syrup', ar: 'شراب' },
    ageGroup: { en: 'Infants & children', ar: 'الرضع والأطفال' },
    pack: { en: '100 ml bottle', ar: 'زجاجة 100 مل' },
    accent: 'orange',
    image: '/media/gotolor.webp',
    price: 90,
    shortDescription: {
      en: 'An alpha-amylase digestive enzyme syrup that soothes sore throat, eases digestion and helps defend against respiratory infections.',
      ar: 'شراب إنزيم هضمي ألفا-أميليز يهدئ التهاب الحلق ويسهّل الهضم ويساعد على مقاومة التهابات الجهاز التنفسي.',
    },
    description: {
      en: 'Gotolor is a children’s digestive enzyme syrup built around alpha-amylase (200 U.CEIP per ml). Its anti-inflammatory action helps relieve sore throat and reduce swelling — especially after surgery or injury — while the enzyme supports the breakdown of starches for easier carbohydrate digestion. It also helps boost the immune system to prevent and relieve upper respiratory tract infections. A gentle, great-tasting dietary supplement for easier days.',
      ar: 'جوتولور شراب إنزيم هضمي للأطفال يعتمد على ألفا-أميليز (200 وحدة لكل مل). يساعد تأثيره المضاد للالتهاب على تخفيف التهاب الحلق وتقليل التورم — خاصة بعد الجراحة أو الإصابة — بينما يدعم الإنزيم تكسير النشويات لتسهيل هضم الكربوهيدرات. كما يساعد على تعزيز الجهاز المناعي للوقاية من التهابات الجهاز التنفسي العلوي وتخفيفها. مكمل غذائي لطيف ولذيذ الطعم لأيام أسهل.',
    },
    keyIngredients: [
      {
        name: { en: 'Alpha-Amylase', ar: 'ألفا-أميليز' },
        note: {
          en: 'Digestive enzyme — 200 U.CEIP per ml',
          ar: 'إنزيم هضمي — 200 وحدة لكل مل',
        },
      },
    ],
    benefits: [
      { en: 'Helps relieve sore throat and reduce inflammation', ar: 'يساعد على تخفيف التهاب الحلق وتقليل الالتهاب' },
      { en: 'Eases swelling — beneficial post-surgery or injury', ar: 'يخفف التورم — مفيد بعد الجراحة أو الإصابة' },
      { en: 'Supports carbohydrate digestion and relieves indigestion', ar: 'يدعم هضم الكربوهيدرات ويخفف عسر الهضم' },
      { en: 'Boosts immunity against upper respiratory tract infections', ar: 'يعزز المناعة ضد التهابات الجهاز التنفسي العلوي' },
    ],
    usage: {
      en: 'Infants & children up to 3 years (15 kg): 5 ml (1 teaspoon, 1000 U.CEIP) three times daily. Children over 3 years (above 15 kg): 10 ml (1 tablespoon, 2000 U.CEIP) three times daily.',
      ar: 'الرضع والأطفال حتى 3 سنوات (15 كجم): 5 مل (ملعقة صغيرة، 1000 وحدة) ثلاث مرات يوميًا. الأطفال فوق 3 سنوات (أكثر من 15 كجم): 10 مل (ملعقة كبيرة، 2000 وحدة) ثلاث مرات يوميًا.',
    },
    related: ['ivylor', 'coglern-syrup', 'imulormed'],
  },
  {
    slug: 'welcaderm-lotion',
    youtubeId: 'uklJ3AK7xB8',
    name: { en: 'Welcaderm Lotion', ar: 'ويلكاديرم لوشن' },
    tagline: { en: 'Calamine, chamomile & olive oil', ar: 'كالامين وبابونج وزيت زيتون' },
    category: 'dermatology',
    status: 'available',
    form: { en: 'Lotion', ar: 'لوشن' },
    ageGroup: { en: 'All ages', ar: 'جميع الأعمار' },
    pack: { en: '120 ml bottle', ar: 'زجاجة 120 مل' },
    accent: 'purple',
    image: '/media/welcaderm.webp',
    price: 95,
    shortDescription: {
      en: 'A skin soothing lotion with calamine, chamomile oil and olive oil, for external use.',
      ar: 'لوشن ملطّف للبشرة يحتوي على الكالامين وزيت البابونج وزيت الزيتون، للاستعمال الخارجي.',
    },
    description: {
      en: 'Welcaderm is a skin soothing lotion built on three familiar ingredients: calamine, long used to calm and protect irritated skin; chamomile oil, a soothing botanical; and olive oil, an emollient that softens the skin and helps it hold moisture. It is a cosmetic product for external use only, supplied in a 120 ml bottle.',
      ar: 'ويلكاديرم لوشن ملطّف للبشرة يعتمد على ثلاثة مكونات معروفة: الكالامين الذي يُستخدم منذ زمن لتهدئة البشرة المتهيّجة وحمايتها، وزيت البابونج المهدّئ، وزيت الزيتون المُلطّف الذي يُنعّم البشرة ويساعدها على الاحتفاظ بالرطوبة. منتج تجميلي للاستعمال الخارجي فقط، في زجاجة 120 مل.',
    },
    // Ingredients, net weight and the "cosmetic product / external use only"
    // wording below are taken straight off the Welcaderm bottle and carton.
    keyIngredients: [
      {
        name: { en: 'Calamine', ar: 'الكالامين' },
        note: {
          en: 'Long used to calm and protect irritated skin',
          ar: 'يُستخدم منذ زمن لتهدئة البشرة المتهيّجة وحمايتها',
        },
      },
      {
        name: { en: 'Chamomile Oil', ar: 'زيت البابونج' },
        note: { en: 'Soothing botanical oil', ar: 'زيت نباتي مهدّئ للبشرة' },
      },
      {
        name: { en: 'Olive Oil', ar: 'زيت الزيتون' },
        note: {
          en: 'Emollient — softens skin and helps it hold moisture',
          ar: 'مُلطّف — يُنعّم البشرة ويساعدها على الاحتفاظ بالرطوبة',
        },
      },
    ],
    benefits: [
      { en: 'Calamine helps calm and soothe the skin', ar: 'الكالامين يساعد على تهدئة البشرة' },
      {
        en: 'Chamomile and olive oil soften and comfort dry skin',
        ar: 'البابونج وزيت الزيتون يُنعّمان البشرة الجافة ويمنحانها الراحة',
      },
      { en: 'Suitable for all ages', ar: 'مناسب لجميع الأعمار' },
      { en: 'Cosmetic product — for external use only', ar: 'منتج تجميلي — للاستعمال الخارجي فقط' },
    ],
    usage: {
      en: 'Apply a thin layer to clean, dry skin as often as needed. For external use only.',
      ar: 'يُوضع طبقة رقيقة على بشرة نظيفة وجافة حسب الحاجة. للاستعمال الخارجي فقط.',
    },
    related: ['vitelormed', 'imulormed', 'ivylor'],
  },
  {
    slug: 'imulormed',
    name: { en: 'Imulormed', ar: 'إميولورميد' },
    tagline: { en: 'Everyday immune resilience', ar: 'مناعة قوية كل يوم' },
    category: 'immune-support',
    status: 'under-registration',
    form: { en: 'Oral drops', ar: 'نقط بالفم' },
    ageGroup: { en: 'Infants & children 3 months – 5 years', ar: 'الرضع والأطفال من 3 أشهر إلى 5 سنوات' },
    pack: { en: 'Dropper bottle with measuring guide', ar: 'زجاجة بقطارة مع دليل القياس' },
    accent: 'orange',
    image: '/media/Imulormed.webp',
    price: 180,
    shortDescription: {
      en: 'A botanical immune formula combining elderberry extract with vitamin C, zinc, folic acid and vitamin B12.',
      ar: 'تركيبة نباتية لدعم المناعة تجمع مستخلص البلسان مع فيتامين ج والزنك وحمض الفوليك وفيتامين ب12.',
    },
    description: {
      en: 'Imulormed brings together elderberry extract — one of nature’s most trusted immune botanicals — reinforced with vitamin C, zinc, folic acid and vitamin B12. The formula is designed to support the body’s natural defences from infancy, offering a gentle daily ritual that’s easy to add to juice or water.',
      ar: 'يجمع إميولورميد مستخلص البلسان — أحد أكثر النباتات الموثوقة لدعم المناعة — مدعّمًا بفيتامين ج والزنك وحمض الفوليك وفيتامين ب12. صُممت التركيبة لدعم دفاعات الجسم الطبيعية منذ الرضاعة، وتقدّم روتينًا يوميًا لطيفًا يسهل إضافته إلى العصير أو الماء.',
    },
    keyIngredients: [
      {
        name: { en: 'Elderberry Extract', ar: 'مستخلص البلسان' },
        note: { en: 'Traditional immunostimulant botanical', ar: 'نبات تقليدي منشّط للمناعة' },
      },
      {
        name: { en: 'Vitamin C', ar: 'فيتامين ج' },
        note: { en: 'Contributes to normal immune function', ar: 'يساهم في الوظيفة الطبيعية للمناعة' },
      },
      {
        name: { en: 'Zinc', ar: 'الزنك' },
        note: { en: 'Supports the immune system', ar: 'يدعم الجهاز المناعي' },
      },
      {
        name: { en: 'Folic Acid', ar: 'حمض الفوليك' },
        note: { en: 'Supports normal development', ar: 'يدعم النمو الطبيعي' },
      },
      {
        name: { en: 'Vitamin B12', ar: 'فيتامين ب12' },
        note: { en: 'Supports normal immune function', ar: 'يدعم الوظيفة الطبيعية للمناعة' },
      },
    ],
    benefits: [
      { en: 'Supports the normal function of the immune system', ar: 'يدعم الوظيفة الطبيعية للجهاز المناعي' },
      { en: 'Antioxidant protection from elderberry extract', ar: 'حماية مضادة للأكسدة من مستخلص البلسان' },
      { en: 'Simple dosing — added to juice or water', ar: 'جرعة بسيطة — تُضاف إلى العصير أو الماء' },
      { en: 'Suitable from 3 months of age', ar: 'مناسب من عمر 3 أشهر' },
    ],
    usage: {
      en: 'Infants & children 3 months – 1 year: 1 ml once daily, added to juice or water. Children 1–5 years: 1 ml twice daily.',
      ar: 'الرضع والأطفال من 3 أشهر إلى سنة: 1 مل مرة واحدة يوميًا، تُضاف إلى العصير أو الماء. الأطفال من 1 إلى 5 سنوات: 1 مل مرتين يوميًا.',
    },
    related: ['vitelormed', 'ivylor', 'smartod'],
  },
  {
    slug: 'ferolormed',
    name: { en: 'Ferolormed', ar: 'فيرولورميد' },
    tagline: { en: 'Gentle iron, restored energy', ar: 'حديد لطيف وطاقة متجددة' },
    category: 'vitamins-minerals',
    status: 'under-registration',
    form: { en: 'Syrup', ar: 'شراب' },
    ageGroup: { en: 'Children & adults', ar: 'الأطفال والبالغون' },
    pack: { en: 'Bottle with dosing cup', ar: 'زجاجة مع كوب قياس' },
    accent: 'purple',
    image: '/media/Ferolormed.webp',
    price: 150,
    shortDescription: {
      en: 'A gentle iron formula with folate and vitamin C to support red blood cell formation and reduce tiredness.',
      ar: 'تركيبة حديد لطيفة مع الفولات وفيتامين ج لدعم تكوين كرات الدم الحمراء وتقليل الإرهاق.',
    },
    description: {
      en: 'Ferolormed pairs ferrous bisglycinate — an iron form chosen for gentleness on the stomach — with folate and vitamin C, which enhances iron absorption. Formulated to support normal red blood cell formation and help reduce tiredness and fatigue without the harshness often associated with iron supplements.',
      ar: 'يجمع فيرولورميد بين بيسجليسينات الحديد — وهو شكل من الحديد اختير للطفه على المعدة — والفولات وفيتامين ج الذي يعزز امتصاص الحديد. صُمم لدعم التكوين الطبيعي لكرات الدم الحمراء والمساعدة على تقليل التعب والإرهاق دون الآثار المزعجة المرتبطة عادة بمكملات الحديد.',
    },
    keyIngredients: [
      {
        name: { en: 'Iron (Ferrous Bisglycinate)', ar: 'الحديد (بيسجليسينات الحديد)' },
        note: { en: 'Supports red blood cell formation', ar: 'يدعم تكوين كرات الدم الحمراء' },
      },
      {
        name: { en: 'Folate (Folic Acid)', ar: 'الفولات (حمض الفوليك)' },
        note: { en: 'Supports normal blood formation', ar: 'يدعم تكوين الدم الطبيعي' },
      },
      {
        name: { en: 'Vitamin C (L-Ascorbic Acid)', ar: 'فيتامين ج (حمض الأسكوربيك)' },
        note: { en: 'Enhances iron absorption', ar: 'يعزز امتصاص الحديد' },
      },
    ],
    benefits: [
      { en: 'Supports normal red blood cell formation', ar: 'يدعم التكوين الطبيعي لكرات الدم الحمراء' },
      { en: 'Helps reduce tiredness and fatigue', ar: 'يساعد على تقليل التعب والإرهاق' },
      { en: 'Gentle on the stomach', ar: 'لطيف على المعدة' },
      { en: 'Vitamin C enhances absorption', ar: 'فيتامين ج يعزز الامتصاص' },
    ],
    usage: { en: 'As directed by your doctor or pharmacist.', ar: 'حسب إرشادات الطبيب أو الصيدلي.' },
    related: ['vitelormed', 'imulormed', 'smartod-d'],
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
