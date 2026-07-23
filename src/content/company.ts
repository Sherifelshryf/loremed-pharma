import type { LucideIcon } from 'lucide-react';
import {
  ShieldCheck,
  FlaskConical,
  Microscope,
  Leaf,
  HeartPulse,
  Factory,
  Award,
  Globe2,
  Sparkles,
  Recycle,
  Users,
  Target,
  Beaker,
  ClipboardCheck,
  Truck,
  Baby,
  Brain,
  Stethoscope,
} from 'lucide-react';

/** ------------------------------------------------------------------
 *  WHY LOREMED — differentiators
 *  ------------------------------------------------------------------ */
export const valueProps: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: FlaskConical,
    title: 'Science at the core',
    body: 'Every formula begins in the lab — evidence-led, standardised and built on active ingredients that deliver what the label promises.',
  },
  {
    icon: ShieldCheck,
    title: 'Uncompromising quality',
    body: 'Production is held to GMP-grade discipline, with each batch tested and released only when it meets our specification in full.',
  },
  {
    icon: Leaf,
    title: 'Nature, refined',
    body: 'We pair trusted botanicals — elderberry, ivy leaf, black seed — with modern pharmaceutical precision for the best of both worlds.',
  },
  {
    icon: HeartPulse,
    title: 'Built around families',
    body: 'From gentle children’s syrups to daily adult essentials, our range is designed for real households and real quality of life.',
  },
  {
    icon: Sparkles,
    title: 'Fast, focused innovation',
    body: 'A lean pipeline moving quickly — 30+ formulations in development across six therapeutic areas.',
  },
  {
    icon: Globe2,
    title: 'Ready for the region',
    body: 'Formulated, packaged and documented to registration standards that open doors across the Middle East and Africa.',
  },
];

/** ------------------------------------------------------------------
 *  HEADLINE STATISTICS
 *  ------------------------------------------------------------------ */
export const stats: { value: number; suffix?: string; prefix?: string; label: string }[] = [
  { value: 30, suffix: '+', label: 'Formulations in development' },
  { value: 9, label: 'Products in market & registration' },
  { value: 6, label: 'Therapeutic areas' },
  { value: 100, suffix: '%', label: 'Commitment to GMP quality' },
];

/** ------------------------------------------------------------------
 *  ABOUT
 *  ------------------------------------------------------------------ */
export const about = {
  story: [
    'Loremed Pharma was founded on a simple conviction: that world-class medicine and nutrition should be within reach of every family in our region.',
    'We are a young, fast-moving pharmaceutical and nutraceutical company — combining the rigour of pharmaceutical science with the warmth of products people actually enjoy taking. From our first formulations to a pipeline now more than thirty strong, our growth has been guided by one measure of success: the quality of life we help create.',
  ],
  vision: {
    title: 'Vision',
    body: 'To become a trusted name in regional healthcare — recognised for the quality, integrity and human impact of everything we make.',
  },
  mission: {
    title: 'Mission',
    body: 'To develop, manufacture and deliver science-backed medicines and nutritional supplements that improve everyday health and quality of life, held to the highest standards of safety and care.',
  },
  values: [
    { icon: ShieldCheck, title: 'Integrity', body: 'We do what is right for patients and partners — every batch, every time.' },
    { icon: Microscope, title: 'Excellence', body: 'We hold our science and our quality to standards higher than the market demands.' },
    { icon: HeartPulse, title: 'Care', body: 'People are at the centre of every decision. We care about quality of life.' },
    { icon: Sparkles, title: 'Innovation', body: 'We move fast and think ahead, turning good science into better products.' },
  ],
};

/** ------------------------------------------------------------------
 *  TIMELINE
 *  ------------------------------------------------------------------ */
