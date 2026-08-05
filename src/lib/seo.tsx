import type { Metadata } from 'next';
import { site } from '@/content/site';
import type { Product } from '@/content/products';

/** 1200x630 preview shown when a link is shared on WhatsApp, Facebook or LinkedIn. */
export const OG_IMAGE = '/og-image.jpg';

export function buildMetadata({
  title,
  description,
  path = '/',
  keywords,
}: {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const desc = description ?? site.description;
  const url = path;
  return {
    title,
    description: desc,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} · ${site.name}`,
      description: desc,
      url,
      siteName: site.name,
      type: 'website',
      locale: 'en_US',
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} · ${site.name}`,
      description: desc,
      images: [OG_IMAGE],
    },
  };
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  // Google uses this to associate the mark with the brand in search results.
  logo: `${site.url}/media/logo.png`,
  image: `${site.url}/og-image.jpg`,
  slogan: site.tagline,
  description: site.description,
  foundingDate: String(site.foundingYear),
  email: site.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  sameAs: [site.social.facebook, site.social.youtube, site.social.linkedin],
  areaServed: ['Egypt', 'Middle East', 'Africa'],
  knowsAbout: [
    'Pharmaceuticals',
    'Nutritional supplements',
    'Immune support',
    'Respiratory care',
    'Vitamins and minerals',
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  url: site.url,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${site.url}/products?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export function productSchema(p: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.shortDescription,
    category: p.category,
    brand: { '@type': 'Brand', name: site.name },
    manufacturer: { '@type': 'Organization', name: site.name },
    audience: { '@type': 'PeopleAudience', suggestedMinAge: p.ageGroup },
    additionalProperty: p.keyIngredients.map((k) => ({
      '@type': 'PropertyValue',
      name: k.name,
      value: k.note,
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.url}`,
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}
