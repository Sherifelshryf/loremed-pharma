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

import type { Bi } from '@/i18n/dictionaries';

/** ------------------------------------------------------------------
 *  WHY LOREMED — differentiators
 *  ------------------------------------------------------------------ */
export const valueProps: { icon: LucideIcon; title: Bi; body: Bi }[] = [
  {
    icon: FlaskConical,
    title: { en: 'Science at the core', ar: 'العلم أساس كل حاجة' },
    body: {
      en: 'Every formula begins in the lab — evidence-led, standardised and built on active ingredients that deliver what the label promises.',
      ar: 'كل تركيبة بتبدأ في المعمل — مبنية على أدلة، وموحّدة المعايير، وبمواد فعّالة بتعمل اللي مكتوب على العلبة بالظبط.',
    },
  },
  {
    icon: ShieldCheck,
    title: { en: 'Uncompromising quality', ar: 'جودة مافيهاش تنازل' },
    body: {
      en: 'Production is held to GMP-grade discipline, with each batch tested and released only when it meets our specification in full.',
      ar: 'الإنتاج ماشي بانضباط بمعايير GMP، وكل تشغيلة بتتفحص وماتنزلش السوق غير لما تستوفي مواصفاتنا بالكامل.',
    },
  },
  {
    icon: Leaf,
    title: { en: 'Nature, refined', ar: 'الطبيعة بلمسة علمية' },
    body: {
      en: 'We pair trusted botanicals — elderberry, ivy leaf, black seed — with modern pharmaceutical precision for the best of both worlds.',
      ar: 'بنجمع مستخلصات نباتية موثوقة — البلسان وورق اللبلاب وحبة البركة — مع الدقة الصيدلانية الحديثة، عشان ناخد الأحسن من الاتنين.',
    },
  },
  {
    icon: HeartPulse,
    title: { en: 'Built around families', ar: 'متعمل للعيلة' },
    body: {
      en: 'From gentle children’s syrups to daily adult essentials, our range is designed for real households and real quality of life.',
      ar: 'من شرابات الأطفال اللطيفة لأساسيات الكبار اليومية، منتجاتنا متعملة لعيلات حقيقية ولجودة حياتها على أرض الواقع.',
    },
  },
  {
    icon: Sparkles,
    title: { en: 'Fast, focused innovation', ar: 'ابتكار سريع ومركّز' },
    body: {
      en: 'A lean pipeline moving quickly — 30+ formulations in development across six therapeutic areas.',
      ar: 'خط أبحاث بيتحرك بسرعة — أكتر من 30 تركيبة تحت التطوير في ستة مجالات علاجية.',
    },
  },
  {
    icon: Globe2,
    title: { en: 'Ready for the region', ar: 'جاهزين للمنطقة كلها' },
    body: {
      en: 'Formulated, packaged and documented to registration standards that open doors across the Middle East and Africa.',
      ar: 'تركيبات وتغليف ومستندات بمعايير التسجيل اللي بتفتح الأبواب في الشرق الأوسط وأفريقيا كلها.',
    },
  },
];

/** ------------------------------------------------------------------
 *  HEADLINE STATISTICS
 *  ------------------------------------------------------------------ */
export const stats: { value: number; suffix?: string; prefix?: string; label: Bi }[] = [
  { value: 30, suffix: '+', label: { en: 'Formulations in development', ar: 'تركيبة تحت التطوير' } },
  { value: 9, label: { en: 'Products in market & registration', ar: 'منتج في السوق وتحت التسجيل' } },
  { value: 6, label: { en: 'Therapeutic areas', ar: 'مجالات علاجية' } },
  { value: 100, suffix: '%', label: { en: 'Commitment to GMP quality', ar: 'التزام بجودة معايير GMP' } },
];

/** ------------------------------------------------------------------
 *  ABOUT
 *  ------------------------------------------------------------------ */
