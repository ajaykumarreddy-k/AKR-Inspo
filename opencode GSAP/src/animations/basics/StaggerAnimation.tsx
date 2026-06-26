import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function StaggerAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stagger-box', {
        y: 60,
        opacity: 0,
        scale: 0.3,
        duration: 0.8,
        ease: 'back.out(1.7)',
        stagger: 0.12,
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.5
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Stagger Animation</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Elements animate one after another</p>
      <div ref={containerRef} className="flex gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="stagger-box w-10 h-10 rounded-md bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg flex items-center justify-center text-white font-bold text-sm"
          >
            {i}
          </div>
        ))}
      </div>
    </div>
  )
}
