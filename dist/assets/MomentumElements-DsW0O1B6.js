const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function MomentumElements() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el, i) => {
        const direction = i % 2 === 0 ? 1 : -1

        gsap.fromTo(el,
          { x: -100 * direction, opacity: 0 },
          {
            x: 0, opacity: 1,
            duration: 1.6,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'top 25%',
              scrub: 2.5
            }
          }
        )

        gsap.to(el, {
          x: 80 * direction,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[150vh] py-24 px-8 flex flex-col items-center bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">Momentum Elements</h2>
      <p className="text-[var(--color-text-muted)] mb-16 text-center max-w-md">
        Elements continue drifting after scroll stops — a true momentum feel.
      </p>
      <div className="flex flex-col gap-12 w-full max-w-3xl">
        {['Momentum One', 'Momentum Two', 'Momentum Three', 'Momentum Four'].map((label, i) => (
          <div
            key={i}
            ref={el => { if (el) itemsRef.current[i] = el }}
            className="h-32 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] text-lg shadow-lg"
          >
            {label}
          </div>
        ))}
      </div>
      <div className="h-32" />
    </div>
  )
}
`;export{e as default};
