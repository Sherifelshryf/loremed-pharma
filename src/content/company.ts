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
    title: { en: 'Science at the core', ar: 'العلم في صميم كل شيء' },
    body: {
      en: 'Every formula begins in the lab — evidence-led, standardised and built on active ingredients that deliver what the label promises.',
      ar: 'كل تركيبة تبدأ في المعمل — قائمة على الأدلة، وموحّدة المعايير، ومبنية على مواد فعّالة تُحقق ما يَعِد به الملصق.',
    },
  },
  {
    icon: ShieldCheck,
    title: { en: 'Uncompromising quality', ar: 'جودة لا تقبل التنازل' },
    body: {
      en: 'Production is held to GMP-grade discipline, with each batch tested and released only when it meets our specification in full.',
      ar: 'يخضع الإنتاج لانضباط بمعايير GMP، ويُختبر كل دفعة ولا يُفرج عنها إلا عند استيفائها الكامل لمواصفاتنا.',
    },
  },
  {
    icon: Leaf,
    title: { en: 'Nature, refined', ar: 'الطبيعة، بحرفية علمية' },
    body: {
      en: 'We pair trusted botanicals — elderberry, ivy leaf, black seed — with modern pharmaceutical precision for the best of both worlds.',
      ar: 'نجمع بين مستخلصات نباتية موثوقة — البلسان وأوراق اللبلاب وحبة البركة — والدقة الصيدلانية الحديثة للجمع بين الأفضل من العالمين.',
    },
  },
  {
    icon: HeartPulse,
    title: { en: 'Built around families', ar: 'مصمَّم من أجل العائلات' },
    body: {
      en: 'From gentle children’s syrups to daily adult essentials, our range is designed for real households and real quality of life.',
      ar: 'من شرابات الأطفال اللطيفة إلى أساسيات الكبار اليومية، صُمم نطاق منتجاتنا ليلائم الأسر الحقيقية وجودة حياتها الفعلية.',
    },
  },
  {
    icon: Sparkles,
    title: { en: 'Fast, focused innovation', ar: 'ابتكار سريع ومركّز' },
    body: {
      en: 'A lean pipeline moving quickly — 30+ formulations in development across six therapeutic areas.',
      ar: 'خط أبحاث رشيق يتحرك بسرعة — أكثر من 30 تركيبة قيد التطوير عبر ستة مجالات علاجية.',
    },
  },
  {
    icon: Globe2,
    title: { en: 'Ready for the region', ar: 'جاهزون لخدمة المنطقة' },
    body: {
      en: 'Formulated, packaged and documented to registration standards that open doors across the Middle East and Africa.',
      ar: 'تركيبات وتغليف ومستندات بمعايير تسجيل تفتح الأبواب في جميع أنحاء الشرق الأوسط وأفريقيا.',
    },
  },
];

/** ------------------------------------------------------------------
 *  HEADLINE STATISTICS
 *  ------------------------------------------------------------------ */
