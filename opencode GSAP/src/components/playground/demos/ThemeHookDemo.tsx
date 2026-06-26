import { useTheme } from '@/hooks/useTheme'
import { Button } from '@/components/ui/button'

export default function ThemeHookDemo() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-[var(--color-text-muted)]">
        Current Theme: <strong className="text-[var(--color-text)] capitalize">{theme}</strong>
      </p>
      <Button onClick={toggleTheme}>Toggle Theme</Button>
    </div>
  )
}
