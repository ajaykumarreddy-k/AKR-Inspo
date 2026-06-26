import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      const particles = container.querySelectorAll<HTMLDivElement>('.particle')
      particles.forEach((p) => {
        gsap.to(p, {
          y: -(100 + Math.random() * 200),
          x: -50 + Math.random() * 100,
          opacity: 0,
          duration: 2 + Math.random() * 3,
          repeat: -1,
          ease: 'linear',
          delay: Math.random() * 2,
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative flex flex-col items-center justify-center h-64 overflow-hidden bg-[var(--color-bg)]">
      <h2 className="text-xl font-bold text-[var(--color-text)] z-10">Particle Background</h2>
      <p className="text-sm text-[var(--color-text-muted)] z-10">Floating particles background</p>
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="particle absolute w-1 h-1 rounded-full bg-[var(--color-accent)]"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: '0%',
            opacity: 0.6 + Math.random() * 0.4,
          }}
        />
      ))}
    </div>
  )
}
