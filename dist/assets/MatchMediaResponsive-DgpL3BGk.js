const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function MatchMediaResponsive() {
  const boxRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        gsap.from(boxRef.current, {
          scrollTrigger: {
            trigger: boxRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1
          },
          x: 300,
          rotation: 360,
          duration: 1,
          ease: 'none'
        })
        if (labelRef.current) labelRef.current.textContent = 'Desktop: moves right & rotates'
      })

      mm.add('(max-width: 767px)', () => {
        gsap.from(boxRef.current, {
          scrollTrigger: {
            trigger: boxRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1
          },
          y: 150,
          scale: 0.5,
          duration: 1,
          ease: 'none'
        })
        if (labelRef.current) labelRef.current.textContent = 'Mobile: moves down & shrinks'
      })

      return () => mm.kill()
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4">
      <h2 className="text-3xl font-bold mb-8 text-[var(--color-text)]">8. MatchMedia Responsive</h2>
      <p ref={labelRef} className="text-[var(--color-text-muted)] mb-4 text-center max-w-md">
        Resize to see behavior change
      </p>
      <div className="h-[40vh]" />
      <div
        ref={boxRef}
        className="w-48 h-48 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center shadow-lg"
      >
        <span className="text-white font-bold text-center text-sm px-4">Responsive</span>
      </div>
      <div className="h-[30vh]" />
    </div>
  )
}
`;export{e as default};
