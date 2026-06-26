import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PANELS = [
  { title: 'Welcome', desc: 'Scroll down to begin the journey through our horizontal story.' },
  { title: 'Discovery', desc: 'Uncover insights and data-driven decisions at every turn.' },
  { title: 'Innovation', desc: 'Pushing the boundaries of what is possible with modern tech.' },
  { title: 'Craft', desc: 'Every pixel and function is crafted with intention and care.' },
  { title: 'Impact', desc: 'Real solutions that make a measurable difference.' },
]

export default function StickyHorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.sticky-panel')
      const totalWidth = panels.reduce((acc, p) => acc + p.offsetWidth, 0)
      const gap = 32
      const scrollDistance = totalWidth + gap * (panels.length - 1) - window.innerWidth

      gsap.to(containerRef.current, {
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
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[200vh]"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          ref={containerRef}
          className="flex h-full items-center gap-8 px-8"
          style={{ willChange: 'transform' }}
        >
          {PANELS.map((panel, i) => (
            <div
              key={i}
              className="sticky-panel flex h-80 w-[32rem] flex-shrink-0 flex-col items-center justify-center rounded-3xl border p-12 text-center shadow-2xl"
              style={{
                background: i % 2 === 0 ? 'var(--color-surface)' : 'var(--color-bg)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white"
                style={{ background: 'var(--color-primary)' }}
              >
                {i + 1}
              </div>
              <h3 className="mb-4 text-3xl font-bold" style={{ color: 'var(--color-text)' }}>
                {panel.title}
              </h3>
              <p className="max-w-md leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {panel.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
