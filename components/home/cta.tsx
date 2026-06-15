import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'

export function CTA() {
  return (
    <section className="container-px mx-auto max-w-[1536px] pb-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground lg:px-16 lg:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, var(--accent) 0, transparent 35%), radial-gradient(circle at 80% 80%, var(--accent) 0, transparent 30%)',
            }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-bold sm:text-4xl">
              Ready to equip your facility with confidence?
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-primary-foreground/85">
              Talk to our specialists for a tailored quotation, product demo or complete project
              consultation. We respond within one business day.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg transition-transform hover:scale-[1.03]"
              >
                Request a Quote
                <ArrowRight className="size-4" />
              </Link>

            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
