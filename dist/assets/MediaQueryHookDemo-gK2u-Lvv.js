const e=`import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Badge } from '@/components/ui/badge'

export default function MediaQueryHookDemo() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isTablet = useMediaQuery('(min-width: 768px)')

  return (
    <div className="flex flex-col items-center gap-4 text-[var(--color-text)]">
      <p>Resize your browser to see values change:</p>
      <div className="flex gap-4">
        <Badge variant={isDesktop ? 'success' : 'default'}>
          Desktop (min-width: 1024px): {isDesktop ? 'Yes' : 'No'}
        </Badge>
        <Badge variant={isTablet ? 'success' : 'default'}>
          Tablet (min-width: 768px): {isTablet ? 'Yes' : 'No'}
        </Badge>
      </div>
    </div>
  )
}
`;export{e as default};
