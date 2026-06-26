import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EVENTS = [
  { year: '2018', label: 'Founded' },
  { year: '2019', label: 'MVP Launch' },
  { year: '2020', label: 'Series A' },
  { year: '2021', label: '1M Users' },
  { year: '2022', label: 'Global Expansion' },
  { year: '2023', label: 'Series B' },
  { year: '2024', label: 'AI Platform' },
  { year: '2025', label: 'IPO' },
]

export default function HorizontalTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const dots = gsap.utils.toArray<HTMLElement>('.tl-dot')
      const totalWidth = trackRef.current?.scrollWidth ?? 0
      const scrollDistance = totalWidth - window.innerWidth

      gsap.to(trackRef.current, {
        x: () => -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${scrollDistance + window.innerHeight}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      dots.forEach((dot, i) => {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: dot,
              containerAnimation: ScrollTrigger.getById('tl-scroll')!,
              start: 'left 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[200vh]"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-8">
        <h2
          className="mb-16 text-4xl font-bold"
          style={{ color: 'var(--color-text)' }}
        >
          Timeline
        </h2>
        <div
          ref={trackRef}
          className="flex items-center gap-0"
          style={{ willChange: 'transform' }}
        >
          {EVENTS.map((evt, i) => (
            <div key={i} className="flex flex-shrink-0 flex-col items-center px-8">
              <div className="tl-dot mb-4 h-5 w-5 rounded-full" style={{ background: 'var(--color-primary)' }} />
              <div
                className="flex h-40 w-48 flex-col items-center justify-center rounded-xl border p-4 text-center"
                style={{
                  background: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <span className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>
                  {evt.year}
                </span>
                <span className="mt-1 text-sm" style={{ color: 'var(--color-text)' }}>
                  {evt.label}
                </span>
              </div>
              {i < EVENTS.length - 1 && (
                <div className="mt-6 h-1 w-16" style={{ background: 'var(--color-border)' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
