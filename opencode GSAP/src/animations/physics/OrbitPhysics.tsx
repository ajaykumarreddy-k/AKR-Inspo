import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function OrbitPhysics() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const orbits = document.querySelectorAll('.orbit-satellite')
      orbits.forEach((sat, i) => {
        const radius = 50 + i * 25
        const duration = 2 + i * 0.5
        gsap.set(sat, { transformOrigin: `${-radius}px center` })
        gsap.to(sat, {
          rotation: 360,
          duration,
          ease: 'none',
          repeat: -1,
        })
      })
      gsap.to('.orbit-center', {
        scale: 1.15,
        duration: 1.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Orbit Physics</h2>
      <div ref={containerRef} className="relative w-full h-44 flex items-center justify-center">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="absolute w-full h-full flex items-center justify-center">
            <div className="w-[80px] h-[80px] rounded-full border border-[var(--color-border)] opacity-20 absolute"
              style={{ width: `${100 + i * 50}px`, height: `${100 + i * 50}px` }} />
          </div>
        ))}
        <div className="orbit-center w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-[0_0_30px_rgba(255,200,50,0.5)] z-10" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="orbit-satellite absolute w-5 h-5 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-[0_0_10px_rgba(34,211,238,0.4)]"
            style={{ transform: `translateX(${50 + i * 25}px)` }} />
        ))}
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Orbital motion around center</p>
    </div>
  )
}
