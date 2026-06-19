/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: 'http', hostname: '127.0.0.1', port: '8000' },
      { protocol: 'https', hostname: '**.saferxmedical.com' },
    ],
  },
  turbopack: {
    root: import.meta.dirname,
  },
}

export default nextConfig
