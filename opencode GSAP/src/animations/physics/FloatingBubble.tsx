import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function FloatingBubble() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const bubbles = document.querySelectorAll('.float-bubble')
      bubbles.forEach((b, i) => {
        gsap.to(b, {
          y: `random(-30, -80)`,
          x: `random(-20, 20)`,
          scale: `random(0.8, 1.2)`,
          duration: `random(2, 4)`,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.3,
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Floating Bubble</h2>
      <div ref={containerRef} className="relative w-full h-44 overflow-hidden rounded-lg bg-gradient-to-b from-transparent via-[var(--color-surface)]/20 to-[var(--color-surface)]/40">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="float-bubble absolute rounded-full bg-gradient-to-br from-[var(--color-primary)]/30 to-[var(--color-accent)]/20 border border-[var(--color-border)]/30 backdrop-blur-sm"
            style={{
              width: `${20 + i * 8}px`,
              height: `${20 + i * 8}px`,
              bottom: '10%',
              left: `${10 + i * 9}%`,
            }} />
        ))}
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Bubbles floating naturally</p>
    </div>
  )
}
