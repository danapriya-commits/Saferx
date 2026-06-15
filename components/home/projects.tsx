'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { SectionHeading } from '@/components/section'
import { PROJECTS } from '@/lib/site-data'

export function Projects() {
  return (
    <section className="container-px mx-auto max-w-[1536px] py-20 lg:py-28">
      <SectionHeading
        eyebrow="Our Work"
        title="Trusted on projects across the country"
        description="From single-department upgrades to full turnkey hospital builds, we deliver on time and to specification."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Link
              href="/projects"
              className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.image || '/placeholder.svg'}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                  {p.category}
                </span>
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-1.5 text-sm font-medium text-primary-foreground">
                  <MapPin className="size-4" />
                  {p.location}
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold text-accent-foreground/80">{p.stat}</p>
                <h3 className="mt-1 text-lg font-bold leading-snug text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  View case study
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
