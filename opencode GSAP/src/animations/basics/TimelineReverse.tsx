import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function TimelineReverse() {
  const containerRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      tlRef.current = gsap.timeline({ paused: true })
      tlRef.current.to('.rev-box-1', { x: 120, duration: 0.6, ease: 'power2.out' })
        .to('.rev-box-2', { x: 120, duration: 0.6, ease: 'power2.out' })
        .to('.rev-box-3', { x: 120, duration: 0.6, ease: 'power2.out' })

      tlRef.current.play()
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleReverse = () => {
    tlRef.current?.reversed(!tlRef.current.reversed())
  }

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Timeline Reverse</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Reversing a timeline</p>
      <div ref={containerRef} className="flex flex-col gap-2 w-72 mb-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`rev-box-${i} w-10 h-7 rounded bg-gradient-to-br ${
              i === 1 ? 'from-cyan-500 to-blue-600' :
              i === 2 ? 'from-purple-500 to-pink-600' :
              'from-amber-500 to-orange-600'
            } shadow`}
          />
        ))}
      </div>
      <button
        onClick={handleReverse}
        className="px-4 py-1.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-sm font-medium hover:border-[var(--color-primary)] transition-colors"
      >
        Toggle Reverse
      </button>
    </div>
  )
}
