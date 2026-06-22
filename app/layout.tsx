export const revalidate = 0;
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
import { supabase } from '@/lib/supabase'
import { headers } from 'next/headers'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  headers(); // Force dynamic rendering on every request
  let initialContent: Record<string, Record<string, string>> = {}
  try {
    const { data: publishedItems, error } = await supabase
      .from('website_content')
      .select('*')
      .eq('page', 'home')
      .eq('status', 'published');

    if (!error && publishedItems) {
      publishedItems.forEach(item => {
        if (!initialContent[item.section]) initialContent[item.section] = {};
        initialContent[item.section][item.field_key] = item.content_value;
      });
    }
  } catch (err) {
    // Silently continue
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
