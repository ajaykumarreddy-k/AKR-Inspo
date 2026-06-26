const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SECTIONS = [
  { title: 'Welcome', color: 'var(--color-primary)' },
  { title: 'About', color: 'var(--color-accent)' },
  { title: 'Services', color: '#e74c3c' },
  { title: 'Portfolio', color: '#2ecc71' },
  { title: 'Contact', color: '#f39c12' },
]

export default function LenisIntegration() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: () => -(contentRef.current!.offsetHeight - window.innerHeight),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      })
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-[var(--color-bg)]"
    >
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 text-center">
        <h2 className="text-3xl font-bold text-[var(--color-text)]">Lenis-Style Smooth Scroll</h2>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          Simulated smooth vertical scroll with GSAP scrub
        </p>
      </div>
      <div ref={contentRef} className="will-change-transform">
        {SECTIONS.map((section, i) => (
          <div
            key={i}
            className="h-screen flex items-center justify-center"
            style={{ background: i % 2 === 0 ? 'var(--color-surface)' : 'var(--color-bg)' }}
          >
            <div
              className="p-12 rounded-3xl border shadow-2xl text-center"
              style={{
                background: 'var(--color-bg)',
                borderColor: section.color,
              }}
            >
              <h3
                className="text-5xl font-bold mb-4"
                style={{ color: section.color }}
              >
                {section.title}
              </h3>
              <p className="text-[var(--color-text-muted)] max-w-md">
                Section {i + 1} — scroll scrubs the entire viewport smoothly.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
`;export{e as default};
