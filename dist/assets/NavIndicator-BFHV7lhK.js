const t=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function NavIndicator() {
  const navRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef(0)

  useEffect(() => {
    const nav = navRef.current
    const indicator = indicatorRef.current
    if (!nav || !indicator) return

    const ctx = gsap.context(() => {
      gsap.set(indicator, { x: 0, width: 60 })
    })

    const items = nav.querySelectorAll<HTMLButtonElement>('.nav-item')
    items.forEach((item, i) => {
      item.addEventListener('click', () => {
        const rect = item.getBoundingClientRect()
        const navRect = nav.getBoundingClientRect()
        gsap.to(indicator, {
          x: rect.left - navRect.left,
          width: rect.width,
          duration: 0.4,
          ease: 'power2.out',
        })
        activeRef.current = i
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Nav Indicator</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Active nav indicator animation</p>
      <div ref={navRef} className="relative flex gap-1 p-1 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
        <div ref={indicatorRef} className="absolute bottom-1 top-1 rounded-lg bg-[var(--color-primary)]" />
        {['Home', 'About', 'Work'].map((item) => (
          <button
            key={item}
            className="nav-item relative px-4 py-2 text-sm font-medium text-[var(--color-text)] cursor-pointer z-10"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}
`;export{t as default};
