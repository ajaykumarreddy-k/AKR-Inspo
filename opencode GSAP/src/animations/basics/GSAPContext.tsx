import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function GSAPContext() {
  const containerRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.ctx-box', {
        y: -30,
        rotation: 180,
        scale: 1.3,
        duration: 1.2,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.15
      })
      if (statusRef.current) statusRef.current.textContent = 'Scoped to container ✓'
    }, containerRef)

    return () => {
      ctx.revert()
      if (statusRef.current) statusRef.current.textContent = 'Cleaned up'
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">gsap.context()</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Scoped animations with easy cleanup</p>
      <div ref={containerRef} className="flex gap-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="ctx-box w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg flex items-center justify-center text-white font-bold"
          >
            {i}
          </div>
        ))}
      </div>
      <span ref={statusRef} className="text-xs text-[var(--color-text-muted)]">Initializing...</span>
    </div>
  )
}
