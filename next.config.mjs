/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Optimized image configuration
  images: {
    formats: ['image/webp', 'image/avif'],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-tabs', '@radix-ui/react-select'],
  },
  // Bundle analyzer and compression
  compress: true,
  poweredByHeader: false,
  // Static optimization
  trailingSlash: false,
  // Asset optimization
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
}

export default nextConfig
