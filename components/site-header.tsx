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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Logo } from '@/components/logo'
import { NAV_LINKS, MEGA_MENU, WHATSAPP_NUMBER } from '@/lib/site-data'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const hasMega = (label: string) =>
    ['Solutions', 'Medical Equipment', 'Projects'].includes(label)

  const hasDropdown = (label: string) => label === 'Blog'

  const BLOG_MENU = [
    { label: 'Chemicals', href: '/blog/chemicals' },
    { label: 'Nutraceuticals', href: '/blog/nutraceuticals' },
    { label: 'Disposables', href: '/blog/disposables' },
  ]

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-border bg-card/85 backdrop-blur-xl shadow-sm'
          : 'bg-card/40 backdrop-blur-md',
      )}
    >
      <div className="mx-auto flex h-24 w-full max-w-[1536px] items-center justify-between container-px py-4">
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
                    'flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap',
                    active
                      ? 'text-primary'
                      : 'text-foreground/75 hover:text-primary',
                  )}
                >
                  {link.label}
                  {hasMega(link.label) && (
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                  )}
                  {hasDropdown(link.label) && (
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {hasMega(link.label) && (
                  <div className="invisible absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="grid grid-cols-3 gap-6 rounded-2xl border border-border bg-card/98 p-6 shadow-xl backdrop-blur-xl">
                      {MEGA_MENU.map((col) => (
                        <div key={col.heading}>
                          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
                            {col.heading}
                          </p>
                          <ul className="space-y-1">
                            {col.items.map((item) => (
                              <li key={item.label}>
                                <Link
                                  href={item.href}
                                  className="block rounded-md px-2 py-1.5 text-sm text-foreground/75 transition-colors hover:bg-primary/5 hover:text-primary"
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {hasDropdown(link.label) && (
                  <div className="invisible absolute left-0 top-full z-50 min-w-[220px] pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="flex flex-col rounded-sm border border-gray-200 bg-white shadow-xl">
                      {BLOG_MENU.map((item, i) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className={cn(
                            'block px-5 py-3.5 text-[15px] font-semibold text-[#38c8e8] transition-colors hover:bg-gray-50',
                            i !== BLOG_MENU.length - 1 && 'border-b border-gray-200'
                          )}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
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
                <Accordion className="w-full">
                  {NAV_LINKS.map((link) =>
                    hasMega(link.label) ? (
                      <AccordionItem
                        key={link.href}
                        value={link.label}
                        className="border-b-0"
                      >
                        <AccordionTrigger className="px-2 py-3 text-base font-medium hover:no-underline">
                          {link.label}
                        </AccordionTrigger>
                        <AccordionContent className="pb-1">
                          <div className="flex flex-col gap-0.5 pl-2">
                            {MEGA_MENU.find((c) =>
                              c.heading
                                .toLowerCase()
                                .includes(link.label.split(' ')[0].toLowerCase()),
                            )?.items.map((item) => (
                              <SheetClose 
                                key={item.label}
                                render={
                                  <Link
                                    href={item.href}
                                    className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-primary"
                                  >
                                    {item.label}
                                  </Link>
                                }
                              />
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ) : (
                      <SheetClose 
                        key={link.href}
                        render={
                          <Link
                            href={link.href}
                            className="block border-b border-border/50 px-2 py-3 text-base font-medium text-foreground hover:text-primary"
                          >
                            {link.label}
                          </Link>
                        }
                      />
                    ),
                  )}
                </Accordion>
                <div className="mt-5 flex flex-col gap-2 px-2">
                  <SheetClose 
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
