import { useCallback, useSyncExternalStore } from 'react'

function getSnapshot(): string {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function subscribe(callback: () => void): () => void {
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => observer.disconnect()
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot)

  const setTheme = useCallback((t: 'dark' | 'light') => {
    document.documentElement.classList.toggle('dark', t === 'dark')
    localStorage.setItem('gsap-lab-theme', t)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  return { theme: theme as 'dark' | 'light', setTheme, toggleTheme }
}
