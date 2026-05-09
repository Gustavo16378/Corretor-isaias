import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  isLoading?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  isLoading,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-body font-semibold rounded-full transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none'

  const sizes = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-7 py-3 text-sm',
    lg: 'px-9 py-4 text-base',
  }

  const variants = {
    primary:
      'bg-gradient-to-r from-gold-dim via-gold to-gold-light text-black hover:shadow-gold-md hover:scale-105 active:scale-95',
    outline:
      'border border-gold text-gold bg-black/40 backdrop-blur-sm hover:bg-gold hover:text-black hover:border-gold hover:shadow-gold-sm active:scale-95',
    ghost: 'text-silver-light hover:text-white hover:bg-white/5 active:scale-95',
  }

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...(props as object)}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : null}
      {children}
    </motion.button>
  )
}
