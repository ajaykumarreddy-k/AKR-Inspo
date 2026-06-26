import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function NestedTimelines() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const outerRef = useRef<HTMLDivElement>(null)
  const inner1Ref = useRef<HTMLDivElement>(null)
  const inner2Ref = useRef<HTMLDivElement>(null)
  const inner3Ref = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const innerTL1 = gsap.timeline()
      innerTL1.fromTo(inner1Ref.current, { scale: 0, rotation: -180 }, { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(2)' })
        .to(inner1Ref.current, { borderColor: 'var(--color-accent)', borderWidth: 4, duration: 0.3 })

      const innerTL2 = gsap.timeline()
      innerTL2.fromTo(inner2Ref.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 })
        .to(inner2Ref.current, { backgroundColor: 'var(--color-accent)', duration: 0.3 })

      const innerTL3 = gsap.timeline()
      innerTL3.fromTo(inner3Ref.current, { scaleX: 0 }, { scaleX: 1, duration: 0.4, transformOrigin: 'left center' })
        .to(inner3Ref.current, { backgroundColor: '#22c55e', duration: 0.3 })

      const outerTL = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          pin: true
        }
      })

      outerTL.add(innerTL1)
        .add(innerTL2, '-=0.2')
        .add(innerTL3, '-=0.2')
        .to(progressRef.current, { scaleX: 1, transformOrigin: 'left center', duration: 0.3 }, '-=0.3')
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[200vh] flex flex-col items-center justify-center px-4 bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold mb-6 text-[var(--color-text)]">Nested Timelines</h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-lg">
        Timelines within timelines — each inner sequence runs as part of a parent timeline driven by scroll.
      </p>
      <div ref={outerRef} className="w-full max-w-md space-y-6">
        <div ref={inner1Ref} className="p-6 rounded-xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] text-[var(--color-text)] font-semibold text-center">
          Outer Timeline — Step 1
        </div>
        <div ref={inner2Ref} className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] font-semibold text-center">
          Inner Timeline — Step 2
        </div>
        <div ref={inner3Ref} className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] font-semibold text-center">
          Inner Timeline — Step 3
        </div>
        <div className="h-3 rounded-full bg-[var(--color-border)] overflow-hidden">
          <div ref={progressRef} className="h-full w-full rounded-full bg-[var(--color-primary)] origin-left scale-x-0" />
        </div>
        <p className="text-sm text-[var(--color-text-muted)] text-center">Overall Progress</p>
      </div>
    </div>
  )
}
