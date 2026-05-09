import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'gold' | 'glass' | 'outline'
  className?: string
}

export default function Badge({ children, variant = 'gold', className = '' }: BadgeProps) {
  const variants = {
    gold: 'bg-gold text-black font-semibold',
    glass: 'glass-card text-silver-light',
    outline: 'border border-gold/40 text-gold',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-full font-body tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
