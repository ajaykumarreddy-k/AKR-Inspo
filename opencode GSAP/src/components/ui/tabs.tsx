import { cn } from '@/lib/utils'

interface TabsProps {
  tabs: { id: string; label: string }[]
  activeTab: string
  onChange: (id: string) => void
  className?: string
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn('flex gap-1 bg-[var(--color-surface)] rounded-lg p-1 border border-[var(--color-border)]', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200',
            activeTab === tab.id
              ? 'bg-[var(--color-primary)] text-white shadow-sm'
              : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)]'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

interface TabContentProps {
  id: string
  activeTab: string
  children: React.ReactNode
  className?: string
}

export function TabContent({ id, activeTab, children, className }: TabContentProps) {
  if (id !== activeTab) return null
  return <div className={cn('pt-4', className)}>{children}</div>
}
