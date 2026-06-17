'use client'

import { BadgeCheck } from 'lucide-react'
import { CERTIFICATIONS } from '@/lib/site-data'
import { Reveal } from '@/components/reveal'

export function Certifications() {
  return (
    <section className="container-px mx-auto max-w-[1536px] py-16">
      <Reveal>
        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm lg:p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Quality & Compliance
            </p>
            <h2 className="text-balance text-2xl font-bold text-foreground">
              Certified, compliant and accountable
            </h2>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {CERTIFICATIONS.map((c) => (
              <li
                key={c}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-secondary/50 px-3 py-5 text-center"
              >
                <BadgeCheck className="size-7 text-accent-foreground" />
                <span className="text-sm font-semibold leading-tight text-foreground">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}
