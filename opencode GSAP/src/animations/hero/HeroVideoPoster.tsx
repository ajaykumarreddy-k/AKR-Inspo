import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function HeroVideoPoster() {
  const containerRef = useRef<HTMLDivElement>(null)
  const posterRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(posterRef.current, {
        scale: 1.1,
        filter: 'blur(0px)',
        duration: 2,
        ease: 'power2.out',
      })
      gsap.from(contentRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative flex flex-col items-center justify-center h-64 overflow-hidden bg-[var(--color-bg)]">
      <h2 className="text-xl font-bold text-[var(--color-text)] z-10 mb-2">Hero Poster</h2>
      <div
        ref={posterRef}
        className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/30 via-[var(--color-surface)] to-[var(--color-accent)]/30 blur-sm scale-110"
      />
      <div ref={contentRef} className="relative z-10 text-center">
        <p className="text-lg font-semibold text-[var(--color-text)]">Poster Reveal</p>
        <p className="text-sm text-[var(--color-text-muted)]">With a smooth zoom effect</p>
      </div>
    </div>
  )
}