export const stats: { value: number; suffix?: string; prefix?: string; label: Bi }[] = [
  { value: 30, suffix: '+', label: { en: 'Formulations in development', ar: 'تركيبة قيد التطوير' } },
  { value: 9, label: { en: 'Products in market & registration', ar: 'منتج في السوق وقيد التسجيل' } },
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
      ar: 'تأسست لوريمد فارما على قناعة بسيطة: أن الدواء والتغذية بمستوى عالمي يجب أن يكونا في متناول كل أسرة في منطقتنا.',
    },
    {
      en: 'We are a young, fast-moving pharmaceutical and nutraceutical company — combining the rigour of pharmaceutical science with the warmth of products people actually enjoy taking. From our first formulations to a pipeline now more than thirty strong, our growth has been guided by one measure of success: the quality of life we help create.',
      ar: 'نحن شركة أدوية ومكملات غذائية فتية وسريعة النمو — نجمع بين صرامة العلوم الصيدلانية ودفء منتجات يستمتع الناس بتناولها فعلاً. من أولى تركيباتنا إلى خط أبحاث يضم اليوم أكثر من ثلاثين تركيبة، ظل نمونا موجَّهًا بمقياس نجاح واحد: جودة الحياة التي نساهم في خلقها.',
    },
  ] as Bi[],
  vision: {
    title: { en: 'Vision', ar: 'رؤيتنا' },
    body: {
      en: 'To become a trusted name in regional healthcare — recognised for the quality, integrity and human impact of everything we make.',
      ar: 'أن نصبح اسمًا موثوقًا في الرعاية الصحية بالمنطقة — معروفين بجودة ونزاهة وأثر إنساني في كل ما نصنعه.',
    },
  },
  mission: {
    title: { en: 'Mission', ar: 'مهمتنا' },
    body: {
      en: 'To develop, manufacture and deliver science-backed medicines and nutritional supplements that improve everyday health and quality of life, held to the highest standards of safety and care.',
      ar: 'أن نطوّر ونصنّع ونقدّم أدوية ومكملات غذائية قائمة على العلم تُحسّن الصحة اليومية وجودة الحياة، مع الالتزام بأعلى معايير السلامة والرعاية.',
    },
  },
  values: [
    {
      icon: ShieldCheck,
      title: { en: 'Integrity', ar: 'النزاهة' },
      body: { en: 'We do what is right for patients and partners — every batch, every time.', ar: 'نفعل ما هو صواب تجاه المرضى والشركاء — في كل دفعة، وفي كل مرة.' },
    },
    {
      icon: Microscope,
      title: { en: 'Excellence', ar: 'التميّز' },
      body: { en: 'We hold our science and our quality to standards higher than the market demands.', ar: 'نُخضع علمنا وجودتنا لمعايير أعلى مما يتطلبه السوق.' },
    },
    {
      icon: HeartPulse,
      title: { en: 'Care', ar: 'الرعاية' },
      body: { en: 'People are at the centre of every decision. We care about quality of life.', ar: 'الإنسان في قلب كل قرار نتخذه. نحن نهتم بجودة الحياة.' },
    },
    {
      icon: Sparkles,
      title: { en: 'Innovation', ar: 'الابتكار' },
      body: { en: 'We move fast and think ahead, turning good science into better products.', ar: 'نتحرك بسرعة ونفكر إلى الأمام، محوّلين العلم الجيد إلى منتجات أفضل.' },
    },
  ] as { icon: LucideIcon; title: Bi; body: Bi }[],
};

/** ------------------------------------------------------------------
 *  TIMELINE
 *  ------------------------------------------------------------------ */
export const timeline: { year: string; title: Bi; body: Bi }[] = [
  {
    year: '2023',
    title: { en: 'Loremed is founded', ar: 'تأسيس لوريمد' },
    body: {
      en: 'The company is established with a clear ambition: rapid, responsible growth in pharmaceuticals and nutrition.',
      ar: 'تأسست الشركة بطموح واضح: نمو سريع ومسؤول في مجالي الأدوية والتغذية.',
    },
  },
  {
    year: '2023',
    title: { en: 'First formulations', ar: 'أولى التركيبات' },
    body: {
      en: 'Our earliest immune, respiratory and vitamin products reach the market under GMP-grade production.',
      ar: 'تصل أولى منتجاتنا الخاصة بالمناعة والجهاز التنفسي والفيتامينات إلى السوق بإنتاج بمعايير GMP.',
    },
  },
  {
    year: '2024',
    title: { en: 'Range expands', ar: 'توسّع النطاق' },
    body: {
      en: 'The catalogue broadens across immune support, kids health, omega and dermatology as demand grows.',
      ar: 'يتوسع الكتالوج ليشمل دعم المناعة وصحة الأطفال وأوميغا والعناية بالبشرة مع تزايد الطلب.',
    },
  },
  {
    year: '2025',
    title: { en: '30+ in the pipeline', ar: 'أكثر من 30 تركيبة قيد التطوير' },
    body: {
      en: 'Research and development scales to more than thirty formulations across six therapeutic areas.',
      ar: 'يتوسع البحث والتطوير ليضم أكثر من ثلاثين تركيبة عبر ستة مجالات علاجية.',
    },
  },
  {
    year: '2026',
    title: { en: 'Regional horizons', ar: 'آفاق إقليمية' },
    body: {
      en: 'Documentation and registration work opens the next markets across the Middle East and Africa.',
      ar: 'يفتح العمل على التوثيق والتسجيل الأسواق القادمة في الشرق الأوسط وأفريقيا.',
    },
  },
];

