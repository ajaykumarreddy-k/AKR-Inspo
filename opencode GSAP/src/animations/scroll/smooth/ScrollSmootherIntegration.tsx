import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PANELS = [
  { label: 'Intro', color: 'var(--color-primary)' },
  { label: 'Features', color: 'var(--color-accent)' },
  { label: 'Gallery', color: '#e74c3c' },
  { label: 'Testimonials', color: '#2ecc71' },
  { label: 'Footer', color: '#9b59b6' },
]

export default function ScrollSmootherIntegration() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.smoother-panel')
      const total = panels.reduce((acc, p) => acc + p.offsetHeight, 0)
      const distance = total - window.innerHeight

      gsap.to(viewportRef.current, {
        y: () => -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: () => `+=${distance + window.innerHeight}`,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      })
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="h-screen overflow-hidden bg-[var(--color-bg)]"
    >
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 text-center">
        <h2 className="text-3xl font-bold text-[var(--color-text)]">
          ScrollSmoother Effect
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          GSAP-powered virtual viewport with damped scrolling
        </p>
      </div>
      <div ref={viewportRef} className="will-change-transform">
        {PANELS.map((panel, i) => (
          <div
            key={i}
            className="smoother-panel h-screen flex items-center justify-center"
            style={{ background: i % 2 === 0 ? 'var(--color-surface)' : 'var(--color-bg)' }}
          >
            <div
              className="p-12 rounded-3xl border shadow-2xl text-center"
              style={{
                background: 'var(--color-bg)',
                borderColor: panel.color,
              }}
            >
              <div
                className="w-16 h-16 rounded-full mx-auto mb-6"
                style={{ background: panel.color }}
              />
              <h3
                className="text-4xl font-bold mb-3"
                style={{ color: panel.color }}
              >
                {panel.label}
              </h3>
              <p className="text-[var(--color-text-muted)] max-w-lg">
                Panel {i + 1} — each panel fills the viewport and scrolls into
                place with a smooth, damped feel.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
