/**
 * Central site configuration — the single source of truth for company
 * metadata, navigation and contact details. Structured so it can be lifted
 * into a headless CMS (Sanity / Strapi / Contentful) without UI changes.
 */

import type { Bi } from '@/i18n/dictionaries';

export const site = {
  name: 'Loremed Pharma',
  legalName: 'Loremed Pharma',
  shortName: 'Loremed',
  tagline: 'We care about quality of life',
  domain: 'loremedpharma.com',
  url: 'https://loremedpharma.com',
  locale: 'en',
  description:
    'Loremed Pharma is a fast-growing pharmaceutical and nutraceutical company crafting science-backed medicines and nutritional supplements that raise the quality of life for families across the region.',
  foundingYear: 2023,
  email: 'info@loremedpharma.com',
  phoneDisplay: '+20 101 164 4300',
  phone: '+201011644300',
  /** WhatsApp number orders are sent to, digits only (no +), for wa.me links. */
  orderWhatsAppNumber: '201011644300',
  /** Same number, human-readable — shown to customers as the order follow-up line. */
  orderWhatsAppDisplay: '+20 101 164 4300',
  /**
   * Trade line. Pharmacy and distributor enquiries go to a different number
   * from retail orders so the wholesale team picks them up directly.
   */
  wholesaleWhatsAppNumber: '201222208472',
  wholesaleWhatsAppDisplay: '+20 122 220 8472',
  deliveryFee: 30,
  currency: { en: 'EGP', ar: 'ج.م' } as Bi,
  /**
   * The postal address as a machine reads it — this is what goes into the
   * schema.org PostalAddress, so it stays in English and in the shape search
   * engines expect. Anything shown to a visitor uses the two labels below.
   */
  address: {
    line1: 'Loremed Pharma',
    city: 'Cairo',
    region: 'Greater Cairo',
    country: 'Egypt',
  },
  /**
   * The same place, as a person reads it. Held as one string per language
   * rather than assembled from city and country at each call site: the
   * separator differs — Arabic uses ، rather than , — and it was being written
   * by hand in four places, in Latin, on the Arabic side of the site.
   */
  locationLabel: { en: 'Cairo, Egypt', ar: 'القاهرة، مصر' } as Bi,
  regionLabel: { en: 'Greater Cairo', ar: 'القاهرة الكبرى' } as Bi,
  /** Google Maps link to the Loremed HQ pin (used by the contact-page map). */
  mapsUrl: 'https://maps.app.goo.gl/87XziRrbbUxt1NFk7',
  /** HQ coordinates — power the live embedded map on the contact page. */
  coordinates: { lat: 30.0934193, lng: 31.3186265 },
  social: {
    facebook: 'https://www.facebook.com/loremedpharma/',
    youtube: 'https://www.youtube.com/channel/UCr8Ll1DsrzHh1JPyyFYHvmA',
    linkedin: 'https://www.linkedin.com/in/loremed-pharma-497361399/',
  },
} as const;

export type NavChild = {
  label: Bi;
  href: string;
  description?: Bi;
};

export type NavItem = {
  /** Plain-string key used to look up the nav.* dictionary entry for top-level items. */
  label: string;
  href: string;
  children?: NavChild[];
  featured?: boolean;
};

export const primaryNav: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Products',
    href: '/products',
    children: [
      { label: { en: 'All Products', ar: 'كل المنتجات' }, href: '/products', description: { en: 'Browse the full Loremed catalogue', ar: 'اتفرج على كل منتجات لورميد' } },
      { label: { en: 'Available Now', ar: 'متوفر الآن' }, href: '/products?status=available', description: { en: 'Registered & on the market', ar: 'مسجّل ومتاح في السوق' } },
      { label: { en: 'Under Registration', ar: 'قيد التسجيل' }, href: '/products?status=under-registration', description: { en: 'The next wave of the pipeline', ar: 'اللي جاي من خط الأبحاث' } },
      { label: { en: 'Immune Support', ar: 'دعم المناعة' }, href: '/products?category=immune-support', description: { en: 'Elderberry & zinc formulas', ar: 'تركيبات بالبلسان والزنك' } },
      { label: { en: 'Kids Health', ar: 'صحة الأطفال' }, href: '/products?category=kids-health', description: { en: 'Gentle formulas for children', ar: 'تركيبات لطيفة مخصوص للأطفال' } },
      { label: { en: 'Vitamins & Minerals', ar: 'الفيتامينات والمعادن' }, href: '/products?category=vitamins-minerals', description: { en: 'Everyday essential nutrition', ar: 'تغذية يومية أساسية' } },
    ],
  },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: { en: 'Our Story', ar: 'قصتنا' }, href: '/about#story', description: { en: 'Who we are and why we started', ar: 'إحنا مين، وليه بدأنا' } },
      { label: { en: 'Vision & Mission', ar: 'الرؤية والرسالة' }, href: '/about#vision', description: { en: 'The future we are building', ar: 'المستقبل اللي بنبنيه' } },
      { label: { en: 'Leadership', ar: 'القيادة' }, href: '/about#leadership', description: { en: 'The people behind Loremed', ar: 'الناس اللي ورا لورميد' } },
      { label: { en: 'Timeline', ar: 'محطات لورميد' }, href: '/about#timeline', description: { en: 'Our journey, year by year', ar: 'خطواتنا سنة ورا سنة' } },
    ],
  },
  {
    label: 'Quality',
    href: '/quality',
    children: [
      { label: { en: 'Quality Assurance', ar: 'ضمان الجودة' }, href: '/quality#assurance', description: { en: 'How we guarantee every batch', ar: 'إزاي بنضمن جودة كل تشغيلة' } },
      { label: { en: 'Manufacturing', ar: 'التصنيع' }, href: '/quality#manufacturing', description: { en: 'GMP-grade production', ar: 'إنتاج بمعايير GMP' } },
      { label: { en: 'Standards & Compliance', ar: 'المعايير والامتثال' }, href: '/quality#standards', description: { en: 'GMP, ISO & EDA frameworks', ar: 'معايير GMP وISO وهيئة الدواء' } },
    ],
  },
  {
    label: 'R&D',
    href: '/research',
    children: [
      { label: { en: 'Research & Innovation', ar: 'البحث والابتكار' }, href: '/research#innovation', description: { en: 'Where our science begins', ar: 'من هنا بيبدأ البحث' } },
      { label: { en: 'Pipeline', ar: 'خط الأبحاث' }, href: '/research#pipeline', description: { en: '30+ formulations in development', ar: 'أكتر من 30 تركيبة تحت التطوير' } },
      { label: { en: 'Technology', ar: 'التقنية' }, href: '/research#technology', description: { en: 'Formulation & analytical labs', ar: 'معامل التركيب والتحاليل' } },
    ],
  },
  { label: 'Contact', href: '/contact' },
];

