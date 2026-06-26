import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SVGPathDrawing() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current
      if (!path) return

      const length = path.getTotalLength()

      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })

      gsap.to(path, {
        strokeDashoffset: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
        ease: 'none',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4 bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold mb-4 text-[var(--color-text)]">SVG Path Drawing</h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        An inline SVG path that draws itself as you scroll.
      </p>
      <div className="h-[15vh]" />
      <svg viewBox="0 0 400 200" className="w-full max-w-lg" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 20 180 Q 60 20 120 100 T 220 60 T 320 140 T 380 40"
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="2"
        />
        <path
          ref={pathRef}
          d="M 20 180 Q 60 20 120 100 T 220 60 T 320 140 T 380 40"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
      <div className="h-[40vh]" />
    </div>
  )
}
