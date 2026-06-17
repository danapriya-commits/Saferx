'use client'

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
import { EditableText } from '@/components/admin/EditableText'
import { EditableImage } from '@/components/admin/EditableImage'
import { EditableCard } from '@/components/admin/EditableCard'
import { useContent } from '@/components/admin/ContentProvider'

const FEATURES = [
  {
    id: 'feat1',
    icon: BadgeCheck,
    title: 'Genuine Equipment',
    desc: 'Only authorized, certified products sourced directly from leading global manufacturers.',
  },
  {
    id: 'feat2',
    icon: Wrench,
    title: 'Installation Support',
    desc: 'Expert biomedical engineers handle site planning, installation and commissioning.',
  },
  {
    id: 'feat3',
    icon: CalendarClock,
    title: 'AMC Services',
    desc: 'Comprehensive annual maintenance contracts to maximise uptime and equipment life.',
  },
  {
    id: 'feat4',
    icon: GraduationCap,
    title: 'Training & Education',
    desc: 'Hands-on clinical and technical training for your medical and engineering staff.',
  },
  {
    id: 'feat5',
    icon: FileCheck2,
    title: 'Regulatory Compliance',
    desc: 'Every solution meets ISO, CDSCO and international healthcare safety standards.',
  },
  {
    id: 'feat6',
    icon: Cpu,
    title: 'Technical Expertise',
    desc: '15+ years of healthcare technology experience across 100+ institutions.',
  },
]

export function WhyChoose() {
  const { content } = useContent()

  return (
    <section className="mx-auto max-w-[1536px] container-px py-14 sm:py-20">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-border shadow-xl">
              <EditableImage
                section="home_why_choose"
                fieldKey="main_image"
                defaultSrc="/images/team.png"
                alt="SAFERX biomedical engineering team"
                width={720}
                height={560}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="glass absolute -bottom-6 -right-2 hidden rounded-2xl p-5 shadow-lg sm:block">
              <p className="font-heading text-3xl font-extrabold text-primary">
                <EditableText section="home_why_choose" fieldKey="retention_value">98%</EditableText>
              </p>
              <p className="text-sm text-muted-foreground">
                <EditableText section="home_why_choose" fieldKey="retention_label">Client retention rate</EditableText>
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <EditableText section="home_why_choose" fieldKey="eyebrow">Why Choose SAFERX</EditableText>
          </span>
          <h2 className="text-pretty text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            <EditableText section="home_why_choose" fieldKey="title">A partner you can trust with patient lives</EditableText>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            <EditableText section="home_why_choose" fieldKey="description">We don't just supply equipment — we build long-term healthcare infrastructure partnerships backed by service, training and compliance.</EditableText>
          </p>

          <div className="mt-8 grid gap-x-6 gap-y-7 sm:grid-cols-2">
            {FEATURES.map((f, i) => {
              const cardId = f.id
              const title = content['home_why_choose']?.[`${cardId}_title`] || f.title
              const desc = content['home_why_choose']?.[`${cardId}_desc`] || f.desc

              return (
                <Reveal key={f.id} delay={i * 0.05}>
                  <EditableCard
                    section="home_why_choose"
                    cardId={cardId}
                    className="flex gap-3.5"
                    fields={[
                      { key: 'title', label: 'Title', type: 'text', defaultValue: f.title },
                      { key: 'desc', label: 'Description', type: 'textarea', defaultValue: f.desc }
                    ]}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-primary">
                      <f.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {desc}
                      </p>
                    </div>
                  </EditableCard>
                </Reveal>
              )
            })}
          </div>

          <Link
            href="/about"
            className="mt-9 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            <EditableText section="home_why_choose" fieldKey="button_text">More about us</EditableText> <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
