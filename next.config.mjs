/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: import.meta.dirname,
  },
  async rewrites() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
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
