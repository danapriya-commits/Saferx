import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { SOLUTIONS } from '@/lib/site-data'

export function FeaturedSolutions() {
  return (
    <section className="mx-auto max-w-[1536px] container-px py-20 sm:py-28">
      <SectionHeading
        center
        eyebrow="What We Do"
        title="End-to-end solutions for every department"
        description="From critical care to laboratory automation, SAFERX equips hospitals with reliable, certified technology backed by lifetime service."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SOLUTIONS.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.06}>
            <Link
              href={`/solutions#${s.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150"
                aria-hidden
              />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <s.icon className="h-7 w-7" />
              </span>
              <h3 className="relative mt-5 text-lg font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
              <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Learn more
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
