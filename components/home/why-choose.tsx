import Image from 'next/image'
import Link from 'next/link'
import {
  BadgeCheck,
  Wrench,
  CalendarClock,
  GraduationCap,
  FileCheck2,
  Cpu,
  ArrowRight,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'

const FEATURES = [
  {
    icon: BadgeCheck,
    title: 'Genuine Equipment',
    desc: 'Only authorized, certified products sourced directly from leading global manufacturers.',
  },
  {
    icon: Wrench,
    title: 'Installation Support',
    desc: 'Expert biomedical engineers handle site planning, installation and commissioning.',
  },
  {
    icon: CalendarClock,
    title: 'AMC Services',
    desc: 'Comprehensive annual maintenance contracts to maximise uptime and equipment life.',
  },
  {
    icon: GraduationCap,
    title: 'Training & Education',
    desc: 'Hands-on clinical and technical training for your medical and engineering staff.',
  },
  {
    icon: FileCheck2,
    title: 'Regulatory Compliance',
    desc: 'Every solution meets ISO, CDSCO and international healthcare safety standards.',
  },
  {
    icon: Cpu,
    title: 'Technical Expertise',
    desc: '15+ years of healthcare technology experience across 100+ institutions.',
  },
]

export function WhyChoose() {
  return (
    <section className="mx-auto max-w-[1536px] container-px py-20 sm:py-28">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-border shadow-xl">
              <Image
                src="/images/team.png"
                alt="SAFERX biomedical engineering team"
                width={720}
                height={560}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="glass absolute -bottom-6 -right-2 hidden rounded-2xl p-5 shadow-lg sm:block">
              <p className="font-heading text-3xl font-extrabold text-primary">
                98%
              </p>
              <p className="text-sm text-muted-foreground">
                Client retention rate
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Why Choose SAFERX
          </span>
          <h2 className="text-pretty text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            A partner you can trust with patient lives
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            We don&apos;t just supply equipment — we build long-term healthcare
            infrastructure partnerships backed by service, training and
            compliance.
          </p>

          <div className="mt-8 grid gap-x-6 gap-y-7 sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05}>
                <div className="flex gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-primary">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {f.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Link
            href="/about"
            className="mt-9 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            More about us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
