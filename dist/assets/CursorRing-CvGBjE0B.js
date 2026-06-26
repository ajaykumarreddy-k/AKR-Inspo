const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CursorRing() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const ctx = gsap.context(() => {
      gsap.set([dot, ring], { xPercent: -50, yPercent: -50 })
    })

    const move = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.3, ease: 'power2.out' })
    }

    window.addEventListener('mousemove', move)
    return () => {
      ctx.revert()
      window.removeEventListener('mousemove', move)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4 relative">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Cursor Ring</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Ring that follows cursor</p>
      <div className="w-48 h-24 rounded-xl bg-[var(--color-surface)] border border-dashed border-[var(--color-border)] flex items-center justify-center text-sm text-[var(--color-text-muted)]">
        Move mouse here
      </div>
      <div ref={dotRef} className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--color-primary)] pointer-events-none z-50" />
      <div ref={ringRef} className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-[var(--color-accent)] pointer-events-none z-50" />
    </div>
  )
}
`;export{e as default};
