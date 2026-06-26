const e=`import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SECTIONS = [
  { title: 'Section A', detail: 'Last saved position: top' },
  { title: 'Section B', detail: 'Middle content area' },
  { title: 'Section C', detail: 'Bottom landmark' },
]

export default function ScrollRestoration() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const savedRef = useRef<number>(0)
  const indicatorRef = useRef<HTMLDivElement>(null)

  const saveScroll = useCallback(() => {
    savedRef.current = window.scrollY
    if (indicatorRef.current) {
      indicatorRef.current.textContent = \`Saved: \${Math.round(savedRef.current)}px\`
    }
  }, [])

  const restoreScroll = useCallback(() => {
    window.scrollTo({ top: savedRef.current, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      SECTIONS.forEach((_, i) => {
        const el = document.getElementById(\`restore-section-\${i}\`)
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
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
    <div
      ref={sectionRef}
      className="min-h-[200vh] bg-[var(--color-bg)] relative"
    >
      <div className="sticky top-0 pt-8 pb-4 bg-[var(--color-bg)] z-10">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-[var(--color-text)]">
            Scroll Restoration
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Save and restore scroll position manually
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={saveScroll}
            className="px-5 py-2 rounded-full font-semibold text-white shadow-lg transition-opacity hover:opacity-90"
            style={{ background: 'var(--color-primary)' }}
          >
            Save Position
          </button>
          <button
            onClick={restoreScroll}
            className="px-5 py-2 rounded-full font-semibold text-white shadow-lg transition-opacity hover:opacity-90"
            style={{ background: 'var(--color-accent)' }}
          >
            Restore Position
          </button>
        </div>
        <div
          ref={indicatorRef}
          className="text-center mt-2 text-sm text-[var(--color-text-muted)]"
        >
          Not saved yet
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-16 px-6 pb-32 mt-16">
        {SECTIONS.map((sec, i) => (
          <div
            key={i}
            id={\`restore-section-\${i}\`}
            className="min-h-[40vh] rounded-3xl border p-10 shadow-xl flex flex-col items-center justify-center"
            style={{
              background: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
            }}
          >
            <h3
              className="text-3xl font-bold mb-3"
              style={{ color: 'var(--color-text)' }}
            >
              {sec.title}
            </h3>
            <p className="text-[var(--color-text-muted)]">{sec.detail}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
`;export{e as default};
