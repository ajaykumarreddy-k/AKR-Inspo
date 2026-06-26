import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function StackCard() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const cards = cardsRef.current
    if (!cards.length) return

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.set(card, { y: i * 4, scale: 1 - i * 0.03, zIndex: cards.length - i })
      })
    })

    const spread = () => {
      cards.forEach((card, i) => {
        gsap.to(card, {
          x: i * 60,
          y: -i * 8,
          rotate: i % 2 === 0 ? 3 : -3,
          duration: 0.4,
          ease: 'power2.out',
          delay: i * 0.05,
        })
      })
    }
    const collapse = () => {
      cards.forEach((card, i) => {
        gsap.to(card, { x: 0, y: i * 4, rotate: 0, duration: 0.3, ease: 'power2.in', delay: i * 0.03 })
      })
    }

    const container = containerRef.current
    if (!container) return () => ctx.revert()

    container.addEventListener('mouseenter', spread)
    container.addEventListener('mouseleave', collapse)
    return () => {
      ctx.revert()
      container.removeEventListener('mouseenter', spread)
      container.removeEventListener('mouseleave', collapse)
    }
  }, [])

  const setCardRef = (el: HTMLDivElement | null, i: number) => {
    if (el) cardsRef.current[i] = el
  }

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Stack Card</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Cards stack, hover to spread</p>
      <div ref={containerRef} className="relative w-48 h-36 flex items-center justify-center">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            ref={(el) => setCardRef(el, i)}
            className="absolute w-40 h-28 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-3 cursor-pointer"
          >
            <div className="w-full h-full rounded-lg bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 flex items-center justify-center">
              <span className="text-[var(--color-text-muted)] font-bold">Card {i + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
