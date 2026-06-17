'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react'
import { Logo } from '@/components/logo'

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/saferx-medical-supplies-private-limited/',
    path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z',
  },
  {
    label: 'YouTube',
    href: '#',
    path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
  {
    label: 'Facebook',
    href: '#',
    path: 'M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.08 24 18.09 24 12.07z',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/saferxmedical/',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.181a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z',
  },
]

function SocialIcon({ path, label }: { path: string; label: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" role="img" aria-label={label}>
      <path d={path} />
    </svg>
  )
}
import { usePathname } from 'next/navigation'
import { COMPANY, SOLUTIONS, EQUIPMENT_CATEGORIES, WHATSAPP_NUMBER } from '@/lib/site-data'

export function SiteFooter() {
  const pathname = usePathname()
  
  if (pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-[1536px] container-px py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr_1.1fr]">
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-background/65">
              Delivering world-class medical equipment, hospital infrastructure
              and critical-care solutions for modern healthcare institutions.
            </p>
            <div className="mt-6 flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/10 text-background transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <SocialIcon path={s.path} label={s.label} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background">
              Solutions
            </h3>
            <ul className="space-y-2.5 text-sm text-background/65">
              {SOLUTIONS.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/solutions#${s.slug}`}
                    className="transition-colors hover:text-accent"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background">
              Equipment
            </h3>
            <ul className="space-y-2.5 text-sm text-background/65">
              {EQUIPMENT_CATEGORIES.slice(0, 5).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/equipment#${c.slug}`}
                    className="transition-colors hover:text-accent"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/projects" className="transition-colors hover:text-accent">
                  Projects
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">
              Our Location
            </h3>
            <div className="space-y-1.5 text-[15px] text-gray-300">
              <p>D.No.9/24,</p>
              <p>Irugur Main Road, Irugur</p>
              <p>Coimbatore-641103, Tamil Nadu, India</p>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">
              Contact Info
            </h3>
            
            <div className="space-y-6 text-[15px] text-gray-300">
              <div className="space-y-1.5">
                <p>For Domestic Enquiry</p>
                <p>+91 9043490435</p>
                <a href="mailto:sales@saferxmedical.com" className="block hover:text-white transition-colors">sales@saferxmedical.com</a>
              </div>
              
              <div className="space-y-1.5">
                <p>International Enquiry</p>
                <p>+91 7010539681</p>
                <a href="mailto:intlsales@saferxmedical.com" className="block hover:text-white transition-colors">intlsales@saferxmedical.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-center border-t border-background/15 pt-8 text-xs text-background/55 text-center">
          <p>
            &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  )
}
