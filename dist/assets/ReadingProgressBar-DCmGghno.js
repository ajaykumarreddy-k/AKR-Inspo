const e=`import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ReadingProgressBar() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const pct = Math.round(self.progress * 100)
          setProgress(pct)
          if (barRef.current) {
            barRef.current.style.width = \`\${pct}%\`
          }
        },
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
      <div className="sticky top-0 z-50 w-full h-1" style={{ background: 'var(--color-border)' }}>
        <div
          ref={barRef}
          className="h-full transition-all duration-75"
          style={{
            width: '0%',
            background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
          }}
        />
      </div>

      <div className="flex flex-col items-center justify-start pt-32 px-4">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
          Reading Progress Bar
        </h1>
        <p className="text-lg mb-8" style={{ color: 'var(--color-text-muted)' }}>
          Scroll down to see the progress bar fill at the top
        </p>

        <div
          className="rounded-2xl p-8 mb-12 text-center w-full max-w-md border"
          style={{
            background: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text)',
          }}
        >
          <span className="text-6xl font-bold font-mono" style={{ color: 'var(--color-accent)' }}>
            {progress}%
          </span>
          <p className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            page scrolled
          </p>
        </div>

        <div className="flex flex-col gap-6 w-full max-w-md">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className="rounded-xl p-6 border"
              style={{
                background: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)',
              }}
            >
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>
                Section {i + 1}
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                Scrollable content block {i + 1}. Keep scrolling to watch the progress bar advance
                from 0% to 100%.
              </p>
            </div>
          ))}
        </div>

        <div className="h-screen" />
      </div>
    </div>
  )
}
`;export{e as default};
