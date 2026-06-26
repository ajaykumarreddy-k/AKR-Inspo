import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CARD_COLORS = [
  'var(--color-primary)',
  'var(--color-accent)',
  '#e74c3c',
  '#2ecc71',
  '#f39c12',
  '#9b59b6',
  '#1abc9c',
  '#e67e22',
]

export default function CustomScrollContainer() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.custom-scroll-card')
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: i % 2 === 0 ? -80 : 80, scale: 0.8 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              scroller: containerRef.current,
              start: 'top 80%',
              end: 'top 20%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-screen bg-[var(--color-bg)] p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[var(--color-text)]">
          Custom Scroll Container
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          ScrollTrigger targets a custom <code className="text-[var(--color-primary)]">overflow-y: auto</code> container
        </p>
      </div>
      <div
        ref={containerRef}
        className="mx-auto max-w-2xl h-[70vh] overflow-y-auto rounded-2xl border p-4 space-y-4"
        style={{
          background: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div ref={cardsRef} className="space-y-4 pb-8">
          {CARD_COLORS.map((color, i) => (
            <div
              key={i}
              className="custom-scroll-card h-32 rounded-xl border flex items-center justify-between px-8 shadow-md"
              style={{
                background: 'var(--color-bg)',
                borderColor: 'var(--color-border)',
              }}
            >
              <span className="text-lg font-semibold text-[var(--color-text)]">
                Card {i + 1}
              </span>
              <div
                className="w-10 h-10 rounded-full"
                style={{ background: color }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
