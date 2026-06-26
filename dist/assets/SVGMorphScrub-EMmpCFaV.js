const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin)

const shapes = [
  'M 50 0 L 100 50 L 50 100 L 0 50 Z',
  'M 50 0 C 80 20 100 50 80 80 C 60 110 30 110 10 80 C -10 50 10 20 50 0 Z',
  'M 50 5 L 95 35 L 80 90 L 20 90 L 5 35 Z',
  'M 50 0 Q 100 0 100 50 Q 100 100 50 100 Q 0 100 0 50 Q 0 0 50 0 Z',
]

export default function SVGMorphScrub() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const shapeRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(shapeRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
        morphSVG: shapes[shapes.length - 1],
        ease: 'none',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4 bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold mb-4 text-[var(--color-text)]">SVG Morph Scrub</h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        An SVG path that morphs between different shapes as you scroll.
      </p>
      <div className="h-[15vh]" />
      <svg viewBox="0 0 100 100" className="w-64 h-64" xmlns="http://www.w3.org/2000/svg">
        <path
          ref={shapeRef}
          d={shapes[0]}
          fill="var(--color-primary)"
          opacity="0.8"
        />
      </svg>
      <div className="h-[40vh]" />
    </div>
  )
}
`;export{e as default};
