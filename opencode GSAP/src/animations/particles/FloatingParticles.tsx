import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      const particles = container.querySelectorAll<HTMLDivElement>('.fp-particle')
      particles.forEach((p) => {
        gsap.to(p, {
          y: -40 + Math.random() * 80,
          x: -30 + Math.random() * 60,
          rotation: Math.random() * 360,
          duration: 3 + Math.random() * 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 3,
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative flex flex-col items-center justify-center h-64 overflow-hidden bg-[var(--color-bg)]">
      <h2 className="text-xl font-bold text-[var(--color-text)] z-10">Floating Particles</h2>
      <p className="text-sm text-[var(--color-text-muted)] z-10">Floating particle system</p>
      {Array.from({ length: 25 }).map((_, i) => (
        <div
          key={i}
          className="fp-particle absolute rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]"
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.3 + Math.random() * 0.5,
          }}
        />
      ))}
    </div>
  )
}
