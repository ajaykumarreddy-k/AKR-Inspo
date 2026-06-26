const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CursorMagnetic() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const areaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const area = areaRef.current
    if (!cursor || !area) return

    const ctx = gsap.context(() => {
      gsap.set(cursor, { xPercent: -50, yPercent: -50 })
    })

    const move = (e: MouseEvent) => {
      const rect = area.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const maxDist = 150
      const strength = Math.max(0, 1 - dist / maxDist)
      gsap.to(cursor, {
        x: e.clientX + dx * strength * 0.5,
        y: e.clientY + dy * strength * 0.5,
        duration: 0.2,
        ease: 'power2.out',
      })
    }

    window.addEventListener('mousemove', move)
    return () => {
      ctx.revert()
      window.removeEventListener('mousemove', move)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4 relative">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Magnetic Cursor</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Magnetic cursor attraction</p>
      <div
        ref={areaRef}
        className="w-48 h-24 rounded-xl bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 border border-[var(--color-border)] flex items-center justify-center text-sm text-[var(--color-text-muted)]"
      >
        Magnetic Zone
      </div>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-5 h-5 rounded-full border-2 border-[var(--color-accent)] bg-transparent pointer-events-none z-50"
      />
    </div>
  )
}
`;export{e as default};
