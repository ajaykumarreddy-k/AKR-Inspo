import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ExplosionEffect() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, delay: 1 })
      tl.to('.explosion-particle', {
        x: `random(-100, 100)`,
        y: `random(-100, 100)`,
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.02,
      })
      tl.to('.explosion-particle', {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: 'back.out(3)',
        stagger: 0.02,
      })
      tl.to('.explosion-center', {
        scale: 1.5,
        opacity: 0.7,
        duration: 0.15,
        ease: 'power2.out',
      }, 0)
      tl.to('.explosion-center', {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.in',
      }, '>-0.1')
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Explosion Effect</h2>
      <div ref={containerRef} className="relative w-full h-44 flex items-center justify-center">
        <div className="explosion-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 shadow-[0_0_30px_rgba(255,100,50,0.6)] z-10" />
        {[...Array(20)].map((_, i) => (
          <div key={i} className="explosion-particle absolute w-2 h-2 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400"
            style={{ transform: `rotate(${i * 18}deg) translateX(15px)` }} />
        ))}
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Particles exploding outward</p>
    </div>
  )
}
