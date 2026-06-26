import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FollowMotionPath() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (
      !sectionRef.current ||
      !dotRef.current ||
      !pathRef.current ||
      !svgRef.current
    )
      return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        onUpdate: (self) => {
          const path = pathRef.current
          const dot = dotRef.current
          const svg = svgRef.current
          if (!path || !dot || !svg) return

          const len = path.getTotalLength()
          const pt = path.getPointAtLength(self.progress * len)
          const rect = svg.getBoundingClientRect()

          const x = rect.left + pt.x
          const y = rect.top + pt.y

          dot.style.transform = `translate(${x}px, ${y}px)`
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
        Follow Motion Path
      </h2>
      <div className="relative w-full max-w-lg">
        <svg
          ref={svgRef}
          viewBox="0 0 600 400"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={pathRef}
            d="M50 200 C50 50 200 50 300 150 C400 250 550 250 550 100"
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="3"
            strokeDasharray="8 4"
          />
          <circle
            cx="50"
            cy="200"
            r="8"
            fill="var(--color-primary)"
            opacity="0.5"
          />
          <circle
            cx="550"
            cy="100"
            r="8"
            fill="var(--color-accent)"
            opacity="0.5"
          />
        </svg>
        <div
          ref={dotRef}
          className="absolute top-0 left-0 w-5 h-5 bg-[var(--color-primary)] rounded-full shadow-lg pointer-events-none"
          style={{
            transform: 'translate(0, 0)',
            willChange: 'transform',
          }}
        />
      </div>
      <p className="mt-8 text-[var(--color-text-muted)] text-sm">
        A dot follows the SVG path as you scroll
      </p>
    </div>
  )
}
