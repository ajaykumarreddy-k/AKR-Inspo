const e=`import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LABELS = ['Intro', 'Features', 'Gallery', 'Pricing', 'FAQ']

export default function ActiveNavIndicator() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      LABELS.forEach((_, i) => {
        const el = panelsRef.current[i]
        if (!el) return

        ScrollTrigger.create({
          trigger: el,
          start: 'top 60%',
          end: 'bottom 60%',
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollToPanel = (i: number) => {
    const el = panelsRef.current[i]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <div
      ref={sectionRef}
      className="min-h-[200vh] relative"
      style={{ background: 'var(--color-bg)' }}
    >
      <nav
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {LABELS.map((label, i) => (
          <button
            key={label}
            onClick={() => scrollToPanel(i)}
            className="flex items-center gap-3 group transition-all duration-300"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <span
              className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {label}
            </span>
            <div
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? 16 : 10,
                height: i === activeIndex ? 16 : 10,
                background:
                  i === activeIndex
                    ? 'var(--color-primary)'
                    : 'var(--color-border)',
                boxShadow:
                  i === activeIndex
                    ? '0 0 12px var(--color-primary)'
                    : 'none',
              }}
            />
          </button>
        ))}
      </nav>

      <div className="flex flex-col items-center pt-24 pb-12 px-4">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
          Active Nav Indicator
        </h1>
        <p className="text-lg mb-12" style={{ color: 'var(--color-text-muted)' }}>
          Navigation dots highlight based on current section
        </p>

        {LABELS.map((label, i) => (
          <div
            key={label}
            ref={(el) => { panelsRef.current[i] = el }}
            className="rounded-2xl p-10 mb-16 w-full max-w-xl border"
            style={{
              background: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
              borderLeft: activeIndex === i ? '4px solid var(--color-primary)' : '4px solid transparent',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                style={{
                  background: activeIndex === i ? 'var(--color-primary)' : 'var(--color-border)',
                  color: activeIndex === i ? '#fff' : 'var(--color-text-muted)',
                }}
              >
                {i + 1}
              </span>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                {label}
              </h2>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              This is the {label} section. Click the navigation dots on the right to jump directly
              to any section. The active dot highlights with the primary color.
            </p>
            <div
              className="mt-6 h-40 rounded-lg flex items-center justify-center border border-dashed"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
            >
              {label} content
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
`;export{e as default};
