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
      aria-label="Saferx Medical Supplies home"
    >
      <EditableImage
        section="global"
        fieldKey={variant === 'light' ? 'footer_logo_image' : 'logo_image'}
        defaultSrc={variant === 'light' ? '/images/footerlogo.jpg' : '/images/logo.png'}
        alt="Saferx Medical Supplies Logo"
        width={300}
        height={300}
        priority
        sizes="300px"
        className="h-20 md:h-24 w-auto object-contain"
      />
    </Link>
  )
}
