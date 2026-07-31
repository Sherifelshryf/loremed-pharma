import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { products } from '@/content/products';

/**
 * The static export sets `trailingSlash`, so pages are served from
 * `/products/index.html` and Apache 301s `/products` to `/products/`. Next
 * already emits the trailing-slash form in the canonical tags, so the sitemap
 * has to agree — otherwise every URL submitted to Search Console redirects and
 * contradicts the canonical of the page it lands on.
 */
const TRAILING_SLASH = process.env.STATIC_EXPORT === '1';

function href(path: string) {
  if (!TRAILING_SLASH) return `${site.url}${path}`;
  return path === '' ? `${site.url}/` : `${site.url}${path}/`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Build time, so a redeploy tells crawlers the content actually changed.
  const lastModified = new Date();

  // `/order` is deliberately absent: it is a checkout step with no standalone
  // value in search results.
  const pages = ['', '/products', '/about', '/quality', '/research', '/contact'];

  return [
    ...pages.map((path) => ({
      url: href(path),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.8,
    })),
    ...products.map((p) => ({
      url: href(`/products/${p.slug}`),
      lastModified,
      changeFrequency: 'monthly' as const,
      // Available products are the ones worth ranking; the rest are not yet buyable.
      priority: p.status === 'available' ? 0.7 : 0.5,
    })),
  ];
}
