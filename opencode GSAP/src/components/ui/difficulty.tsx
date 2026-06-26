import { cn } from '@/lib/utils'
import type { Difficulty } from '@/lib/types'

const difficultyConfig: Record<Difficulty, { label: string; class: string }> = {
  beginner: { label: 'Beginner', class: 'text-green-400 bg-green-500/10 border-green-500/20' },
  intermediate: { label: 'Intermediate', class: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' },
  advanced: { label: 'Advanced', class: 'text-red-400 bg-red-500/10 border-red-500/20' },
}

interface DifficultyBadgeProps {
  difficulty: Difficulty
  className?: string
}

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
  const config = difficultyConfig[difficulty]
  return (
    <span className={cn(
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border',
      config.class,
      className
    )}>
      {config.label}
    </span>
  )
}
