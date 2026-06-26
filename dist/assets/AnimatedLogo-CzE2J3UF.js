const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AnimatedLogo() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const logoGroupRef = useRef<SVGGElement>(null)
  const partsRef = useRef<SVGElement[]>([])

  useEffect(() => {
    if (!sectionRef.current || partsRef.current.length === 0) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        partsRef.current,
        { scale: 0, rotation: -30, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 4,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 25%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      className="min-h-[150vh] py-24 px-8 flex flex-col items-center justify-center bg-[var(--color-bg)]"
    >
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-16">
        Animated Logo
      </h2>
      <svg
        viewBox="0 0 400 400"
        className="w-full max-w-sm h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g ref={logoGroupRef}>
          <polygon
            ref={(el) => {
              if (el) partsRef.current[0] = el
            }}
            points="200,40 340,300 60,300"
            fill="var(--color-surface)"
            stroke="var(--color-primary)"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <polygon
            ref={(el) => {
              if (el) partsRef.current[1] = el
            }}
            points="200,100 280,260 120,260"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle
            ref={(el) => {
              if (el) partsRef.current[2] = el
            }}
            cx="200"
            cy="200"
            r="40"
            fill="var(--color-primary)"
          />
          <text
            ref={(el) => {
              if (el) partsRef.current[3] = el
            }}
            x="200"
            y="370"
            textAnchor="middle"
            fill="var(--color-text)"
            fontSize="28"
            fontWeight="bold"
            fontFamily="sans-serif"
            letterSpacing="4"
          >
            AKR
          </text>
        </g>
      </svg>
      <p className="mt-8 text-[var(--color-text-muted)] text-sm">
        Logo pieces animate in with scale and rotation
      </p>
    </div>
  )
}
`;export{e as default};
