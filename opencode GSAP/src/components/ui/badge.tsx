import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
      variant === 'default' && 'bg-[var(--color-surface-2)] text-[var(--color-text-muted)] border border-[var(--color-border)]',
      variant === 'primary' && 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20',
      variant === 'success' && 'bg-green-500/10 text-green-400 border border-green-500/20',
      variant === 'warning' && 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
      variant === 'danger' && 'bg-red-500/10 text-red-400 border border-red-500/20',
      className
    )}>
      {children}
    </span>
  )
}