export const footerNav: { title: Bi; links: { label: Bi; href: string }[] }[] = [
  {
    title: { en: 'Company', ar: 'الشركة' },
    links: [
      { label: { en: 'About Loremed', ar: 'عن لورميد' }, href: '/about' },
      { label: { en: 'Our Story', ar: 'قصتنا' }, href: '/about#story' },
      { label: { en: 'Leadership', ar: 'القيادة' }, href: '/about#leadership' },
      { label: { en: 'Careers', ar: 'الوظائف' }, href: '/contact#departments' },
      { label: { en: 'News', ar: 'الأخبار' }, href: '/#news' },
    ],
  },
  {
    title: { en: 'Products', ar: 'المنتجات' },
    links: [
      { label: { en: 'All Products', ar: 'كل المنتجات' }, href: '/products' },
      { label: { en: 'Available Now', ar: 'متوفر الآن' }, href: '/products?status=available' },
      { label: { en: 'Under Registration', ar: 'قيد التسجيل' }, href: '/products?status=under-registration' },
      { label: { en: 'Immune Support', ar: 'دعم المناعة' }, href: '/products?category=immune-support' },
      { label: { en: 'Kids Health', ar: 'صحة الأطفال' }, href: '/products?category=kids-health' },
    ],
  },
  {
    title: { en: 'Science', ar: 'العلوم' },
    links: [
      { label: { en: 'Quality Assurance', ar: 'ضمان الجودة' }, href: '/quality' },
      { label: { en: 'Manufacturing', ar: 'التصنيع' }, href: '/quality#manufacturing' },
      { label: { en: 'Research & Development', ar: 'البحث والتطوير' }, href: '/research' },
      { label: { en: 'Pipeline', ar: 'خط الأبحاث' }, href: '/research#pipeline' },
      { label: { en: 'For Professionals', ar: 'للأطباء والصيادلة' }, href: '/#professionals' },
    ],
  },
  {
    title: { en: 'Contact', ar: 'تواصل معنا' },
    links: [
      { label: { en: 'Contact Us', ar: 'تواصل معنا' }, href: '/contact' },
      { label: { en: 'Sales', ar: 'المبيعات' }, href: '/contact#departments' },
      { label: { en: 'Medical Information', ar: 'المعلومات الطبية' }, href: '/contact#departments' },
      { label: { en: 'Export', ar: 'التصدير' }, href: '/contact#departments' },
      { label: { en: 'Support', ar: 'الدعم' }, href: '/contact#departments' },
    ],
  },
];

/**
 * The medical disclaimer, shown in the footer of every page and again on the
 * catalogue and each product page.
 *
 * Bilingual like everything else on the site. It was English-only for a while,
 * which meant an Arabic-speaking visitor — most of them — read every claim the
 * site makes about a product and none of the qualification of those claims.
 * That is the one piece of copy where leaving a language out is not merely
 * untidy.
 *
 * The Arabic is a faithful rendering, not a paraphrase: the four verbs
 * (diagnose, treat, cure, prevent) are all there, and nothing is softened. If
 * the English is ever revised, revise both halves together.
 */
export const medicalDisclaimer: Bi = {
  en: 'The information on this website is provided for general awareness and is not a substitute for professional medical advice, diagnosis or treatment. Nutritional supplements are not intended to diagnose, treat, cure or prevent any disease. Always read the label and consult a qualified healthcare professional or pharmacist before use.',
  ar: 'المعلومات اللي على الموقع ده للتوعية العامة، ومش بديل عن استشارة طبية متخصصة ولا تشخيص ولا علاج. المكمّلات الغذائية مش مخصصة لتشخيص أي مرض أو علاجه أو الشفاء منه أو الوقاية منه. اقرا دايمًا البيانات المكتوبة على العبوة، واستشير مختص رعاية صحية مؤهل أو صيدلي قبل الاستخدام.',
};