export const about = {
  story: [
    {
      en: 'Loremed Pharma was founded on a simple conviction: that world-class medicine and nutrition should be within reach of every family in our region.',
      ar: 'لورميد فارما اتأسست على فكرة بسيطة: إن الدوا والتغذية بمستوى عالمي لازم يكونوا في متناول كل بيت في منطقتنا.',
    },
    {
      en: 'We are a young, fast-moving pharmaceutical and nutraceutical company — combining the rigour of pharmaceutical science with the warmth of products people actually enjoy taking. From our first formulations to a pipeline now more than thirty strong, our growth has been guided by one measure of success: the quality of life we help create.',
      ar: 'إحنا شركة أدوية ومكملات غذائية لسه صغيرة وبتكبر بسرعة — بنجمع دقة العلوم الصيدلانية مع منتجات الناس بتحب تاخدها فعلاً. من أول تركيباتنا لخط أبحاث فيه دلوقتي أكتر من تلاتين تركيبة، إحنا ماشيين على مقياس نجاح واحد: جودة الحياة اللي بنساهم فيها.',
    },
  ] as Bi[],
  vision: {
    title: { en: 'Vision', ar: 'رؤيتنا' },
    body: {
      en: 'To become a trusted name in regional healthcare — recognised for the quality, integrity and human impact of everything we make.',
      ar: 'إننا نبقى اسم موثوق في الرعاية الصحية في المنطقة — معروفين بالجودة والأمانة والأثر الإنساني في كل حاجة بنعملها.',
    },
  },
  mission: {
    title: { en: 'Mission', ar: 'رسالتنا' },
    body: {
      en: 'To develop, manufacture and deliver science-backed medicines and nutritional supplements that improve everyday health and quality of life, held to the highest standards of safety and care.',
      ar: 'إننا نطوّر ونصنّع ونقدّم أدوية ومكملات غذائية قايمة على العلم، بتحسّن الصحة اليومية وجودة الحياة، وإحنا ملتزمين بأعلى معايير الأمان والرعاية.',
    },
  },
  values: [
    {
      icon: ShieldCheck,
      title: { en: 'Integrity', ar: 'الأمانة' },
      body: { en: 'We do what is right for patients and partners — every batch, every time.', ar: 'بنعمل الصح مع المرضى والشركاء — في كل تشغيلة، وفي كل مرة.' },
    },
    {
      icon: Microscope,
      title: { en: 'Excellence', ar: 'التميّز' },
      body: { en: 'We hold our science and our quality to standards higher than the market demands.', ar: 'بنحاسب نفسنا في العلم والجودة على معايير أعلى من اللي السوق طالبه.' },
    },
    {
      icon: HeartPulse,
      title: { en: 'Care', ar: 'الرعاية' },
      body: { en: 'People are at the centre of every decision. We care about quality of life.', ar: 'الإنسان في قلب كل قرار بناخده. إحنا بنهتم بجودة الحياة.' },
    },
    {
      icon: Sparkles,
      title: { en: 'Innovation', ar: 'الابتكار' },
      body: { en: 'We move fast and think ahead, turning good science into better products.', ar: 'بنتحرك بسرعة وبنفكر لقدام، وبنحوّل العلم الكويس لمنتجات أحسن.' },
    },
  ] as { icon: LucideIcon; title: Bi; body: Bi }[],
};

/** ------------------------------------------------------------------
 *  TIMELINE
 *  ------------------------------------------------------------------ */
