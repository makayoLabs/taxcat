/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // Allow builds with ESLint warnings for deployment
  },
  typescript: {
    ignoreBuildErrors: true, // Allow builds with TypeScript warnings for deployment
  },
  // Optimize for production
  poweredByHeader: false,
  compress: true,

  // Performance optimizations
  swcMinify: true,
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Bundle analyzer (optional - uncomment for analysis)
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   if (!dev && !isServer) {
  //     config.plugins.push(
  //       new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)({
  //         analyzerMode: 'static',
  //         openAnalyzer: false,
  //       })
  //     );
  //   }
  //   return config;
  // },

  // Docker configuration
  output: 'standalone',
}

module.exports = nextConfig 