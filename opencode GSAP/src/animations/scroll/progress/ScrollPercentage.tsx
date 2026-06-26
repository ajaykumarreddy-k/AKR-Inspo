import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollPercentage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          setProgress(Math.round(self.progress * 100))
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      className="min-h-[200vh] flex flex-col items-center justify-start pt-32 px-4"
      style={{ background: 'var(--color-bg)' }}
    >
      <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
        Scroll Percentage
      </h1>
      <p className="text-lg mb-12" style={{ color: 'var(--color-text-muted)' }}>
        Live 0% to 100% scroll progress display
      </p>

      <div
        className="rounded-2xl p-10 border text-center w-full max-w-sm"
        style={{
          background: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
        }}
      >
        <span className="text-7xl font-bold font-mono tabular-nums" style={{ color: 'var(--color-accent)' }}>
          {progress}%
        </span>
        <div className="mt-6 w-full h-4 rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
          <div
            className="h-full rounded-full transition-all duration-75"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
            }}
          />
        </div>
        <p className="mt-4 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          {progress < 25
            ? 'Just getting started...'
            : progress < 50
              ? 'Halfway there!'
              : progress < 75
                ? 'Almost there!'
                : progress < 100
                  ? 'Finishing up...'
                  : 'Complete!'}
        </p>
      </div>

      <div className="flex flex-col gap-6 w-full max-w-md mt-12">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="rounded-xl p-6 border"
            style={{
              background: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text)',
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{
                  background: progress >= ((i + 1) / 6) * 100 ? 'var(--color-primary)' : 'var(--color-border)',
                  color: progress >= ((i + 1) / 6) * 100 ? '#fff' : 'var(--color-text-muted)',
                }}
              >
                {i + 1}
              </span>
              <div>
                <p className="font-semibold text-sm">Milestone {i + 1}</p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  Step {i + 1} of 6
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-screen" />
    </div>
  )
}
