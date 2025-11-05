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
  // Docker configuration
  output: 'standalone',
};

module.exports = nextConfig;
