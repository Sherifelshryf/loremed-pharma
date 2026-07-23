import type { Metadata, Viewport } from 'next';
import { Inter, Outfit, Cairo } from 'next/font/google';
import './globals.css';
import { site } from '@/content/site';
import { organizationSchema, websiteSchema, JsonLd } from '@/lib/seo';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { LoadingScreen } from '@/components/layout/LoadingScreen';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-arabic',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Loremed Pharma — We care about quality of life',
    template: '%s · Loremed Pharma',
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'Loremed',
    'Loremed Pharma',
    'pharmaceutical company Egypt',
    'nutritional supplements',
    'immune support',
    'ivy leaf syrup',
    'omega-3',
    'multivitamin',
    'GMP pharmaceutical',
    'healthcare Egypt',
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: 'Health',
  formatDetection: { telephone: false, address: false, email: false },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: 'Loremed Pharma — We care about quality of life',
    description: site.description,
    url: site.url,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loremed Pharma — We care about quality of life',
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport: Viewport = {
  themeColor: '#322353',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${outfit.variable} ${cairo.variable}`}>
      <body>
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <LanguageProvider>
          <LoadingScreen />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-primary-800 focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main" className="min-h-screen">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