export const timeline: { year: string; title: string; body: string }[] = [
  { year: '2023', title: 'Loremed is founded', body: 'The company is established with a clear ambition: rapid, responsible growth in pharmaceuticals and nutrition.' },
  { year: '2023', title: 'First formulations', body: 'Our earliest immune, respiratory and vitamin products reach the market under GMP-grade production.' },
  { year: '2024', title: 'Range expands', body: 'The catalogue broadens across immune support, kids health, omega and dermatology as demand grows.' },
  { year: '2025', title: '30+ in the pipeline', body: 'Research and development scales to more than thirty formulations across six therapeutic areas.' },
  { year: '2026', title: 'Regional horizons', body: 'Documentation and registration work opens the next markets across the Middle East and Africa.' },
];

/** ------------------------------------------------------------------
 *  LEADERSHIP (structure — role based)
 *  ------------------------------------------------------------------ */
export const leadership: { role: string; monogram: string; focus: string }[] = [
  { role: 'Managing Director', monogram: 'MD', focus: 'Sets the strategic direction and stewards Loremed’s long-term growth and culture.' },
  { role: 'Head of Research & Development', monogram: 'RD', focus: 'Leads formulation science, from botanical extracts to finished dosage forms.' },
  { role: 'Quality & Regulatory Director', monogram: 'QA', focus: 'Owns quality assurance, GMP compliance and product registration across markets.' },
  { role: 'Commercial Director', monogram: 'CD', focus: 'Builds the partnerships and channels that put Loremed products in patients’ hands.' },
];

/** ------------------------------------------------------------------
 *  STANDARDS & COMPLIANCE
 *  ------------------------------------------------------------------ */
export const standards: { icon: LucideIcon; code: string; title: string; body: string }[] = [
  { icon: Factory, code: 'GMP', title: 'Good Manufacturing Practice', body: 'Production and controls operated to GMP-grade discipline at every stage.' },
  { icon: ClipboardCheck, code: 'EDA', title: 'Regulatory Registration', body: 'Products developed and documented for registration with the national drug authority.' },
  { icon: Award, code: 'ISO 9001', title: 'Quality Management', body: 'Quality systems built around the principles of ISO 9001 continuous improvement.' },
  { icon: Recycle, code: 'ISO 14001', title: 'Environmental Care', body: 'Operations designed with environmental responsibility and waste reduction in mind.' },
  { icon: ShieldCheck, code: 'ISO 45001', title: 'Health & Safety', body: 'A safe workplace framework protecting the people who make our products.' },
  { icon: Beaker, code: 'QC', title: 'Batch Testing & Release', body: 'Every batch is analytically tested and released only against full specification.' },
];

/** ------------------------------------------------------------------
 *  MANUFACTURING & R&D CAPABILITIES
 *  ------------------------------------------------------------------ */
export const manufacturingCapabilities: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Factory, title: 'GMP-grade production', body: 'Controlled environments, validated processes and documented traceability from raw material to finished pack.' },
  { icon: Beaker, title: 'Multi-form capability', body: 'Syrups, softgels, film-coated tablets, drops and topical lotions produced on modern lines.' },
  { icon: ClipboardCheck, title: 'In-process controls', body: 'Continuous checks throughout production keep every batch inside specification.' },
  { icon: Truck, title: 'Cold-chain & logistics', body: 'Storage and distribution designed to protect product integrity all the way to the shelf.' },
];

export const rndCapabilities: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: FlaskConical, title: 'Formulation science', body: 'Turning active ingredients and botanicals into stable, palatable, effective products.' },
  { icon: Microscope, title: 'Analytical laboratory', body: 'Method development and testing that verify identity, purity and potency.' },
  { icon: Leaf, title: 'Botanical standardisation', body: 'Consistent, characterised plant extracts that behave the same in every batch.' },
  { icon: Target, title: 'Pipeline development', body: '30+ formulations advancing from concept through registration.' },
];

/** ------------------------------------------------------------------
 *  PARTNERSHIPS (capability statements, region based)
 *  ------------------------------------------------------------------ */
export const partnerships: { region: string; body: string }[] = [
  { region: 'Egypt', body: 'Home market — our products, our people, our standards.' },
  { region: 'Gulf & GCC', body: 'Registration and distribution partnerships across the Gulf.' },
  { region: 'North Africa', body: 'Formulations documented for neighbouring North-African markets.' },
  { region: 'Sub-Saharan Africa', body: 'Building channels to bring quality nutrition further afield.' },
];

