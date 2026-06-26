import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PhysicsCards() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 150 + i * 20, rotationX: 45, opacity: 0, transformPerspective: 1000 },
          {
            y: 0, rotationX: 0, opacity: 1,
            duration: 1.4,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 45%',
              scrub: 1.2,
              toggleActions: 'play none none reverse'
            }
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[150vh] py-24 px-8 flex flex-col items-center bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">Physics Cards</h2>
      <p className="text-[var(--color-text-muted)] mb-16 text-center max-w-md">
        Cards with inertia-like motion that respond to scroll position with scrub.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {[
          { title: 'Inertia', desc: 'Resists motion then glides into place' },
          { title: 'Momentum', desc: 'Builds speed as it enters view' },
          { title: 'Friction', desc: 'Slows down naturally on exit' },
          { title: 'Mass', desc: 'Heavy feel with delayed response' }
        ].map((card, i) => (
          <div
            key={i}
            ref={el => { if (el) cardsRef.current[i] = el }}
            className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-8 shadow-xl flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-2xl mb-4">
              {['⚡', '🔄', '🧊', '⚖️'][i]}
            </div>
            <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">{card.title}</h3>
            <p className="text-[var(--color-text-muted)] text-sm">{card.desc}</p>
          </div>
        ))}
      </div>
      <div className="h-32" />
    </div>
  )
}
