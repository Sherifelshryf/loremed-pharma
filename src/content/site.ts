/**
 * Central site configuration — the single source of truth for company
 * metadata, navigation and contact details. Structured so it can be lifted
 * into a headless CMS (Sanity / Strapi / Contentful) without UI changes.
 */

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
  address: {
    line1: 'Loremed Pharma',
    city: 'Cairo',
    region: 'Greater Cairo',
    country: 'Egypt',
  },
  social: {
    facebook: 'https://www.facebook.com/loremedpharma/',
    twitter: 'https://twitter.com/',
    youtube: 'https://www.youtube.com/',
    linkedin: 'https://www.linkedin.com/',
  },
} as const;

export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
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
      { label: 'All Products', href: '/products', description: 'Browse the full Loremed catalogue' },
      { label: 'Available Now', href: '/products?status=available', description: 'Registered & on the market' },
      { label: 'Under Registration', href: '/products?status=under-registration', description: 'The next wave of the pipeline' },
      { label: 'Immune Support', href: '/products?category=immune-support', description: 'Elderberry, black seed & more' },
      { label: 'Kids Health', href: '/products?category=kids-health', description: 'Gentle formulas for children' },
      { label: 'Vitamins & Minerals', href: '/products?category=vitamins-minerals', description: 'Everyday essential nutrition' },
    ],
  },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Our Story', href: '/about#story', description: 'Who we are and why we started' },
      { label: 'Vision & Mission', href: '/about#vision', description: 'The future we are building' },
      { label: 'Leadership', href: '/about#leadership', description: 'The people behind Loremed' },
      { label: 'Timeline', href: '/about#timeline', description: 'Our journey, year by year' },
    ],
  },
  {
    label: 'Quality',
    href: '/quality',
    children: [
      { label: 'Quality Assurance', href: '/quality#assurance', description: 'How we guarantee every batch' },
      { label: 'Manufacturing', href: '/quality#manufacturing', description: 'GMP-grade production' },
      { label: 'Standards & Compliance', href: '/quality#standards', description: 'GMP, ISO & EDA frameworks' },
    ],
  },
  {
    label: 'R&D',
    href: '/research',
    children: [
      { label: 'Research & Innovation', href: '/research#innovation', description: 'Where our science begins' },
      { label: 'Pipeline', href: '/research#pipeline', description: '30+ formulations in development' },
      { label: 'Technology', href: '/research#technology', description: 'Formulation & analytical labs' },
    ],
  },
  { label: 'Contact', href: '/contact' },
];

export const footerNav = [
  {
    title: 'Company',
    links: [
      { label: 'About Loremed', href: '/about' },
      { label: 'Our Story', href: '/about#story' },
      { label: 'Leadership', href: '/about#leadership' },
      { label: 'Careers', href: '/contact#departments' },
      { label: 'News', href: '/#news' },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: 'All Products', href: '/products' },
      { label: 'Available Now', href: '/products?status=available' },
      { label: 'Under Registration', href: '/products?status=under-registration' },
      { label: 'Immune Support', href: '/products?category=immune-support' },
      { label: 'Kids Health', href: '/products?category=kids-health' },
    ],
  },
  {
    title: 'Science',
    links: [
      { label: 'Quality Assurance', href: '/quality' },
      { label: 'Manufacturing', href: '/quality#manufacturing' },
      { label: 'Research & Development', href: '/research' },
      { label: 'Pipeline', href: '/research#pipeline' },
      { label: 'For Professionals', href: '/#professionals' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Sales', href: '/contact#departments' },
      { label: 'Medical Information', href: '/contact#departments' },
      { label: 'Export', href: '/contact#departments' },
      { label: 'Support', href: '/contact#departments' },
    ],
  },
];

export const medicalDisclaimer =
  'The information on this website is provided for general awareness and is not a substitute for professional medical advice, diagnosis or treatment. Nutritional supplements are not intended to diagnose, treat, cure or prevent any disease. Always read the label and consult a qualified healthcare professional or pharmacist before use.';
