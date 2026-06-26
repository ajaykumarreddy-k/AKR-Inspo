const e=`import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SECTIONS = [
  { name: 'Introduction', color: 'var(--color-primary)' },
  { name: 'Getting Started', color: 'var(--color-accent)' },
  { name: 'Core Concepts', color: 'var(--color-primary)' },
  { name: 'Advanced Topics', color: 'var(--color-accent)' },
  { name: 'Conclusion', color: 'var(--color-primary)' },
]

export default function SectionProgress() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([])
  const [currentSection, setCurrentSection] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      SECTIONS.forEach((_, i) => {
        const el = sectionsRef.current[i]
        if (!el) return

        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setCurrentSection(i),
          onEnterBack: () => setCurrentSection(i),
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      className="min-h-[200vh] relative"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="sticky top-8 z-40 flex justify-center px-4">
        <div
          className="rounded-xl p-4 border shadow-lg backdrop-blur-md w-full max-w-lg"
          style={{
            background: 'color-mix(in srgb, var(--color-surface) 90%, transparent)',
            borderColor: 'var(--color-border)',
          }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-center" style={{ color: 'var(--color-text-muted)' }}>
            Current Section
          </p>
          <div className="flex items-center justify-between gap-2">
            {SECTIONS.map((s, i) => (
              <div key={s.name} className="flex flex-col items-center flex-1">
                <div
                  className="w-full h-1.5 rounded-full mb-2 transition-all duration-300"
                  style={{
                    background:
                      i === currentSection
                        ? s.color
                        : i < currentSection
                          ? s.color
                          : 'var(--color-border)',
                    opacity: i <= currentSection ? 1 : 0.3,
                  }}
                />
                <span
                  className="text-xs text-center leading-tight transition-all duration-300"
                  style={{
                    color:
                      i === currentSection
                        ? 'var(--color-text)'
                        : 'var(--color-text-muted)',
                    fontWeight: i === currentSection ? 700 : 400,
                  }}
                >
                  {s.name}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-center">
            <span className="text-sm font-mono" style={{ color: 'var(--color-accent)' }}>
              {currentSection + 1} / {SECTIONS.length}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center pt-48 pb-12 px-4">
        {SECTIONS.map((s, i) => (
          <div
            key={s.name}
            ref={(el) => { sectionsRef.current[i] = el }}
            className="rounded-2xl p-8 mb-16 w-full max-w-lg border"
            style={{
              background: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
            }}
          >
            <h2 className="text-2xl font-bold mb-3" style={{ color: s.color }}>
              {s.name}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              This is section {i + 1} of {SECTIONS.length}. Scroll through each section to see the
              progress indicator update. The top bar highlights your current position in the content.
            </p>
            <div className="mt-6 h-32 rounded-lg flex items-center justify-center border border-dashed" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
              Content area for {s.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
`;export{e as default};
