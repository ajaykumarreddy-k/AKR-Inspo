import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function FloatingGeometric() {
  const containerRef = useRef<HTMLDivElement>(null)
  const shapesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const shapes = shapesRef.current
    if (!shapes.length) return

    const ctx = gsap.context(() => {
      shapes.forEach((shape, i) => {
        gsap.to(shape, {
          y: -20 + Math.random() * 40,
          x: -15 + Math.random() * 30,
          rotation: -10 + Math.random() * 20,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.3,
        })
      })
    })

    return () => ctx.revert()
  }, [])

  const setShapeRef = (el: HTMLDivElement | null, i: number) => {
    if (el) shapesRef.current[i] = el
  }

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center h-64 gap-4 relative overflow-hidden">
      <h2 className="text-xl font-bold text-[var(--color-text)] z-10">Floating Geometric</h2>
      <p className="text-sm text-[var(--color-text-muted)] z-10">Floating geometric shapes</p>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          ref={(el) => setShapeRef(el, i)}
          className="absolute"
          style={{
            width: `${20 + i * 8}px`,
            height: `${20 + i * 8}px`,
            top: `${20 + Math.random() * 40}%`,
            left: `${15 + i * 14}%`,
            borderRadius: i % 2 === 0 ? '50%' : '4px',
            background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))`,
            opacity: 0.3 + i * 0.1,
          }}
        />
      ))}
    </div>
  )
}
