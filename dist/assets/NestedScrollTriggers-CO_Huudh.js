const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function NestedScrollTriggers() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(outerRef.current, {
        scrollTrigger: {
          trigger: outerRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1
        },
        scale: 0.8,
        opacity: 0.3,
        duration: 1,
        ease: 'none'
      })

      gsap.from(innerRef.current, {
        scrollTrigger: {
          trigger: innerRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1
        },
        rotation: 360,
        scale: 0.3,
        duration: 1,
        ease: 'none'
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4">
      <h2 className="text-3xl font-bold mb-8 text-[var(--color-text)]">14. Nested Triggers</h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        Inner box has its own ScrollTrigger nested inside an outer scroll-triggered section.
      </p>
      <div className="h-[40vh]" />
      <div
        ref={outerRef}
        className="w-80 h-80 rounded-2xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] flex items-center justify-center shadow-lg"
      >
        <div
          ref={innerRef}
          className="w-40 h-40 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center"
        >
          <span className="text-white font-bold text-center text-sm px-2">Nested</span>
        </div>
      </div>
      <div className="h-[30vh]" />
    </div>
  )
}
`;export{e as default};
