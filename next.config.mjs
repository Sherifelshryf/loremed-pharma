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
              ],
            },
          ];
        },
      }),
};

export default nextConfig;
