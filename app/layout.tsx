import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Inter, Manrope, Geist_Mono } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { WhatsAppWidget } from '@/components/whatsapp-widget'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${manrope.variable} ${geistMono.variable} bg-background`}
    >
      <body suppressHydrationWarning className="font-sans antialiased overflow-x-hidden">
        <SiteHeader />
        <main className="min-h-screen">{children}</main>
        <SiteFooter />
        <WhatsAppWidget />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
