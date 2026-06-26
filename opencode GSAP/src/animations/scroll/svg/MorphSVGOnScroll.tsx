import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function MorphSVGOnScroll() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const shapeRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !shapeRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(shapeRef.current, {
        attr: {
          d: 'M300 100 Q450 100 450 250 Q450 400 300 400 Q150 400 150 250 Q150 100 300 100Z',
        },
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'center center',
          scrub: 1.5,
        },
      })
      gsap.to(shapeRef.current, {
        attr: {
          d: 'M300 150 L450 150 L450 350 L300 350 L150 350 L150 150Z',
        },
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center center',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      className="min-h-[150vh] py-24 px-8 flex flex-col items-center justify-center bg-[var(--color-bg)]"
    >
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-16">
        Morph SVG On Scroll
      </h2>
      <svg
        viewBox="0 0 600 500"
        className="w-full max-w-lg h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={shapeRef}
          d="M300 50 C473 50 550 150 550 250 C550 350 473 450 300 450 C127 450 50 350 50 250 C50 150 127 50 300 50Z"
          fill="var(--color-surface)"
          stroke="var(--color-primary)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="mt-8 text-[var(--color-text-muted)] text-sm">
        Circle morphs into triangle, then into square
      </p>
    </div>
  )
}
