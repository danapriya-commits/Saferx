'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight, ShieldCheck, Wrench, CalendarClock, Headphones } from 'lucide-react'
import { EditableText } from '@/components/admin/EditableText'
import { EditableImage } from '@/components/admin/EditableImage'

const BADGES = [
  { icon: ShieldCheck, label: 'Certified Products' },
  { icon: Wrench, label: 'Expert Installation' },
  { icon: CalendarClock, label: 'Annual Maintenance' },
  { icon: Headphones, label: '24/7 Support' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <EditableImage
        section="hero"
        fieldKey="background_image"
        defaultSrc="/images/hero-icu.png"
        alt="Modern hospital ICU with advanced medical equipment"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/40" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 80% 20%, color-mix(in oklch, var(--accent) 40%, transparent), transparent 45%)',
        }}
      />

      <div className="relative mx-auto max-w-[1536px] container-px py-24 sm:py-32 lg:py-40">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <EditableText section="hero" fieldKey="badge_text">
              Trusted Healthcare Technology Partner
            </EditableText>
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 text-balance text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            <EditableText section="hero" fieldKey="title" multiline>
              Complete Healthcare Technology Solutions for Modern Hospitals
            </EditableText>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/85"
          >
            <EditableText section="hero" fieldKey="description" multiline>
              Delivering world-class medical equipment, hospital infrastructure, diagnostics and critical-care solutions across healthcare institutions.
            </EditableText>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <EditableText section="hero" fieldKey="primary_button">Explore Solutions</EditableText> <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              <EditableText section="hero" fieldKey="secondary_button">Request Consultation</EditableText>
            </Link>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4"
          >
            {BADGES.map((b, idx) => (
              <li key={b.label} className="flex items-center gap-2.5 text-white">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
                  <b.icon className="h-4.5 w-4.5 text-accent" />
                </span>
                <span className="text-sm font-medium leading-tight">
                  <EditableText section="hero" fieldKey={`badge_${idx}`}>
                    {b.label}
                  </EditableText>
                </span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
