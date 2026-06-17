'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { EditableText } from '@/components/admin/EditableText'

const STATS = [
  { value: 500, suffix: '+', label: 'Installations' },
  { value: 100, suffix: '+', label: 'Healthcare Clients' },
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 24, suffix: '/7', label: 'Support' },
]

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(eased * to))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}

export function Stats() {
  return (
    <section className="relative z-10 -mt-12 px-5 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="glass grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border/60 shadow-xl md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-card px-6 py-8 text-center"
            >
              <p className="font-heading text-4xl font-extrabold text-primary sm:text-5xl">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm font-medium text-muted-foreground">
                <EditableText section="stats" fieldKey={`label_${i}`}>
                  {s.label}
                </EditableText>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
