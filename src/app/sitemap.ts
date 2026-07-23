import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { products } from '@/content/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const routes = ['', '/products', '/about', '/quality', '/research', '/contact'].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date('2026-07-01'),
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const productRoutes = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: new Date('2026-07-01'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...productRoutes];
}
