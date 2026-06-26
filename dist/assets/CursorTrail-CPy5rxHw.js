const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CursorTrail() {
  const trailRef = useRef<HTMLDivElement[]>([])
  const posRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const trails = trailRef.current
    if (!trails.length) return

    const ctx = gsap.context(() => {
      trails.forEach((t, i) => {
        gsap.set(t, { xPercent: -50, yPercent: -50, scale: 1 - i * 0.1, opacity: 1 - i * 0.1 })
      })
    })

    const move = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      trails.forEach((t, i) => {
        gsap.to(t, {
          x: posRef.current.x,
          y: posRef.current.y,
          duration: 0.1 + i * 0.06,
          ease: 'power2.out',
        })
      })
    }

    window.addEventListener('mousemove', move)
    return () => {
      ctx.revert()
      window.removeEventListener('mousemove', move)
    }
  }, [])

  const setTrailRef = (el: HTMLDivElement | null, i: number) => {
    if (el) trailRef.current[i] = el
  }

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4 relative">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Cursor Trail</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Cursor trail effect</p>
      <div className="w-48 h-24 rounded-xl bg-[var(--color-surface)] border border-dashed border-[var(--color-border)] flex items-center justify-center text-sm text-[var(--color-text-muted)]">
        Move mouse here
      </div>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          ref={(el) => setTrailRef(el, i)}
          className="fixed top-0 left-0 w-4 h-4 rounded-full bg-[var(--color-accent)] pointer-events-none z-50"
          style={{ opacity: 1 - i * 0.15 }}
        />
      ))}
    </div>
  )
}
`;export{e as default};