/** ------------------------------------------------------------------
 *  HEALTHCARE PROFESSIONALS — value points
 *  ------------------------------------------------------------------ */
export const professionalValue: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Stethoscope, title: 'Evidence you can stand behind', body: 'Standardised actives and transparent formulations you can confidently recommend.' },
  { icon: Baby, title: 'Options for every patient', body: 'From paediatric syrups to adult daily essentials across six therapeutic areas.' },
  { icon: Brain, title: 'Scientific support', body: 'Product dossiers and medical information available to healthcare professionals.' },
];

/** ------------------------------------------------------------------
 *  TESTIMONIALS (role-based professional voices)
 *  ------------------------------------------------------------------ */
export const testimonials: { quote: string; name: string; role: string }[] = [
  {
    quote:
      'The consistency batch-to-batch is what earns my trust. Loremed’s standardised botanicals behave exactly as expected, which makes them easy to recommend.',
    name: 'Community Pharmacist',
    role: 'Independent Pharmacy',
  },
  {
    quote:
      'Parents come back for the children’s range because the kids actually take it. Good science and a formula families enjoy is a rare combination.',
    name: 'Paediatric Nutrition Specialist',
    role: 'Family Health Clinic',
  },
  {
    quote:
      'From documentation to delivery, Loremed operates like a much larger company. They make it straightforward to bring quality products to our market.',
    name: 'Regional Distribution Partner',
    role: 'Gulf Healthcare Distributor',
  },
];

/** ------------------------------------------------------------------
 *  LATEST NEWS
 *  ------------------------------------------------------------------ */
export const news: {
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
}[] = [
  {
    slug: 'pipeline-passes-thirty-formulations',
    date: '2026-05-18',
    category: 'Research & Development',
    title: 'Loremed pipeline passes thirty formulations',
    excerpt:
      'Our R&D pipeline now spans more than thirty products across six therapeutic areas, from immune support to dermatology.',
  },
  {
    slug: 'new-registrations-under-review',
    date: '2026-03-02',
    category: 'Regulatory',
    title: 'Three flagship formulas enter final registration',
    excerpt:
      'Ivylor Advance, Coglern Syrup and SmartOD D advance into the final stages of regulatory registration.',
  },
  {
    slug: 'quality-systems-milestone',
    date: '2025-11-20',
    category: 'Quality',
    title: 'Quality systems reach a new benchmark',
    excerpt:
      'Loremed strengthens its GMP-grade quality framework with expanded in-house analytical testing capability.',
  },
  {
    slug: 'regional-distribution-partnerships',
    date: '2025-09-09',
    category: 'Partnerships',
    title: 'New distribution partnerships across the Gulf',
    excerpt:
      'Fresh agreements extend Loremed’s reach across the GCC, bringing our nutrition range to new communities.',
  },
];

/** ------------------------------------------------------------------
 *  FAQ
 *  ------------------------------------------------------------------ */
export const faqs: { q: string; a: string }[] = [
  {
    q: 'Where are Loremed products manufactured?',
    a: 'Loremed products are produced to GMP-grade standards with documented traceability from raw material to finished pack, and every batch is analytically tested before release.',
  },
  {
    q: 'Are your supplements suitable for children?',
    a: 'Several products — including our immune and respiratory syrups and the Coglern children’s range — are specifically formulated for children. Always check the label for the appropriate age and dose, and consult your pharmacist or paediatrician.',
  },
  {
    q: 'What is the difference between “Available Now” and “Under Registration”?',
    a: '“Available Now” products are registered and on the market. “Under Registration” products have completed development and are progressing through regulatory registration ahead of launch.',
  },
  {
    q: 'How can I become a distribution partner?',
    a: 'We welcome partnership enquiries across the Middle East and Africa. Reach our commercial team through the contact page and select the Export or Sales department.',
  },
  {
    q: 'Do you provide information for healthcare professionals?',
    a: 'Yes. Product dossiers and medical information are available to healthcare professionals on request through our Medical Information department.',
  },
];

export const iconRefs = { Users, Globe2 };
