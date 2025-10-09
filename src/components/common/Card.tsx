import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  title?: string
  subtitle?: string
  className?: string
  hover?: boolean
}

export default function Card({ children, title, subtitle, className = '', hover = false }: CardProps) {
  return (
    <div 
      className={`glass-card p-6 smooth-transition ${hover ? 'hover:scale-[1.02] hover:shadow-2xl' : ''} ${className}`}
      style={{
        animation: 'fade-in 0.5s ease-out'
      }}
    >
      {(title || subtitle) && (
        <div className="mb-6 border-b border-white/[0.08] pb-4">
          {title && (
            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-white/60 text-sm leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

