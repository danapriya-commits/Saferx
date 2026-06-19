'use client'

import { motion } from 'motion/react'
import { Star, Quote } from 'lucide-react'
import { SectionHeading } from '@/components/section'
import { TESTIMONIALS } from '@/lib/site-data'

export function Testimonials() {
  return (
    <section className="bg-secondary py-14 lg:py-20">
      <div className="container-px mx-auto max-w-[1536px]">
        <SectionHeading
          eyebrow="Testimonials"
          title="What healthcare leaders say about us"
          description="We measure success from the trust of the clients"
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col rounded-2xl border border-border bg-card p-7 shadow-sm"
            >
              <Quote className="size-9 text-accent" aria-hidden />
              <div className="mt-3 flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} className="size-4 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-pretty leading-relaxed text-foreground">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <p className="font-semibold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
