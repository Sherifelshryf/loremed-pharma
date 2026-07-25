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
  country: 'Egypt',
  city: 'Cairo',
  email: 'info@loremedpharma.com',
  phoneDisplay: '+20 (0) 000 000 000',
  phone: '+200000000000',
  /** WhatsApp number orders are sent to, digits only (no +), for wa.me links. */
  orderWhatsAppNumber: '201055999630',
  deliveryFee: 30,
  currency: { en: 'EGP', ar: 'ج.م' } as Bi,
  address: {
    line1: 'Loremed Pharma',
    city: 'Cairo',
    region: 'Greater Cairo',
    country: 'Egypt',
  },
  /** Google Maps link to the Loremed HQ pin (used by the contact-page map). */
  mapsUrl: 'https://maps.app.goo.gl/87XziRrbbUxt1NFk7',
  /** HQ coordinates — power the live embedded map on the contact page. */
  coordinates: { lat: 30.0934193, lng: 31.3186265 },
  social: {
    facebook: 'https://www.facebook.com/loremedpharma/',
    youtube: 'https://www.youtube.com/',
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
      { label: { en: 'All Products', ar: 'كل المنتجات' }, href: '/products', description: { en: 'Browse the full Loremed catalogue', ar: 'تصفّح كتالوج لورميد بالكامل' } },
      { label: { en: 'Available Now', ar: 'متوفر الآن' }, href: '/products?status=available', description: { en: 'Registered & on the market', ar: 'مسجَّل ومتوفر في السوق' } },
      { label: { en: 'Under Registration', ar: 'قيد التسجيل' }, href: '/products?status=under-registration', description: { en: 'The next wave of the pipeline', ar: 'الموجة القادمة من خط الأبحاث' } },
      { label: { en: 'Immune Support', ar: 'دعم المناعة' }, href: '/products?category=immune-support', description: { en: 'Elderberry & zinc formulas', ar: 'تركيبات بالبلسان والزنك' } },
      { label: { en: 'Kids Health', ar: 'صحة الأطفال' }, href: '/products?category=kids-health', description: { en: 'Gentle formulas for children', ar: 'تركيبات لطيفة للأطفال' } },
      { label: { en: 'Vitamins & Minerals', ar: 'الفيتامينات والمعادن' }, href: '/products?category=vitamins-minerals', description: { en: 'Everyday essential nutrition', ar: 'تغذية أساسية يومية' } },
    ],
  },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: { en: 'Our Story', ar: 'قصتنا' }, href: '/about#story', description: { en: 'Who we are and why we started', ar: 'من نحن ولماذا بدأنا' } },
      { label: { en: 'Vision & Mission', ar: 'الرؤية والرسالة' }, href: '/about#vision', description: { en: 'The future we are building', ar: 'المستقبل الذي نبنيه' } },
      { label: { en: 'Leadership', ar: 'القيادة' }, href: '/about#leadership', description: { en: 'The people behind Loremed', ar: 'الأشخاص وراء لورميد' } },
      { label: { en: 'Timeline', ar: 'المسيرة الزمنية' }, href: '/about#timeline', description: { en: 'Our journey, year by year', ar: 'مسيرتنا، عامًا بعد عام' } },
    ],
  },
  {
    label: 'Quality',
    href: '/quality',
    children: [
      { label: { en: 'Quality Assurance', ar: 'ضمان الجودة' }, href: '/quality#assurance', description: { en: 'How we guarantee every batch', ar: 'كيف نضمن جودة كل دفعة' } },
      { label: { en: 'Manufacturing', ar: 'التصنيع' }, href: '/quality#manufacturing', description: { en: 'GMP-grade production', ar: 'إنتاج بمعايير GMP' } },
      { label: { en: 'Standards & Compliance', ar: 'المعايير والامتثال' }, href: '/quality#standards', description: { en: 'GMP, ISO & EDA frameworks', ar: 'أطر GMP وISO وهيئة الدواء' } },
    ],
  },
  {
    label: 'R&D',
    href: '/research',
    children: [
      { label: { en: 'Research & Innovation', ar: 'البحث والابتكار' }, href: '/research#innovation', description: { en: 'Where our science begins', ar: 'حيث يبدأ علمنا' } },
      { label: { en: 'Pipeline', ar: 'خط الأبحاث' }, href: '/research#pipeline', description: { en: '30+ formulations in development', ar: 'أكثر من 30 تركيبة قيد التطوير' } },
      { label: { en: 'Technology', ar: 'التقنية' }, href: '/research#technology', description: { en: 'Formulation & analytical labs', ar: 'معامل التركيب والتحليل' } },
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
      { label: { en: 'For Professionals', ar: 'لأخصائيي الرعاية الصحية' }, href: '/#professionals' },
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

export const medicalDisclaimer =
  'The information on this website is provided for general awareness and is not a substitute for professional medical advice, diagnosis or treatment. Nutritional supplements are not intended to diagnose, treat, cure or prevent any disease. Always read the label and consult a qualified healthcare professional or pharmacist before use.';
