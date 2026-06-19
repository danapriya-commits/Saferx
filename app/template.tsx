'use client'

import { motion } from 'motion/react'
import { usePathname } from 'next/navigation'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Don't animate the admin routes to prevent interfering with the editor
  if (pathname?.startsWith('/admin')) {
    return <>{children}</>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1], // Custom spring-like easing
      }}
      className="will-change-[opacity,transform,filter]"
    >
      {children}
    </motion.div>
  )
}
