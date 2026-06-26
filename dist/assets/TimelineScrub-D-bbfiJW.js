const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function TimelineScrub() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const box1Ref = useRef<HTMLDivElement>(null)
  const box2Ref = useRef<HTMLDivElement>(null)
  const box3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
        defaults: { ease: 'none' },
      })

      tl.to(box1Ref.current, { x: 500, rotation: 360, scale: 1.3 })
        .to(box2Ref.current, { x: 500, rotation: -360, scale: 1.3 })
        .to(box3Ref.current, { x: 500, rotation: 180, scale: 1.3 })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4 bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold mb-4 text-[var(--color-text)]">Timeline Scrub</h2>
      <p className="text-[var(--color-text-muted)] mb-8 text-center max-w-md">
        A full timeline scrubbed by scroll — each box animates in sequence.
      </p>
      <div className="flex flex-col gap-6 w-full max-w-[600px]">
        <div ref={box1Ref} className="h-20 rounded-xl bg-[var(--color-primary)] flex items-center justify-center text-white font-bold shadow-lg">
          Step 1
        </div>
        <div ref={box2Ref} className="h-20 rounded-xl bg-[var(--color-accent)] flex items-center justify-center text-white font-bold shadow-lg">
          Step 2
        </div>
        <div ref={box3Ref} className="h-20 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text)] font-bold shadow-lg">
          Step 3
        </div>
      </div>
      <div className="h-[40vh]" />
    </div>
  )
}
`;export{e as default};
