import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  { gradient: 'from-[var(--color-primary)] to-blue-900', title: 'Strategy', desc: 'Planning the roadmap' },
  { gradient: 'from-[var(--color-accent)] to-purple-900', title: 'Design', desc: 'Crafting the experience' },
  { gradient: 'from-emerald-500 to-teal-900', title: 'Develop', desc: 'Building the product' },
  { gradient: 'from-amber-500 to-orange-900', title: 'Test', desc: 'Ensuring quality' },
  { gradient: 'from-rose-500 to-pink-900', title: 'Deploy', desc: 'Shipping to users' },
]

export default function StackingCards() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current
      const offsets = [0, 10, 20, 30, 40]
      const yOffsets = [0, -15, -30, -45, -60]

      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { x: 0, y: 0, scale: 1, rotation: 0, opacity: i === 0 ? 1 : 0.6 },
          {
            x: offsets[i],
            y: yOffsets[i],
            scale: 1,
            rotation: i * 2,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${i * 100}`,
              end: `top+=${i * 100 + 200}`,
              scrub: 1,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[150vh] py-24 px-8 flex flex-col items-center bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-16">Stacking Cards</h2>
      <div ref={containerRef} className="relative w-full max-w-lg h-[400px] flex items-center justify-center">
        {CARDS.map((card, i) => (
          <div
            key={i}
            ref={el => { if (el) cardsRef.current[i] = el }}
            className={`absolute top-0 left-0 w-full h-56 rounded-2xl bg-gradient-to-br p-6 flex flex-col justify-end shadow-xl border border-white/10 ${card.gradient}`}
          >
            <h3 className="text-xl font-bold text-white mb-1">{card.title}</h3>
            <p className="text-white/80">{card.desc}</p>
          </div>
        ))}
      </div>
      <div className="h-48" />
    </div>
  )
}
