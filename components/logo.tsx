import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({
  className,
  variant = 'default',
}: {
  className?: string
  variant?: 'default' | 'light'
}) {
  return (
    <Link
      href="/"
      className={cn('inline-flex items-center gap-2.5', className)}
      aria-label="SAFERX Medical Supplies home"
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 3v18M3 12h18"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-background" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-heading text-lg font-extrabold tracking-tight',
            variant === 'light' ? 'text-background' : 'text-foreground',
          )}
        >
          SAFE<span className="text-primary">RX</span>
        </span>
        <span
          className={cn(
            'text-[10px] font-medium uppercase tracking-[0.18em]',
            variant === 'light'
              ? 'text-background/70'
              : 'text-muted-foreground',
          )}
        >
          Medical Supplies
        </span>
      </span>
    </Link>
  )
}
