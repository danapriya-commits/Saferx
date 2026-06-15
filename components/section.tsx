import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  description,
  center,
  className,
  light,
}: {
  eyebrow?: string
  title: string
  description?: string
  center?: boolean
  className?: string
  light?: boolean
}) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        center && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            'mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider',
            light
              ? 'bg-background/10 text-accent'
              : 'bg-primary/10 text-primary',
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'text-pretty text-3xl font-bold tracking-tight sm:text-4xl',
          light ? 'text-background' : 'text-foreground',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-base leading-relaxed',
            light ? 'text-background/70' : 'text-muted-foreground',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  backgroundImage,
}: {
  eyebrow?: string
  title: string
  description?: string
  breadcrumb?: string
  backgroundImage?: string
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-secondary/40">
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          className="pointer-events-none object-cover opacity-100"
          priority
        />
      )}
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          backgroundImage ? "bg-gradient-to-r from-background via-background/80 to-background/20" : "opacity-[0.5]"
        )}
        style={
          backgroundImage 
            ? undefined 
            : {
                backgroundImage:
                  'radial-gradient(circle at 15% 20%, color-mix(in oklch, var(--primary) 14%, transparent), transparent 45%), radial-gradient(circle at 85% 0%, color-mix(in oklch, var(--accent) 18%, transparent), transparent 40%)',
              }
        }
      />
      <div className="relative mx-auto max-w-[1536px] container-px py-16 sm:py-20">
        {breadcrumb && (
          <nav className="mb-4 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{breadcrumb}</span>
          </nav>
        )}
        {eyebrow && (
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {eyebrow}
          </span>
        )}
        <h1 className="max-w-3xl text-pretty text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