/** ------------------------------------------------------------------
 *  LEADERSHIP (structure — role based)
 *  ------------------------------------------------------------------ */
export const leadership: { role: Bi; monogram: string; focus: Bi }[] = [
  {
    role: { en: 'Managing Director', ar: 'المدير العام' },
    monogram: 'MD',
    focus: {
      en: 'Sets the strategic direction and stewards Loremed’s long-term growth and culture.',
      ar: 'يضع الاتجاه الاستراتيجي ويقود نمو لوريمد وثقافتها على المدى الطويل.',
    },
  },
  {
    role: { en: 'Head of Research & Development', ar: 'رئيس قسم البحث والتطوير' },
    monogram: 'RD',
    focus: {
      en: 'Leads formulation science, from botanical extracts to finished dosage forms.',
      ar: 'يقود علوم التركيب، من المستخلصات النباتية إلى الأشكال الدوائية النهائية.',
    },
  },
  {
    role: { en: 'Quality & Regulatory Director', ar: 'مدير الجودة والشؤون التنظيمية' },
    monogram: 'QA',
    focus: {
      en: 'Owns quality assurance, GMP compliance and product registration across markets.',
      ar: 'يتولى ضمان الجودة والامتثال لمعايير GMP وتسجيل المنتجات في مختلف الأسواق.',
    },
  },
  {
    role: { en: 'Commercial Director', ar: 'المدير التجاري' },
    monogram: 'CD',
    focus: {
      en: 'Builds the partnerships and channels that put Loremed products in patients’ hands.',
      ar: 'يبني الشراكات والقنوات التي تضع منتجات لوريمد في متناول المرضى.',
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
    body: { en: 'Production and controls operated to GMP-grade discipline at every stage.', ar: 'يخضع الإنتاج والضوابط لانضباط بمعايير GMP في كل مرحلة.' },
  },
  {
    icon: ClipboardCheck,
    code: 'EDA',
    title: { en: 'Regulatory Registration', ar: 'التسجيل التنظيمي' },
    body: { en: 'Products developed and documented for registration with the national drug authority.', ar: 'تُطوَّر المنتجات وتُوثَّق للتسجيل لدى هيئة الدواء الوطنية.' },
  },
  {
    icon: Award,
    code: 'ISO 9001',
    title: { en: 'Quality Management', ar: 'إدارة الجودة' },
    body: { en: 'Quality systems built around the principles of ISO 9001 continuous improvement.', ar: 'أنظمة جودة مبنية على مبادئ التحسين المستمر وفق مواصفة ISO 9001.' },
  },
  {
    icon: Recycle,
    code: 'ISO 14001',
    title: { en: 'Environmental Care', ar: 'العناية البيئية' },
    body: { en: 'Operations designed with environmental responsibility and waste reduction in mind.', ar: 'عمليات مصمَّمة بمسؤولية بيئية وتقليل للنفايات.' },
  },
  {
    icon: ShieldCheck,
    code: 'ISO 45001',
    title: { en: 'Health & Safety', ar: 'الصحة والسلامة' },
    body: { en: 'A safe workplace framework protecting the people who make our products.', ar: 'إطار عمل آمن يحمي الأشخاص الذين يصنعون منتجاتنا.' },
  },
  {
    icon: Beaker,
    code: 'QC',
    title: { en: 'Batch Testing & Release', ar: 'اختبار وإفراج الدفعات' },
    body: { en: 'Every batch is analytically tested and released only against full specification.', ar: 'تُختبر كل دفعة تحليليًا ولا يُفرج عنها إلا بعد استيفاء المواصفات كاملة.' },
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
      ar: 'بيئات محكومة وعمليات معتمَدة وتتبّع موثَّق من المادة الخام إلى العبوة النهائية.',
    },
  },
  {
    icon: Beaker,
    title: { en: 'Multi-form capability', ar: 'قدرة متعددة الأشكال الدوائية' },
    body: { en: 'Syrups, oral drops and topical lotions produced on modern lines.', ar: 'شرابات وقطرات فموية ولوشن موضعي تُنتَج على خطوط حديثة.' },
  },
  {
    icon: ClipboardCheck,
    title: { en: 'In-process controls', ar: 'ضوابط أثناء الإنتاج' },
    body: { en: 'Continuous checks throughout production keep every batch inside specification.', ar: 'فحوصات مستمرة طوال عملية الإنتاج تُبقي كل دفعة ضمن المواصفات.' },
  },
  {
    icon: Truck,
    title: { en: 'Cold-chain & logistics', ar: 'سلسلة التبريد واللوجستيات' },
    body: { en: 'Storage and distribution designed to protect product integrity all the way to the shelf.', ar: 'تخزين وتوزيع مصمَّمان لحماية سلامة المنتج حتى الرف.' },
  },
];

