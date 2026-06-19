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
  async rewrites() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!API_URL) {
      console.warn('Warning: NEXT_PUBLIC_API_URL is not set. API rewrites may not work correctly. Please check .env.local');
    }
    return [
      {
        source: '/api/auth/:path*',
        destination: `${API_URL}/api/auth/:path*`,
      },
      {
        source: '/api/editor/:path*',
        destination: `${API_URL}/api/editor/:path*`,
      },
      {
        source: '/api/public/:path*',
        destination: `${API_URL}/api/public/:path*`,
      },
      {
        source: '/static/uploads/:path*',
        destination: `${API_URL}/static/uploads/:path*`,
      },
    ]
  },
}

export default nextConfig
