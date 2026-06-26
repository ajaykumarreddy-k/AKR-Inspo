import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function HeroSplitReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, { x: '-100%', duration: 0.8, ease: 'power3.out' })
      gsap.from(rightRef.current, { x: '100%', duration: 0.8, ease: 'power3.out' })
      gsap.from(contentRef.current, { opacity: 0, scale: 0.8, duration: 0.5, ease: 'power2.out', delay: 0.6 })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative flex flex-col items-center justify-center h-64 overflow-hidden bg-[var(--color-bg)]">
      <h2 className="text-xl font-bold text-[var(--color-text)] z-10 mb-2">Hero Split Reveal</h2>
      <div ref={leftRef} className="absolute inset-y-0 left-0 w-1/2 bg-[var(--color-primary)]/20" />
      <div ref={rightRef} className="absolute inset-y-0 right-0 w-1/2 bg-[var(--color-accent)]/20" />
      <div ref={contentRef} className="relative z-10 text-center">
        <p className="text-sm text-[var(--color-text-muted)]">Split screen reveal</p>
      </div>
    </div>
  )
}
