const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const ctx = gsap.context(() => {
      gsap.set(cursor, { xPercent: -50, yPercent: -50 })
    })

    const move = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.15, ease: 'power2.out' })
    }

    window.addEventListener('mousemove', move)
    return () => {
      ctx.revert()
      window.removeEventListener('mousemove', move)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4 relative">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Custom Cursor</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Custom cursor following mouse</p>
      <div className="w-48 h-24 rounded-xl bg-[var(--color-surface)] border border-dashed border-[var(--color-border)] flex items-center justify-center text-sm text-[var(--color-text-muted)]">
        Move mouse here
      </div>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 rounded-full bg-[var(--color-primary)] mix-blend-difference pointer-events-none z-50"
      />
    </div>
  )
}
`;export{e as default};
