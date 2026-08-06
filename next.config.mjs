/**
 * Two build modes:
 *
 *   npm run build          → server build (Vercel). Image optimisation and
 *                            security headers are handled by Next at runtime.
 *   npm run build:static   → static export to `out/`, for uploading to shared
 *                            hosting (cPanel). No Node runtime is required, so
 *                            image optimisation and headers move to Apache —
 *                            see `public/.htaccess`.
 */
const isStaticExport = process.env.STATIC_EXPORT === '1';

/**
 * Kept in one place and mirrored — by hand, not by build step — into the
 * `Header set Content-Security-Policy` line in `public/.htaccess`, since the
 * static export serves from Apache and never runs this function. Update both
 * together.
 *
 * 'unsafe-inline' on script-src/style-src is a deliberate trade-off: the site
 * has no per-request nonce (the static export is built once, ahead of any
 * request), and it ships inline JSON-LD (`src/lib/seo.tsx`) plus Tailwind/
 * Framer Motion inline `style` attributes that a strict policy would block.
 * next/font self-hosts under `/_next/static`, so it's covered by 'self' with
 * no external font host needed. frame-src only opens the two embeds actually
 * used: the contact-page Google Maps iframe and the YouTube product videos.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src https://maps.google.com https://www.youtube-nocookie.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join('; ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    // Delivery build should not be blocked by lint; CI can run `next lint` separately.
    ignoreDuringBuilds: true,
  },

  ...(isStaticExport
    ? {
        output: 'export',
        // Emits `products/ivylor/index.html` rather than `products/ivylor.html`,
        // which is what Apache needs to serve clean URLs without rewrite rules.
        trailingSlash: true,
        // The optimiser needs a Node server; static hosting serves originals.
        images: { unoptimized: true },
      }
    : {
        images: { formats: ['image/avif', 'image/webp'] },
        async headers() {
          return [
            {
              source: '/:path*',
              headers: [
                { key: 'X-Content-Type-Options', value: 'nosniff' },
                { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
                { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                { key: 'Content-Security-Policy', value: CSP },
              ],
            },
          ];
        },
      }),
};

export default nextConfig;
