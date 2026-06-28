'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import Link from 'next/link'

interface PremiumButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  icon?: ReactNode
  /** Open href in a new tab as an external link */
  external?: boolean
}

export function PremiumButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  icon,
  external = false,
}: PremiumButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed'

  const sizeClasses = {
    sm: 'px-3 py-2 text-xs rounded-md',
    md: 'px-6 py-3 text-sm rounded-lg',
    lg: 'px-8 py-4 text-base rounded-lg',
  }

  const variantClasses = {
    primary:
      'bg-accent text-accent-foreground hover:bg-accent-foreground/90 hover:text-accent',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline:
      'border border-accent text-accent hover:bg-accent/10 hover:border-accent-foreground',
  }

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`

  const content = (
    <motion.div
      className={classes}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </motion.div>
  )

  if (href) {
    if (external) {
      return (
        <Link href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </Link>
      )
    }
    return <Link href={href}>{content}</Link>
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className="p-0">
      {content}
    </button>
  )
}
