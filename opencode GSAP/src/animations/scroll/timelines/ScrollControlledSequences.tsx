import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = ['Research', 'Design', 'Prototype', 'Test', 'Launch']

export default function ScrollControlledSequences() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: true
        }
      })

      stepRefs.current.forEach((ref) => {
        if (!ref) return
        tl.fromTo(ref, { opacity: 0.2, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.3 })
          .to(ref, { borderColor: 'var(--color-primary)', duration: 0.2 })
          .to(ref.querySelector('.step-dot'), { backgroundColor: 'var(--color-primary)', scale: 1.4, duration: 0.15 })
      })

      tl.to(lineRef.current, { backgroundColor: 'var(--color-primary)', duration: 0.3 })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[200vh] flex flex-col items-center justify-center px-4 bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold mb-6 text-[var(--color-text)]">Scroll-Controlled Sequences</h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-lg">
        Sequential steps activated one after another as you scroll through the section.
      </p>
      <div className="relative flex flex-col items-center">
        <div ref={lineRef} className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-[var(--color-border)] rounded-full" />
        <div className="space-y-12 relative z-10">
          {STEPS.map((step, i) => (
            <div
              key={step}
              ref={(el) => { stepRefs.current[i] = el }}
              className="relative flex items-center gap-6 p-5 rounded-xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] w-72"
            >
              <div className="step-dot w-5 h-5 rounded-full bg-[var(--color-text-muted)] shrink-0" />
              <div>
                <span className="text-xs font-mono text-[var(--color-text-muted)]">Step {i + 1}</span>
                <p className="text-lg font-bold text-[var(--color-text)]">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
