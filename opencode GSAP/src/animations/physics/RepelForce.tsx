import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function RepelForce() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const particles = document.querySelectorAll('.repel-particle')
      particles.forEach((p, i) => {
        gsap.to(p, {
          x: `random(-80, 80)`,
          y: `random(-80, 80)`,
          scale: `random(0.5, 1.5)`,
          duration: `random(1.5, 3)`,
          ease: 'back.out(3)',
          repeat: -1,
          yoyo: true,
          delay: i * 0.15,
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Repel Force</h2>
      <div ref={containerRef} className="relative w-full h-44 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-orange-500 shadow-[0_0_30px_rgba(255,50,50,0.5)] flex items-center justify-center text-white text-lg font-bold z-10">
          ✦
        </div>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="repel-particle absolute w-5 h-5 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 opacity-80"
            style={{ transform: `rotate(${i * 45}deg) translateX(50px)` }} />
        ))}
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Particles repelled from center</p>
    </div>
  )
}
