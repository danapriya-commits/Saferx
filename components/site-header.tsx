'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, MessageCircle, Phone, ArrowRight } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet'
import { Logo } from '@/components/logo'
import { NAV_LINKS, WHATSAPP_NUMBER } from '@/lib/site-data'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 12)
          ticking = false
        })
        ticking = true
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-border bg-card/85 backdrop-blur-xl shadow-sm'
          : 'bg-card/40 backdrop-blur-md',
      )}
    >
      <div className="mx-auto flex h-24 w-full items-center justify-between container-px py-4">
        <Logo />

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href))
            return (
              <div key={link.href} className="group relative">
                <Link
                  href={link.href}
                  className={cn(
                    'flex items-center gap-1 rounded-md px-3 py-2 text-base font-medium transition-colors whitespace-nowrap',
                    active
                      ? 'text-primary'
                      : 'text-foreground/75 hover:text-primary',
                  )}
                >
                  {link.label}
                </Link>

              </div>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow md:inline-flex whitespace-nowrap"
          >
            Request Quote
            <ArrowRight className="h-4 w-4" />
          </Link>


          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground xl:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm overflow-y-auto p-0">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <Logo />
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              </div>
              <div className="px-3 py-4">
                <div className="w-full flex flex-col">
                  {NAV_LINKS.map((link) => (
                    <SheetClose 
                      key={link.href}
                      nativeButton={false}
                      render={
                        <Link
                          href={link.href}
                          className="block border-b border-border/50 px-2 py-3 text-base font-medium text-foreground hover:text-primary"
                        >
                          {link.label}
                        </Link>
                      }
                    />
                  ))}
                </div>
                <div className="mt-5 flex flex-col gap-2 px-2">
                  <SheetClose 
                    nativeButton={false}
                    render={
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
                      >
                        Request Quote <ArrowRight className="h-4 w-4" />
                      </Link>
                    }
                  />

                  <a
                    href="tel:+919000000000"
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-4 py-3 text-sm font-medium text-foreground"
                  >
                    <Phone className="h-4 w-4" /> Call Sales
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
