import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import { Container } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { LogoBloom, GradientOrb, GridField } from '@/components/graphics/BrandBackdrop';
import { L } from '@/i18n/Localized';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden pt-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/70 via-white to-white" />
        <GridField className="opacity-50" />
        <GradientOrb color="purple" size={520} className="-left-40 top-0 opacity-60" />
        <GradientOrb color="orange" size={420} className="-right-28 bottom-0 opacity-50" />
      </div>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-eyebrow uppercase text-secondary-600">
              <L text={{ en: 'Error 404', ar: 'خطأ 404' }} />
            </p>
            <h1 className="mt-4 text-display-lg text-ink sm:text-display-xl">
              <L text={{ en: 'This page took a', ar: 'سلكت هذه الصفحة' }} />{' '}
              <span className="text-gradient"><L text={{ en: 'different path', ar: 'مسارًا مختلفًا' }} /></span>
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
              <L
                text={{
                  en: 'The page you’re looking for doesn’t exist or has moved. Let’s get you back to something useful.',
                  ar: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها. دعنا نعيدك إلى شيء مفيد.',
                }}
              />
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/" variant="primary" withArrow>
                <Home className="h-4 w-4" />
                <L text={{ en: 'Back home', ar: 'العودة للرئيسية' }} />
              </Button>
              <Button href="/products" variant="outline">
                <Search className="h-4 w-4" />
                <L text={{ en: 'Browse products', ar: 'تصفّح المنتجات' }} />
              </Button>
            </div>
          </div>
          <div className="relative mx-auto hidden w-full max-w-sm lg:block">
            <LogoBloom className="w-full opacity-90" />
          </div>
        </div>
      </Container>
    </section>
  );
}