export const timeline: { year: string; title: Bi; body: Bi }[] = [
  {
    year: '2023',
    title: { en: 'Loremed is founded', ar: 'تأسيس لورميد' },
    body: {
      en: 'The company is established with a clear ambition: rapid, responsible growth in pharmaceuticals and nutrition.',
      ar: 'الشركة اتأسست بطموح واضح: نمو سريع ومسؤول في الأدوية والتغذية.',
    },
  },
  {
    year: '2023',
    title: { en: 'First formulations', ar: 'أول تركيباتنا' },
    body: {
      en: 'Our earliest immune, respiratory and vitamin products reach the market under GMP-grade production.',
      ar: 'أول منتجاتنا للمناعة والجهاز التنفسي والفيتامينات بتوصل السوق، بإنتاج بمعايير GMP.',
    },
  },
  {
    year: '2024',
    title: { en: 'Range expands', ar: 'التشكيلة بتكبر' },
    body: {
      en: 'The catalogue broadens across immune support, kids health, omega and dermatology as demand grows.',
      ar: 'التشكيلة بتوسّع وتشمل دعم المناعة وصحة الأطفال والأوميغا والعناية بالبشرة مع زيادة الطلب.',
    },
  },
  {
    year: '2025',
    title: { en: '30+ in the pipeline', ar: 'أكتر من 30 تركيبة تحت التطوير' },
    body: {
      en: 'Research and development scales to more than thirty formulations across six therapeutic areas.',
      ar: 'البحث والتطوير بيوسّع ويضم أكتر من تلاتين تركيبة في ستة مجالات علاجية.',
    },
  },
  {
    year: '2026',
    title: { en: 'Regional horizons', ar: 'آفاق في المنطقة' },
    body: {
      en: 'Documentation and registration work opens the next markets across the Middle East and Africa.',
      ar: 'الشغل على التوثيق والتسجيل بيفتح أسواق جديدة في الشرق الأوسط وأفريقيا.',
    },
  },
];

/** ------------------------------------------------------------------
 *  LEADERSHIP (structure — role based)
 *  ------------------------------------------------------------------ */
/**
 * The leadership team. `monogram` is the initials shown in the avatar circle —
 * Tamer Ali heads both R&D and Quality, so the same initials appear twice.
 */
export const leadership: { name: Bi; role: Bi; monogram: string; focus: Bi }[] = [
  {
    name: { en: 'Ayman Ayoub', ar: 'أيمن أيوب' },
    role: { en: 'Managing Director', ar: 'المدير العام' },
    monogram: 'AA',
    focus: {
      en: 'Sets the strategic direction and stewards Loremed’s long-term growth and culture.',
      ar: 'بيحدد الاتجاه الاستراتيجي وبيقود نمو لورميد وثقافتها على المدى الطويل.',
    },
  },
  {
    name: { en: 'Tamer Ali', ar: 'تامر علي' },
    role: { en: 'Head of Research & Development', ar: 'رئيس قسم البحث والتطوير' },
    monogram: 'TA',
    focus: {
      en: 'Leads formulation science, from botanical extracts to finished dosage forms.',
      ar: 'بيقود علوم التركيب، من المستخلصات النباتية لحد الأشكال الدوائية النهائية.',
    },
  },
  {
    name: { en: 'Tamer Ali', ar: 'تامر علي' },
    role: { en: 'Quality & Regulatory Director', ar: 'مدير الجودة والشؤون التنظيمية' },
    monogram: 'TA',
    focus: {
      en: 'Owns quality assurance, GMP compliance and product registration across markets.',
      ar: 'مسؤول عن ضمان الجودة والالتزام بمعايير GMP وتسجيل المنتجات في الأسواق المختلفة.',
    },
  },
  {
    name: { en: 'Dr Mohamed Abdelraouf', ar: 'د. محمد عبدالرؤوف' },
    role: { en: 'Commercial Director', ar: 'المدير التجاري' },
    monogram: 'MA',
    focus: {
      en: 'Builds the partnerships and channels that put Loremed products in patients’ hands.',
      ar: 'بيبني الشراكات والقنوات اللي بتوصّل منتجات لورميد للمرضى.',
    },
  },
];

/** ------------------------------------------------------------------
 *  STANDARDS & COMPLIANCE
 *  ------------------------------------------------------------------ */
