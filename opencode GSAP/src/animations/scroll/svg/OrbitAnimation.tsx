import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function OrbitAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const orbit1Ref = useRef<SVGGElement>(null)
  const orbit2Ref = useRef<SVGGElement>(null)
  const orbit3Ref = useRef<SVGGElement>(null)

  useEffect(() => {
    if (
      !sectionRef.current ||
      !orbit1Ref.current ||
      !orbit2Ref.current ||
      !orbit3Ref.current
    )
      return

    const ctx = gsap.context(() => {
      gsap.to(orbit1Ref.current, {
        rotation: 360,
        transformOrigin: '300 250',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
      gsap.to(orbit2Ref.current, {
        rotation: -360,
        transformOrigin: '300 250',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
      gsap.to(orbit3Ref.current, {
        rotation: 360,
        transformOrigin: '300 250',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
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
        Orbit Animation
      </h2>
      <svg
        viewBox="0 0 600 500"
        className="w-full max-w-sm h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sun */}
        <circle cx="300" cy="250" r="40" fill="var(--color-accent)" />
        <circle
          cx="300"
          cy="250"
          r="55"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Orbit 1 */}
        <g ref={orbit1Ref}>
          <ellipse
            cx="300"
            cy="250"
            rx="100"
            ry="100"
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.5"
          />
          <circle cx="400" cy="250" r="10" fill="var(--color-primary)" />
        </g>

        {/* Orbit 2 */}
        <g ref={orbit2Ref}>
          <ellipse
            cx="300"
            cy="250"
            rx="160"
            ry="160"
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.5"
          />
          <circle
            cx="140"
            cy="250"
            r="14"
            fill="var(--color-surface)"
            stroke="var(--color-primary)"
            strokeWidth="2"
          />
        </g>

        {/* Orbit 3 */}
        <g ref={orbit3Ref}>
          <ellipse
            cx="300"
            cy="250"
            rx="220"
            ry="100"
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.5"
          />
          <circle
            cx="520"
            cy="250"
            r="8"
            fill="var(--color-accent)"
          />
        </g>
      </svg>
      <p className="mt-8 text-[var(--color-text-muted)] text-sm">
        Objects orbit the center at different speeds on scroll
      </p>
    </div>
  )
}
