import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { EditableImage } from '@/components/admin/EditableImage'

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
      className={cn('inline-flex items-center', className)}
      aria-label="SAFERX Medical Supplies home"
    >
      <EditableImage
        section="global"
        fieldKey="logo_image"
        defaultSrc="/images/logo.png"
        alt="SafeRx Medical Supplies Logo"
        width={300}
        height={300}
        priority
        className="h-20 md:h-24 w-auto object-contain"
      />
    </Link>
  )
}