export const standards: { icon: LucideIcon; code: string; title: Bi; body: Bi }[] = [
  {
    icon: Factory,
    code: 'GMP',
    title: { en: 'Good Manufacturing Practice', ar: 'ممارسات التصنيع الجيدة' },
    body: { en: 'Production and controls operated to GMP-grade discipline at every stage.', ar: 'الإنتاج والرقابة ماشيين بانضباط بمعايير GMP في كل مرحلة.' },
  },
  {
    icon: ClipboardCheck,
    code: 'EDA',
    title: { en: 'Regulatory Registration', ar: 'التسجيل التنظيمي' },
    body: { en: 'Products developed and documented for registration with the national drug authority.', ar: 'المنتجات بتتطوّر وبتتوثّق عشان تتسجل في هيئة الدواء الوطنية.' },
  },
  {
    icon: Award,
    code: 'ISO 9001',
    title: { en: 'Quality Management', ar: 'إدارة الجودة' },
    body: { en: 'Quality systems built around the principles of ISO 9001 continuous improvement.', ar: 'أنظمة جودة مبنية على مبادئ التحسين المستمر حسب مواصفة ISO 9001.' },
  },
  {
    icon: Recycle,
    code: 'ISO 14001',
    title: { en: 'Environmental Care', ar: 'العناية البيئية' },
    body: { en: 'Operations designed with environmental responsibility and waste reduction in mind.', ar: 'عمليات متعملة بمسؤولية تجاه البيئة وبتقليل المخلفات.' },
  },
  {
    icon: ShieldCheck,
    code: 'ISO 45001',
    title: { en: 'Health & Safety', ar: 'الصحة والسلامة' },
    body: { en: 'A safe workplace framework protecting the people who make our products.', ar: 'بيئة عمل آمنة بتحمي الناس اللي بتصنّع منتجاتنا.' },
  },
  {
    icon: Beaker,
    code: 'QC',
    title: { en: 'Batch Testing & Release', ar: 'فحص التشغيلات والإفراج عنها' },
    body: { en: 'Every batch is analytically tested and released only against full specification.', ar: 'كل تشغيلة بتتفحص تحليليًا، وماينفرجش عنها غير بعد ما تستوفي المواصفات كلها.' },
  },
];

/** ------------------------------------------------------------------
 *  MANUFACTURING & R&D CAPABILITIES
 *  ------------------------------------------------------------------ */
export const manufacturingCapabilities: { icon: LucideIcon; title: Bi; body: Bi }[] = [
  {
    icon: Factory,
    title: { en: 'GMP-grade production', ar: 'إنتاج بمعايير GMP' },
    body: {
      en: 'Controlled environments, validated processes and documented traceability from raw material to finished pack.',
      ar: 'بيئات محكومة وعمليات معتمدة وتتبّع موثّق من المادة الخام لحد العبوة النهائية.',
    },
  },
  {
    icon: Beaker,
    title: { en: 'Multi-form capability', ar: 'أشكال دوائية متعددة' },
    body: { en: 'Syrups, oral drops and topical lotions produced on modern lines.', ar: 'شرابات ونقط بالفم ولوشن موضعي، بتتنتج على خطوط حديثة.' },
  },
  {
    icon: ClipboardCheck,
    title: { en: 'In-process controls', ar: 'ضوابط أثناء الإنتاج' },
    body: { en: 'Continuous checks throughout production keep every batch inside specification.', ar: 'فحوصات مستمرة طول عملية الإنتاج بتخلي كل تشغيلة داخل المواصفات.' },
  },
  {
    icon: Truck,
    title: { en: 'Cold-chain & logistics', ar: 'سلسلة التبريد واللوجستيات' },
    body: { en: 'Storage and distribution designed to protect product integrity all the way to the shelf.', ar: 'تخزين وتوزيع متعملين عشان يحافظوا على سلامة المنتج لحد ما يوصل الرف.' },
  },
];

