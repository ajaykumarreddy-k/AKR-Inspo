import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SECTIONS = [
  { id: 'anchor-hero', label: 'Hero', color: 'var(--color-primary)' },
  { id: 'anchor-features', label: 'Features', color: 'var(--color-accent)' },
  { id: 'anchor-pricing', label: 'Pricing', color: '#e74c3c' },
  { id: 'anchor-faq', label: 'FAQ', color: '#2ecc71' },
  { id: 'anchor-footer', label: 'Footer', color: '#9b59b6' },
]

export default function AnchorNavigation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      SECTIONS.forEach((sec) => {
        const el = document.getElementById(sec.id)
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[200vh] bg-[var(--color-bg)]">
      <div className="sticky top-0 z-20 bg-[var(--color-bg)]/90 backdrop-blur-md border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="text-center pt-6 pb-3">
          <h2 className="text-3xl font-bold text-[var(--color-text)]">
            Anchor Navigation
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Smooth scroll-to-anchor navigation
          </p>
        </div>
        <nav
          ref={navRef}
          className="flex justify-center gap-2 pb-4 flex-wrap"
        >
          {SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className="px-4 py-1.5 rounded-full text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-85"
              style={{ background: sec.color }}
            >
              {sec.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-32 space-y-24 mt-8">
        {SECTIONS.map((sec, i) => (
          <section
            key={sec.id}
            id={sec.id}
            className="min-h-[60vh] rounded-3xl border shadow-2xl flex flex-col items-center justify-center p-12"
            style={{
              background: 'var(--color-surface)',
              borderColor: sec.color,
            }}
          >
            <div
              className="w-16 h-16 rounded-full mb-6"
              style={{ background: sec.color }}
            />
            <h3
              className="text-4xl font-bold mb-3"
              style={{ color: sec.color }}
            >
              {sec.label}
            </h3>
            <p className="text-[var(--color-text-muted)] text-center max-w-lg">
              Section {i + 1}. Click a nav button above to scroll here
              smoothly with <code className="text-[var(--color-primary)]">scrollIntoView</code>.
            </p>
          </section>
        ))}
      </div>
    </div>
  )
}
