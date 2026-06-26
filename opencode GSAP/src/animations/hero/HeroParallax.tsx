import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function HeroParallax() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const midRef = useRef<HTMLDivElement>(null)
  const frontRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {})

    const move = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      gsap.to(bgRef.current, { x: x * 20, y: y * 20, duration: 0.6, ease: 'power2.out' })
      gsap.to(midRef.current, { x: x * 40, y: y * 40, duration: 0.6, ease: 'power2.out' })
      gsap.to(frontRef.current, { x: x * 60, y: y * 60, duration: 0.6, ease: 'power2.out' })
    }

    container.addEventListener('mousemove', move)
    return () => {
      ctx.revert()
      container.removeEventListener('mousemove', move)
    }
  }, [])

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center h-64 gap-4 relative overflow-hidden bg-[var(--color-bg)]">
      <h2 className="text-xl font-bold text-[var(--color-text)] z-10">Hero Parallax</h2>
      <div ref={bgRef} className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/20 to-transparent" />
      <div ref={midRef} className="absolute w-32 h-32 rounded-full border border-[var(--color-border)] top-8 left-8" />
      <div ref={frontRef} className="absolute w-20 h-20 rounded-lg bg-[var(--color-accent)]/20 bottom-12 right-12" />
      <p className="text-sm text-[var(--color-text-muted)] z-10">Move mouse for parallax</p>
    </div>
  )
}
