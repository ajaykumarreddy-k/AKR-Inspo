import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function HeroTextReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const text = textRef.current
    if (!text) return

    const chars = text.textContent?.split('') || []
    text.textContent = ''
    const spans: HTMLSpanElement[] = []
    chars.forEach((char) => {
      const span = document.createElement('span')
      span.textContent = char === ' ' ? '\u00A0' : char
      span.style.display = 'inline-block'
      text.appendChild(span)
      spans.push(span)
    })

    const ctx = gsap.context(() => {
      gsap.from(spans, {
        y: 60,
        opacity: 0,
        rotationX: -90,
        duration: 0.6,
        stagger: 0.03,
        ease: 'back.out(1.7)',
        transformPerspective: 400,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center h-64 gap-4 bg-[var(--color-bg)]">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Hero Text Reveal</h2>
      <h1 ref={textRef} className="text-3xl font-bold text-[var(--color-text)]">Reveal Effect</h1>
    </div>
  )
}