export const rndCapabilities: { icon: LucideIcon; title: Bi; body: Bi }[] = [
  {
    icon: FlaskConical,
    title: { en: 'Formulation science', ar: 'علوم التركيب' },
    body: {
      en: 'Turning active ingredients and botanicals into stable, palatable, effective products.',
      ar: 'بنحوّل المواد الفعّالة والمستخلصات النباتية لمنتجات ثابتة وطعمها كويس وفعّالة.',
    },
  },
  {
    icon: Microscope,
    title: { en: 'Analytical laboratory', ar: 'المعمل التحليلي' },
    body: { en: 'Method development and testing that verify identity, purity and potency.', ar: 'تطوير طرق وفحوصات بتتأكد من الهوية والنقاء والفعالية.' },
  },
  {
    icon: Leaf,
    title: { en: 'Botanical standardisation', ar: 'توحيد المستخلصات النباتية' },
    body: {
      en: 'Consistent, characterised plant extracts that behave the same in every batch.',
      ar: 'مستخلصات نباتية موصّفة وثابتة، بتشتغل بنفس الطريقة في كل تشغيلة.',
    },
  },
  {
    icon: Target,
    title: { en: 'Pipeline development', ar: 'تطوير خط الأبحاث' },
    body: { en: '30+ formulations advancing from concept through registration.', ar: 'أكتر من 30 تركيبة ماشية من الفكرة لحد التسجيل.' },
  },
];

/** ------------------------------------------------------------------
 *  PARTNERSHIPS (capability statements, region based)
 *  ------------------------------------------------------------------ */
export const partnerships: { region: Bi; body: Bi }[] = [
  {
    region: { en: 'Egypt', ar: 'مصر' },
    body: { en: 'Home market — our products, our people, our standards.', ar: 'السوق الأم — منتجاتنا وفريقنا ومعاييرنا.' },
  },
  {
    region: { en: 'Gulf & GCC', ar: 'الخليج ودول مجلس التعاون' },
    body: { en: 'Registration and distribution partnerships across the Gulf.', ar: 'شراكات تسجيل وتوزيع في الخليج كله.' },
  },
  {
    region: { en: 'North Africa', ar: 'شمال أفريقيا' },
    body: { en: 'Formulations documented for neighbouring North-African markets.', ar: 'تركيبات موثّقة لأسواق شمال أفريقيا المجاورة.' },
  },
  {
    region: { en: 'Sub-Saharan Africa', ar: 'أفريقيا جنوب الصحراء' },
    body: { en: 'Building channels to bring quality nutrition further afield.', ar: 'بنبني قنوات توصّل التغذية عالية الجودة لمناطق أبعد.' },
  },
];

/** ------------------------------------------------------------------
 *  HEALTHCARE PROFESSIONALS — value points
 *  ------------------------------------------------------------------ */
export const professionalValue: { icon: LucideIcon; title: Bi; body: Bi }[] = [
  {
    icon: Stethoscope,
    title: { en: 'Evidence you can stand behind', ar: 'أدلة تقدر تعتمد عليها' },
    body: {
      en: 'Standardised actives and transparent formulations you can confidently recommend.',
      ar: 'مواد فعّالة موحّدة المعايير وتركيبات واضحة تقدر توصي بيها بثقة.',
    },
  },
  {
    icon: Baby,
    title: { en: 'Options for every patient', ar: 'خيارات لكل مريض' },
    body: {
      en: 'From paediatric syrups to adult daily essentials across six therapeutic areas.',
      ar: 'من شرابات الأطفال لأساسيات الكبار اليومية، في ستة مجالات علاجية.',
    },
  },
  {
    icon: Brain,
    title: { en: 'Scientific support', ar: 'دعم علمي' },
    body: {
      en: 'Product dossiers and medical information available to healthcare professionals.',
      ar: 'ملفات فنية للمنتجات ومعلومات طبية متاحة للمتخصصين في الرعاية الصحية.',
    },
  },
];

