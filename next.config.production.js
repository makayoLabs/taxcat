/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production optimizations
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // TypeScript and ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Performance
  swcMinify: true,
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    serverComponentsExternalPackages: ['critters', 'nodemailer'],
  },

  // Output for Docker - disable static optimization to avoid NextAuth issues
  output: 'standalone',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,

  // Experimental features for session handling
  experimental: {
    serverComponentsExternalPackages: ['next-auth'],
  },


  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;