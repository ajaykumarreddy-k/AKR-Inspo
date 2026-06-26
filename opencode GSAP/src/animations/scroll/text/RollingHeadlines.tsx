import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function RollingHeadlines() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlinesRef = useRef<HTMLHeadingElement[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      headlinesRef.current.forEach((el, i) => {
        gsap.fromTo(el,
          { y: 120, opacity: 0, rotateX: 90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            ease: 'power4.out',
            delay: i * 0.3,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              end: 'top 25%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const headlines = [
    'Disruption is a myth.',
    'Innovation is a habit.',
    'Design is a conversation.',
    'Motion is a language.'
  ]

  return (
    <section ref={sectionRef} className="min-h-[150vh] py-32 px-8 flex flex-col items-center justify-center bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-24">Rolling Headlines</h2>
      <div className="max-w-4xl space-y-6 overflow-hidden" style={{ perspective: '800px' }}>
        {headlines.map((headline, i) => (
          <h3
            key={i}
            ref={el => { if (el) headlinesRef.current[i] = el }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[var(--color-text)] py-2 border-b border-[var(--color-border)]"
          >
            {headline}
          </h3>
        ))}
      </div>
      <p className="mt-12 text-lg text-[var(--color-text-muted)]">Headlines roll in like a slot machine</p>
      <div className="h-24" />
    </section>
  )
}
