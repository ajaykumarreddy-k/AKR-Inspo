import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EVENTS = [
  { year: '2018', title: 'Founded', desc: 'Company established with a vision to transform digital experiences.' },
  { year: '2019', title: 'First Product', desc: 'Launched our flagship product to an eager market.' },
  { year: '2020', title: 'Series A', desc: 'Secured major funding to accelerate growth and hiring.' },
  { year: '2021', title: 'Global Reach', desc: 'Expanded operations to 15 countries worldwide.' },
  { year: '2022', title: 'AI Integration', desc: 'Brought cutting-edge AI capabilities to our platform.' },
  { year: '2023', title: 'Milestone', desc: 'Surpassed one million active users globally.' },
]

export default function TimelineCards() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 10%',
              end: 'bottom 80%',
              scrub: 1,
            },
          }
        )
      }

      cardsRef.current.forEach((card, i) => {
        const direction = i % 2 === 0 ? -1 : 1

        gsap.fromTo(card,
          { x: direction * 80, opacity: 0, scale: 0.9 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 1.3,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[150vh] py-24 px-8 bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-16 text-center">Timeline Cards</h2>
      <div className="relative w-full max-w-4xl mx-auto">
        <div
          ref={lineRef}
          className="absolute left-1/2 top-0 w-0.5 h-full -translate-x-1/2"
          style={{ background: 'var(--color-primary)' }}
        />

        {EVENTS.map((event, i) => (
          <div
            key={i}
            ref={el => { if (el) cardsRef.current[i] = el }}
            className={`relative flex items-center gap-8 mb-12 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
          >
            <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
              <div
                className="inline-block rounded-xl p-6 shadow-lg border"
                style={{
                  background: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <span className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>{event.year}</span>
                <h3 className="text-lg font-bold mt-1" style={{ color: 'var(--color-text)' }}>{event.title}</h3>
                <p className="text-sm mt-1 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{event.desc}</p>
              </div>
            </div>

            <div
              className="w-4 h-4 rounded-full border-2 shrink-0 z-10"
              style={{
                background: 'var(--color-bg)',
                borderColor: 'var(--color-primary)',
              }}
            />

            <div className="flex-1" />
          </div>
        ))}
      </div>
      <div className="h-48" />
    </div>
  )
}