export const rndCapabilities: { icon: LucideIcon; title: Bi; body: Bi }[] = [
  {
    icon: FlaskConical,
    title: { en: 'Formulation science', ar: 'علوم التركيب' },
    body: {
      en: 'Turning active ingredients and botanicals into stable, palatable, effective products.',
      ar: 'تحويل المواد الفعّالة والمستخلصات النباتية إلى منتجات مستقرة وسائغة الطعم وفعّالة.',
    },
  },
  {
    icon: Microscope,
    title: { en: 'Analytical laboratory', ar: 'المعمل التحليلي' },
    body: { en: 'Method development and testing that verify identity, purity and potency.', ar: 'تطوير طرق واختبارات تتحقق من الهوية والنقاء والفعالية.' },
  },
  {
    icon: Leaf,
    title: { en: 'Botanical standardisation', ar: 'توحيد المستخلصات النباتية' },
    body: {
      en: 'Consistent, characterised plant extracts that behave the same in every batch.',
      ar: 'مستخلصات نباتية مُوصَّفة وثابتة تتصرف بالطريقة ذاتها في كل دفعة.',
    },
  },
  {
    icon: Target,
    title: { en: 'Pipeline development', ar: 'تطوير خط الأبحاث' },
    body: { en: '30+ formulations advancing from concept through registration.', ar: 'أكثر من 30 تركيبة تتقدم من فكرة إلى التسجيل.' },
  },
];

/** ------------------------------------------------------------------
 *  PARTNERSHIPS (capability statements, region based)
 *  ------------------------------------------------------------------ */
export const partnerships: { region: Bi; body: Bi }[] = [
  {
    region: { en: 'Egypt', ar: 'مصر' },
    body: { en: 'Home market — our products, our people, our standards.', ar: 'السوق الأم — منتجاتنا، وفريقنا، ومعاييرنا.' },
  },
  {
    region: { en: 'Gulf & GCC', ar: 'الخليج ودول مجلس التعاون' },
    body: { en: 'Registration and distribution partnerships across the Gulf.', ar: 'شراكات تسجيل وتوزيع في جميع أنحاء الخليج.' },
  },
  {
    region: { en: 'North Africa', ar: 'شمال أفريقيا' },
    body: { en: 'Formulations documented for neighbouring North-African markets.', ar: 'تركيبات موثَّقة للأسواق المجاورة في شمال أفريقيا.' },
  },
  {
    region: { en: 'Sub-Saharan Africa', ar: 'أفريقيا جنوب الصحراء' },
    body: { en: 'Building channels to bring quality nutrition further afield.', ar: 'بناء قنوات لإيصال التغذية عالية الجودة إلى مناطق أبعد.' },
  },
];

/** ------------------------------------------------------------------
 *  HEALTHCARE PROFESSIONALS — value points
 *  ------------------------------------------------------------------ */
