import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = Array.from({ length: 12 }, (_, i) => `Item ${i + 1}`)

export default function BatchAnimations() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll('.batch-card')
      if (!cards) return

      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 40%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          y: 60,
          scale: 0.8,
          duration: 0.5,
          delay: i * 0.05,
          ease: 'power2.out'
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4">
      <h2 className="text-3xl font-bold mb-8 text-[var(--color-text)]">10. Batch Animations</h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        Multiple elements animated with individual ScrollTriggers in a staggered batch.
      </p>
      <div className="h-[40vh]" />
      <div
        ref={containerRef}
        className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-lg"
      >
        {ITEMS.map((item) => (
          <div
            key={item}
            className="batch-card h-24 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center shadow-md"
          >
            <span className="text-white font-bold text-sm">{item}</span>
          </div>
        ))}
      </div>
      <div className="h-[30vh]" />
    </div>
  )
}
