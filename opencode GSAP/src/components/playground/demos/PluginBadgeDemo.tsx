import { PluginBadge } from '@/components/ui/plugin-badge'

export default function PluginBadgeDemo() {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <PluginBadge plugin="ScrollTrigger" />
      <PluginBadge plugin="Flip" />
      <PluginBadge plugin="Observer" />
      {/* Club plugins */}
      <PluginBadge plugin="SplitText" />
      <PluginBadge plugin="ScrollSmoother" />
      <PluginBadge plugin="MorphSVGPlugin" />
    </div>
  )
}
