import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PANELS = [
  { title: 'Intro', bg: 'var(--color-primary)' },
  { title: 'Features', bg: 'var(--color-accent)' },
  { title: 'Pricing', bg: '#e74c3c' },
  { title: 'Testimonials', bg: '#2ecc71' },
  { title: 'Contact', bg: '#9b59b6' },
]

export default function MixedVerticalHorizontal() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const verticalRef = useRef<HTMLDivElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.mixed-panel')
      const totalWidth = panels.reduce((acc, p) => acc + p.offsetWidth, 0)
      const gap = 32
      const scrollDistance = totalWidth + gap * (panels.length - 1) - window.innerWidth

      gsap.to(containerRef.current, {
        x: () => -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: horizontalRef.current,
          start: 'top top',
          end: () => `+=${scrollDistance + window.innerHeight}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      gsap.from(verticalRef.current?.querySelectorAll('.vert-section'), {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: verticalRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div>
      <section
        ref={verticalRef}
        className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-24"
        style={{ background: 'var(--color-bg)' }}
      >
        <h2 className="text-4xl font-bold" style={{ color: 'var(--color-text)' }}>
          Vertical Sections
        </h2>
        {['About Us', 'Our Mission', 'The Team'].map((title, i) => (
          <div
            key={i}
            className="vert-section flex h-48 w-full max-w-2xl items-center justify-center rounded-2xl border text-xl font-bold shadow-lg"
            style={{
              background: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text)',
            }}
          >
            {title}
          </div>
        ))}
      </section>

      <section
        ref={sectionRef}
        className="relative min-h-[200vh]"
        style={{ background: 'var(--color-bg)' }}
      >
        <div ref={horizontalRef} className="sticky top-0 h-screen overflow-hidden">
          <h2
            className="absolute left-8 top-8 z-10 text-4xl font-bold"
            style={{ color: 'var(--color-text)' }}
          >
            Horizontal Section
          </h2>
          <div
            ref={containerRef}
            className="flex h-full items-center gap-8 px-8"
            style={{ willChange: 'transform' }}
          >
            {PANELS.map((panel, i) => (
              <div
                key={i}
                className="mixed-panel flex h-72 w-96 flex-shrink-0 items-center justify-center rounded-3xl text-3xl font-bold text-white shadow-2xl"
                style={{ background: panel.bg }}
              >
                {panel.title}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="flex min-h-screen flex-col items-center justify-center gap-8 px-4"
        style={{ background: 'var(--color-bg)' }}
      >
        <h2 className="text-4xl font-bold" style={{ color: 'var(--color-text)' }}>
          Footer Section
        </h2>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Scroll back up to experience the horizontal section again.
        </p>
      </section>
    </div>
  )
}
