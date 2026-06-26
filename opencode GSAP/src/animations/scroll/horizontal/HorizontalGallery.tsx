import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const COLORS = [
  'var(--color-primary)',
  'var(--color-accent)',
  '#e74c3c',
  '#2ecc71',
  '#f39c12',
  '#9b59b6',
]

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.gallery-panel')
      const totalWidth = panels.reduce((acc, p) => acc + p.offsetWidth, 0)
      const gap = 32
      const totalScroll = totalWidth + gap * (panels.length - 1) - window.innerWidth

      gsap.to(containerRef.current, {
        x: () => -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalScroll + window.innerHeight}`,
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
        <h2
          className="absolute left-8 top-8 z-10 text-4xl font-bold"
          style={{ color: 'var(--color-text)' }}
        >
          Horizontal Gallery
        </h2>
        <div
          ref={containerRef}
          className="flex h-full items-center gap-8 px-8"
          style={{ willChange: 'transform' }}
        >
          {COLORS.map((color, i) => (
            <div
              key={i}
              className="gallery-panel flex h-96 w-[28rem] flex-shrink-0 items-center justify-center rounded-3xl text-3xl font-bold text-white shadow-2xl"
              style={{ background: `linear-gradient(135deg, ${color}, ${color}88)` }}
            >
              Panel {i + 1}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