/** ------------------------------------------------------------------
 *  TESTIMONIALS (role-based professional voices)
 *  ------------------------------------------------------------------ */
export const testimonials: { quote: Bi; name: Bi; role: Bi }[] = [
  {
    quote: {
      en: 'The consistency batch-to-batch is what earns my trust. Loremed’s standardised botanicals behave exactly as expected, which makes them easy to recommend.',
      ar: 'الثبات من تشغيلة للتانية هو اللي بيكسب ثقتي. المستخلصات النباتية الموحّدة بتاعة لورميد بتشتغل بالظبط زي المتوقع، وده بيخلي التوصية بيها سهلة.',
    },
    name: { en: 'Community Pharmacist', ar: 'صيدلي' },
    role: { en: 'Independent Pharmacy', ar: 'صيدلية مستقلة' },
  },
  {
    quote: {
      en: 'Parents come back for the children’s range because the kids actually take it. Good science and a formula families enjoy is a rare combination.',
      ar: 'الأهالي بيرجعوا يشتروا منتجات الأطفال تاني لأن ولادهم بيقبلوا ياخدوها فعلاً. علم كويس وتركيبة العيلة بتحبها — ده مزيج نادر.',
    },
    name: { en: 'Paediatric Nutrition Specialist', ar: 'أخصائية تغذية أطفال' },
    role: { en: 'Family Health Clinic', ar: 'عيادة صحة الأسرة' },
  },
  {
    quote: {
      en: 'From documentation to delivery, Loremed operates like a much larger company. They make it straightforward to bring quality products to our market.',
      ar: 'من التوثيق لحد التسليم، لورميد بتشتغل زي شركة أكبر من حجمها بكتير. بيخلوا إدخال منتجات عالية الجودة لسوقنا حاجة بسيطة.',
    },
    name: { en: 'Regional Distribution Partner', ar: 'شريك توزيع إقليمي' },
    role: { en: 'Gulf Healthcare Distributor', ar: 'موزّع رعاية صحية خليجي' },
  },
];

/** ------------------------------------------------------------------
 *  LATEST NEWS
 *  ------------------------------------------------------------------ */
export const news: {
  slug: string;
  date: string;
  category: Bi;
  title: Bi;
  excerpt: Bi;
}[] = [
  {
    slug: 'pipeline-passes-thirty-formulations',
    date: '2026-05-18',
    category: { en: 'Research & Development', ar: 'البحث والتطوير' },
    title: { en: 'Loremed pipeline passes thirty formulations', ar: 'خط أبحاث لورميد عدّى تلاتين تركيبة' },
    excerpt: {
      en: 'Our R&D pipeline now spans more than thirty products across six therapeutic areas, from immune support to dermatology.',
      ar: 'خط البحث والتطوير عندنا بقى فيه دلوقتي أكتر من تلاتين منتج في ستة مجالات علاجية، من دعم المناعة لحد العناية بالبشرة.',
    },
  },
  {
    slug: 'new-registrations-under-review',
    date: '2026-03-02',
    category: { en: 'Regulatory', ar: 'شؤون تنظيمية' },
    title: { en: 'Two flagship formulas enter final registration', ar: 'تركيبتين مهمين دخلوا المراحل النهائية للتسجيل' },
    excerpt: {
      en: 'Imulormed and Ferolormed advance into the final stages of regulatory registration.',
      ar: 'Imulormed وFerolormed وصلوا للمراحل النهائية من التسجيل التنظيمي.',
    },
  },
  {
    slug: 'quality-systems-milestone',
    date: '2025-11-20',
    category: { en: 'Quality', ar: 'الجودة' },
    title: { en: 'Quality systems reach a new benchmark', ar: 'أنظمة الجودة وصلت لمستوى جديد' },
    excerpt: {
      en: 'Loremed strengthens its GMP-grade quality framework with expanded in-house analytical testing capability.',
      ar: 'لورميد بتقوّي إطار الجودة بمعايير GMP عن طريق توسيع قدرات الفحص التحليلي الداخلي.',
    },
  },
  {
    slug: 'regional-distribution-partnerships',
    date: '2025-09-09',
    category: { en: 'Partnerships', ar: 'الشراكات' },
    title: { en: 'New distribution partnerships across the Gulf', ar: 'شراكات توزيع جديدة في الخليج' },
    excerpt: {
      en: 'Fresh agreements extend Loremed’s reach across the GCC, bringing our nutrition range to new communities.',
      ar: 'اتفاقيات جديدة بتقوّي وجود لورميد في دول مجلس التعاون الخليجي، وبتوصّل تشكيلة منتجاتنا الغذائية لمجتمعات جديدة.',
    },
  },
];

