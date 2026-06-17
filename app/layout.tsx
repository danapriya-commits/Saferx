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
    default: 'SAFERX Medical Supplies | Complete Healthcare Technology Solutions',
    template: '%s | SAFERX Medical Supplies',
  },
  description:
    'SAFERX delivers world-class medical equipment, hospital infrastructure, diagnostics and critical care solutions for modern healthcare institutions.',
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
    // We use no-store to ensure the page always reflects the latest published changes.
    // In production, this can be changed to use ISR via next: { revalidate: 60 }
    const res = await fetch('http://127.0.0.1:8000/api/editor/content?status=published', { 
      cache: 'no-store' 
    })
    if (res.ok) {
      initialContent = await res.json()
    }
  } catch (err) {
    console.error('Failed to fetch initial content server-side:', err)
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
