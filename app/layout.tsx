import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Inter, Manrope, Geist_Mono } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { WhatsAppWidget } from '@/components/whatsapp-widget'
import { ScrollToTop } from '@/components/scroll-to-top'

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })
const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
})
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Saferx Medical Supplies | Complete Healthcare Technology Solutions',
    template: '%s | Saferx Medical Supplies',
  },
  description:
    'Saferx delivers world-class medical equipment, hospital infrastructure, diagnostics and critical care solutions for modern healthcare institutions.',
  generator: 'v0.app',
  keywords: [
    'medical equipment',
    'hospital infrastructure',
    'ICU equipment',
    'diagnostic imaging',
    'patient monitoring',
    'healthcare technology',
  ],
}

import { ContentProvider } from '@/components/admin/ContentProvider'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Fetch published content safely on server-side
  let initialContent = {}
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
    const res = await fetch(`${apiUrl}/api/editor/content?status=published`, { 
      next: { revalidate: 60 },
    })
    if (res.ok) {
      initialContent = await res.json()
    }
  } catch (err) {
    // Silently continue — the site works fine with defaults when the API is unavailable
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${manrope.variable} ${geistMono.variable} bg-background`}
    >
      <body suppressHydrationWarning className="font-sans antialiased overflow-x-hidden">
        <ContentProvider initialContent={initialContent}>
          <SiteHeader />
          <main className="min-h-screen">{children}</main>
          <SiteFooter />
          <WhatsAppWidget />
          <ScrollToTop />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ContentProvider>
      </body>
    </html>
  )
}
