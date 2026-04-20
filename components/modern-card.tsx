'use client'

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

const cardVariants = cva(
  'glass neumi-sm rounded-2xl p-6 transition-smooth hover-lift relative overflow-hidden group',
  {
    variants: {
      variant: {
        default: 'bg-white/8 hover:bg-white/12',
        cyan: 'bg-gradient-cyan',
        purple: 'bg-gradient-purple',
        pink: 'bg-gradient-pink',
        orange: 'bg-gradient-orange',
        green: 'bg-gradient-green',
        yellow: 'bg-gradient-yellow',
        gradient: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
      },
      interactive: {
        true: 'cursor-pointer hover:scale-102',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      interactive: false,
    },
  }
)

interface ModernCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cardVariants> {
  children: React.ReactNode
  colorAccent?: string
  header?: React.ReactNode
  footer?: React.ReactNode
}

export const ModernCard = React.forwardRef<HTMLDivElement, ModernCardProps>(
  ({ className, variant, interactive, children, colorAccent, header, footer, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cardVariants({ variant, interactive, className })}
        {...props}
      >
        {/* Animated gradient border effect */}
        {colorAccent && (
          <div
            className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `linear-gradient(90deg, transparent, ${colorAccent}, transparent)`,
            }}
          />
        )}

        {header && <div className="mb-4">{header}</div>}

        <div className="relative z-10">
          {children}
        </div>

        {footer && <div className="mt-4 pt-4 border-t border-white/10">{footer}</div>}
      </div>
    )
  }
)

ModernCard.displayName = 'ModernCard'
