import { cn } from '@/lib/utils'
import type { PluginType } from '@/lib/types'

const clubPlugins: PluginType[] = [
  'MotionPathPlugin', 'DrawSVGPlugin', 'MorphSVGPlugin', 'SplitText',
  'InertiaPlugin', 'Physics2DPlugin', 'PhysicsPropsPlugin', 'ScrollSmoother'
]

interface PluginBadgeProps {
  plugin: PluginType
  className?: string
}

export function PluginBadge({ plugin, className }: PluginBadgeProps) {
  const isClub = clubPlugins.includes(plugin)
  return (
    <span className={cn(
      'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium border',
      isClub
        ? 'text-purple-400 bg-purple-500/10 border-purple-500/20'
        : 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      className
    )}>
      {plugin}
      {isClub && <span className="text-[10px] opacity-60">GSAP+</span>}
    </span>
  )
}
