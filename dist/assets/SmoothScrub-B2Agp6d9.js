const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScrub() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
        x: 600,
        rotation: 360,
        scale: 1.5,
        ease: 'none',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4 bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold mb-4 text-[var(--color-text)]">Smooth Scrub</h2>
      <p className="text-[var(--color-text-muted)] mb-16 text-center max-w-md">
        The animation follows scroll exactly — move down to slide, rotate &amp; scale.
      </p>
      <div className="h-[20vh]" />
      <div
        ref={boxRef}
        className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center shadow-lg"
      >
        <span className="text-white font-bold">Scrub</span>
      </div>
      <div className="h-[40vh]" />
    </div>
  )
}
`;export{e as default};
