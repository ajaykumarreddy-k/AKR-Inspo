import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function StarsBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      const stars = container.querySelectorAll<HTMLDivElement>('.star')
      stars.forEach((star) => {
        gsap.to(star, {
          opacity: 0.2 + Math.random() * 0.3,
          scale: 1.5,
          duration: 1 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 2,
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative flex flex-col items-center justify-center h-64 overflow-hidden bg-[var(--color-bg)]">
      <h2 className="text-xl font-bold text-[var(--color-text)] z-10">Stars Background</h2>
      <p className="text-sm text-[var(--color-text-muted)] z-10">Twinkling stars background</p>
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="star absolute w-1 h-1 rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.3 + Math.random() * 0.7,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
          }}
        />
      ))}
    </div>
  )
}
