export type Locale = 'en' | 'ar';

/** Bilingual text pair — every localisable content field carries an English and Arabic form. */
export type Bi = { en: string; ar: string };

export const localeMeta: Record<Locale, { label: string; native: string; dir: 'ltr' | 'rtl' }> = {
  en: { label: 'English', native: 'English', dir: 'ltr' },
  ar: { label: 'Arabic', native: 'العربية', dir: 'rtl' },
};

/**
 * Translation dictionary for the site chrome and hero.
 * Scientific / product body copy is delivered from the content layer.
 * Add keys here and the whole UI — including RTL layout — follows.
 */
export const dictionaries = {
  en: {
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.about': 'About',
    'nav.quality': 'Quality',
    'nav.research': 'R&D',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    'nav.openSearch': 'Search',

    'cta.explore': 'View Products',
    'cta.about': 'About Loremed',
    'cta.contact': 'Contact Us',
    'cta.getInTouch': 'Get in touch',
    'cta.viewAll': 'View all products',
    'cta.learnMore': 'Learn more',
    'cta.readMore': 'Read more',
    'cta.quickView': 'Quick view',
    'cta.viewProduct': 'View product',
    'cta.download': 'Download datasheet',
    'cta.allNews': 'All news',
    'cta.talkToUs': 'Talk to our team',
    'cta.discover': 'Discover the science',

    'search.placeholder': 'Search products, science, quality…',
    'search.title': 'Search Loremed',
    'search.empty': 'Start typing to search the catalogue.',
    'search.noResults': 'No results found.',

    'loading.line1': 'WE CARE ABOUT',
    'loading.line2': 'QUALITY OF LIFE',

    'lang.switch': 'Language',

    'hero.eyebrow': 'Pharmaceuticals & Nutrition',
    'hero.title': 'Science that cares about quality of life',
    'hero.titlePre': 'Science that cares about',
    'hero.titleAccent': 'quality of life',
    'hero.subtitle':
      'Loremed Pharma develops science-backed medicines and nutritional supplements — crafted with pharmaceutical precision and the warmth of products families love to take.',
    'hero.stat1': 'Formulations in development',
    'hero.stat2': 'Therapeutic areas',
    'hero.trust': 'GMP-grade quality · Standardised botanicals · Family-first care',

    'footer.tagline': 'We care about quality of life.',
    'footer.newsletter': 'Stay informed',
    'footer.newsletterBody': 'Product news, science and milestones — a few times a year, never spam.',
    'footer.emailPlaceholder': 'Your email address',
    'footer.subscribe': 'Subscribe',
    'footer.rights': 'All rights reserved.',
    'footer.disclaimerTitle': 'Medical disclaimer',
    'footer.backToTop': 'Back to top',

    'contact.title': 'Let’s talk',
    'contact.name': 'Full name',
    'contact.email': 'Email address',
    'contact.phone': 'Phone (optional)',
    'contact.department': 'Department',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send': 'Send message',
    'contact.required': 'Required',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.products': 'المنتجات',
    'nav.about': 'من نحن',
    'nav.quality': 'الجودة',
    'nav.research': 'البحث والتطوير',
    'nav.contact': 'تواصل معنا',
    'nav.menu': 'القائمة',
    'nav.close': 'إغلاق',
    'nav.openSearch': 'بحث',

    'cta.explore': 'عرض المنتجات',
    'cta.about': 'عن لوريمد',
    'cta.contact': 'تواصل معنا',
    'cta.getInTouch': 'تواصل معنا',
    'cta.viewAll': 'عرض كل المنتجات',
    'cta.learnMore': 'اعرف المزيد',
    'cta.readMore': 'اقرأ المزيد',
    'cta.quickView': 'عرض سريع',
    'cta.viewProduct': 'عرض المنتج',
    'cta.download': 'تحميل البيانات',
    'cta.allNews': 'كل الأخبار',
    'cta.talkToUs': 'تحدث إلى فريقنا',
    'cta.discover': 'اكتشف العلم',

    'search.placeholder': 'ابحث في المنتجات والعلوم والجودة…',
    'search.title': 'ابحث في لوريمد',
    'search.empty': 'ابدأ الكتابة للبحث في الكتالوج.',
    'search.noResults': 'لا توجد نتائج.',

    'loading.line1': 'نحن نهتم بـ',
    'loading.line2': 'جودة الحياة',

    'lang.switch': 'اللغة',

    'hero.eyebrow': 'الأدوية والتغذية',
    'hero.title': 'علم يهتم بجودة الحياة',
    'hero.titlePre': 'علمٌ يهتم بـ',
    'hero.titleAccent': 'جودة الحياة',
    'hero.subtitle':
      'تطوّر لوريمد فارما أدوية ومكملات غذائية قائمة على العلم — بدقة صيدلانية ومنتجات تحبّها العائلات.',
    'hero.stat1': 'تركيبة قيد التطوير',
    'hero.stat2': 'مجالات علاجية',
    'hero.trust': 'جودة بمعايير GMP · مستخلصات نباتية قياسية · رعاية تبدأ من العائلة',

    'footer.tagline': 'نحن نهتم بجودة الحياة.',
    'footer.newsletter': 'ابقَ على اطلاع',
    'footer.newsletterBody': 'أخبار المنتجات والعلوم والإنجازات — بضع مرات في العام، بدون إزعاج.',
    'footer.emailPlaceholder': 'بريدك الإلكتروني',
    'footer.subscribe': 'اشترك',
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.disclaimerTitle': 'إخلاء المسؤولية الطبية',
    'footer.backToTop': 'العودة للأعلى',

    'contact.title': 'لنتحدث',
    'contact.name': 'الاسم الكامل',
    'contact.email': 'البريد الإلكتروني',
    'contact.phone': 'الهاتف (اختياري)',
    'contact.department': 'القسم',
    'contact.subject': 'الموضوع',
    'contact.message': 'الرسالة',
    'contact.send': 'إرسال الرسالة',
    'contact.required': 'مطلوب',
  },
} as const;

export type TranslationKey = keyof (typeof dictionaries)['en'];