export const professionalValue: { icon: LucideIcon; title: Bi; body: Bi }[] = [
  {
    icon: Stethoscope,
    title: { en: 'Evidence you can stand behind', ar: 'أدلة يمكنك الوثوق بها' },
    body: {
      en: 'Standardised actives and transparent formulations you can confidently recommend.',
      ar: 'مواد فعّالة موحَّدة المعايير وتركيبات شفافة يمكنك التوصية بها بثقة.',
    },
  },
  {
    icon: Baby,
    title: { en: 'Options for every patient', ar: 'خيارات لكل مريض' },
    body: {
      en: 'From paediatric syrups to adult daily essentials across six therapeutic areas.',
      ar: 'من شرابات الأطفال إلى أساسيات الكبار اليومية عبر ستة مجالات علاجية.',
    },
  },
  {
    icon: Brain,
    title: { en: 'Scientific support', ar: 'دعم علمي' },
    body: {
      en: 'Product dossiers and medical information available to healthcare professionals.',
      ar: 'ملفات فنية للمنتجات ومعلومات طبية متاحة لأخصائيي الرعاية الصحية.',
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
      ar: 'الثبات من دفعة إلى أخرى هو ما يكسبني ثقتي. المستخلصات النباتية الموحدة من لوريمد تتصرف تمامًا كما هو متوقع، ما يجعل التوصية بها أمرًا سهلاً.',
    },
    name: { en: 'Community Pharmacist', ar: 'صيدلي مجتمعي' },
    role: { en: 'Independent Pharmacy', ar: 'صيدلية مستقلة' },
  },
  {
    quote: {
      en: 'Parents come back for the children’s range because the kids actually take it. Good science and a formula families enjoy is a rare combination.',
      ar: 'يعود الأهل لشراء نطاق منتجات الأطفال لأن أطفالهم يتناولونها بالفعل. الجمع بين العلم الجيد وتركيبة تستمتع بها العائلات مزيج نادر.',
    },
    name: { en: 'Paediatric Nutrition Specialist', ar: 'أخصائية تغذية أطفال' },
    role: { en: 'Family Health Clinic', ar: 'عيادة صحة الأسرة' },
  },
  {
    quote: {
      en: 'From documentation to delivery, Loremed operates like a much larger company. They make it straightforward to bring quality products to our market.',
      ar: 'من التوثيق إلى التسليم، تعمل لوريمد كشركة أكبر بكثير من حجمها. إنهم يجعلون إدخال منتجات عالية الجودة إلى سوقنا أمرًا بسيطًا.',
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
    title: { en: 'Loremed pipeline passes thirty formulations', ar: 'خط أبحاث لوريمد يتجاوز ثلاثين تركيبة' },
    excerpt: {
      en: 'Our R&D pipeline now spans more than thirty products across six therapeutic areas, from immune support to dermatology.',
      ar: 'يمتد خط أبحاثنا وتطويرنا الآن ليشمل أكثر من ثلاثين منتجًا عبر ستة مجالات علاجية، من دعم المناعة إلى العناية بالبشرة.',
    },
  },
  {
    slug: 'new-registrations-under-review',
    date: '2026-03-02',
    category: { en: 'Regulatory', ar: 'تنظيمي' },
    title: { en: 'Three flagship formulas enter final registration', ar: 'ثلاث تركيبات رائدة تدخل المراحل النهائية للتسجيل' },
    excerpt: {
      en: 'Ivylor Advance, Coglern Syrup and SmartOD D advance into the final stages of regulatory registration.',
      ar: 'تتقدم Ivylor Advance وCoglern Syrup وSmartOD D إلى المراحل النهائية من التسجيل التنظيمي.',
    },
  },
  {
    slug: 'quality-systems-milestone',
    date: '2025-11-20',
    category: { en: 'Quality', ar: 'الجودة' },
    title: { en: 'Quality systems reach a new benchmark', ar: 'أنظمة الجودة تبلغ معيارًا جديدًا' },
    excerpt: {
      en: 'Loremed strengthens its GMP-grade quality framework with expanded in-house analytical testing capability.',
      ar: 'تعزز لوريمد إطار عملها للجودة بمعايير GMP من خلال توسيع قدرات الاختبار التحليلي الداخلية.',
    },
  },
  {
    slug: 'regional-distribution-partnerships',
    date: '2025-09-09',
    category: { en: 'Partnerships', ar: 'الشراكات' },
    title: { en: 'New distribution partnerships across the Gulf', ar: 'شراكات توزيع جديدة في جميع أنحاء الخليج' },
    excerpt: {
      en: 'Fresh agreements extend Loremed’s reach across the GCC, bringing our nutrition range to new communities.',
      ar: 'تعزز اتفاقيات جديدة حضور لوريمد في دول مجلس التعاون الخليجي، لتصل تشكيلة منتجاتنا الغذائية إلى مجتمعات جديدة.',
    },
  },
];

/** ------------------------------------------------------------------
 *  FAQ
 *  ------------------------------------------------------------------ */
export const faqs: { q: Bi; a: Bi }[] = [
  {
    q: { en: 'Where are Loremed products manufactured?', ar: 'أين تُصنَّع منتجات لوريمد؟' },
    a: {
      en: 'Loremed products are produced to GMP-grade standards with documented traceability from raw material to finished pack, and every batch is analytically tested before release.',
      ar: 'تُنتَج منتجات لوريمد وفق معايير GMP مع تتبّع موثَّق من المادة الخام إلى العبوة النهائية، وتخضع كل دفعة لاختبار تحليلي قبل الإفراج عنها.',
    },
  },
  {
    q: { en: 'Are your supplements suitable for children?', ar: 'هل مكملاتكم مناسبة للأطفال؟' },
    a: {
      en: 'Several products — including our immune and respiratory syrups and the Coglern children’s range — are specifically formulated for children. Always check the label for the appropriate age and dose, and consult your pharmacist or paediatrician.',
      ar: 'العديد من منتجاتنا — بما في ذلك شرابات المناعة والجهاز التنفسي ونطاق Coglern للأطفال — مصمَّمة خصيصًا للأطفال. تحقق دائمًا من الملصق لمعرفة العمر والجرعة المناسبين، واستشر الصيدلي أو طبيب الأطفال.',
    },
  },
  {
    q: {
      en: 'What is the difference between “Available Now” and “Under Registration”?',
      ar: 'ما الفرق بين "متوفر الآن" و"قيد التسجيل"؟',
    },
    a: {
      en: '“Available Now” products are registered and on the market. “Under Registration” products have completed development and are progressing through regulatory registration ahead of launch.',
      ar: 'منتجات "متوفر الآن" مسجَّلة ومتاحة في السوق. أما منتجات "قيد التسجيل" فقد أكملت مرحلة التطوير وهي في طور التسجيل التنظيمي تمهيدًا لإطلاقها.',
    },
  },
  {
    q: { en: 'How can I become a distribution partner?', ar: 'كيف يمكنني أن أصبح شريك توزيع؟' },
    a: {
      en: 'We welcome partnership enquiries across the Middle East and Africa. Reach our commercial team through the contact page and select the Export or Sales department.',
      ar: 'نرحب باستفسارات الشراكة من جميع أنحاء الشرق الأوسط وأفريقيا. تواصل مع فريقنا التجاري عبر صفحة التواصل واختر قسم التصدير أو المبيعات.',
    },
  },
  {
    q: { en: 'Do you provide information for healthcare professionals?', ar: 'هل تقدمون معلومات لأخصائيي الرعاية الصحية؟' },
    a: {
      en: 'Yes. Product dossiers and medical information are available to healthcare professionals on request through our Medical Information department.',
      ar: 'نعم. تتوفر الملفات الفنية للمنتجات والمعلومات الطبية لأخصائيي الرعاية الصحية عند الطلب عبر قسم المعلومات الطبية لدينا.',
    },
  },
];

export const iconRefs = { Users, Globe2 };