/** ------------------------------------------------------------------
 *  FAQ
 *  ------------------------------------------------------------------ */
export const faqs: { q: Bi; a: Bi }[] = [
  {
    q: { en: 'Where are Loremed products manufactured?', ar: 'منتجات لورميد بتتصنّع فين؟' },
    a: {
      en: 'Loremed products are produced to GMP-grade standards with documented traceability from raw material to finished pack, and every batch is analytically tested before release.',
      ar: 'منتجات لورميد بتتنتج حسب معايير GMP مع تتبّع موثّق من المادة الخام لحد العبوة النهائية، وكل تشغيلة بتتفحص تحليليًا قبل ما يتفرج عنها.',
    },
  },
  {
    q: { en: 'Are your supplements suitable for children?', ar: 'هل مكملاتكم مناسبة للأطفال؟' },
    a: {
      en: 'Several products — including our immune and respiratory syrups and the Coglern children’s range — are specifically formulated for children. Always check the label for the appropriate age and dose, and consult your pharmacist or paediatrician.',
      ar: 'كتير من منتجاتنا — زي شرابات المناعة والجهاز التنفسي وتشكيلة Coglern للأطفال — متعملة مخصوص للأطفال. اقرا العلبة دايمًا عشان تعرف السن والجرعة المناسبة، واستشير الصيدلي أو دكتور الأطفال.',
    },
  },
  {
    q: {
      en: 'What is the difference between “Available Now” and “Under Registration”?',
      ar: 'إيه الفرق بين "متوفر الآن" و"قيد التسجيل"؟',
    },
    a: {
      en: '“Available Now” products are registered and on the market. “Under Registration” products have completed development and are progressing through regulatory registration ahead of launch.',
      ar: 'منتجات "متوفر الآن" مسجّلة ومتاحة في السوق. ومنتجات "قيد التسجيل" خلّصت مرحلة التطوير وهي دلوقتي في التسجيل التنظيمي تمهيدًا لنزولها السوق.',
    },
  },
  {
    q: { en: 'How can I become a distribution partner?', ar: 'إزاي أبقى شريك توزيع؟' },
    a: {
      en: 'We welcome partnership enquiries across the Middle East and Africa. Reach our commercial team through the contact page and select the Export or Sales department.',
      ar: 'بنرحب باستفسارات الشراكة من كل الشرق الأوسط وأفريقيا. كلّم فريقنا التجاري من صفحة التواصل واختار قسم التصدير أو المبيعات.',
    },
  },
  {
    q: { en: 'Do you provide information for healthcare professionals?', ar: 'بتقدموا معلومات للمتخصصين في الرعاية الصحية؟' },
    a: {
      en: 'Yes. Product dossiers and medical information are available to healthcare professionals on request through our Medical Information department.',
      ar: 'أيوه. الملفات الفنية للمنتجات والمعلومات الطبية متاحة للمتخصصين في الرعاية الصحية عند الطلب، من خلال قسم المعلومات الطبية.',
    },
  },
];

export const iconRefs = { Users, Globe2 };
