import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function TextRevealButton() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const overlayRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(overlayRef.current, { x: '0%' })
    })

    const container = containerRef.current
    if (!container) return () => ctx.revert()

    const enter = () => {
      gsap.to(overlayRef.current, { x: '100%', duration: 0.4, ease: 'power2.inOut' })
    }
    const leave = () => {
      gsap.to(overlayRef.current, { x: '0%', duration: 0.4, ease: 'power2.inOut' })
    }

    container.addEventListener('mouseenter', enter)
    container.addEventListener('mouseleave', leave)
    return () => {
      ctx.revert()
      container.removeEventListener('mouseenter', enter)
      container.removeEventListener('mouseleave', leave)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Text Reveal Button</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Button with text reveal on hover</p>
      <div
        ref={containerRef}
        className="relative px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-semibold cursor-pointer overflow-hidden"
      >
        <span ref={textRef} className="relative z-10">Hover Me</span>
        <span
          ref={overlayRef}
          className="absolute inset-0 bg-[var(--color-accent)] z-0"
        />
      </div>
    </div>
  )
}
