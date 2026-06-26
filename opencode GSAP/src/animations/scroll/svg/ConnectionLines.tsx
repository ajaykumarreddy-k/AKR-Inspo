import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ConnectionLines() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<SVGPathElement[]>([])
  const nodesRef = useRef<SVGCircleElement[]>([])

  useEffect(() => {
    if (!sectionRef.current || linesRef.current.length === 0) return

    const ctx = gsap.context(() => {
      linesRef.current.forEach((line) => {
        const length = line.getTotalLength()
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(line, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
          },
        })
      })

      nodesRef.current.forEach((node, i) => {
        gsap.fromTo(
          node,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1.5,
              offset: i * 0.05,
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const connections = [
    { x1: 300, y1: 50, x2: 120, y2: 200 },
    { x1: 120, y1: 200, x2: 200, y2: 380 },
    { x1: 200, y1: 380, x2: 400, y2: 380 },
    { x1: 400, y1: 380, x2: 480, y2: 200 },
    { x1: 480, y1: 200, x2: 300, y2: 50 },
    { x1: 120, y1: 200, x2: 480, y2: 200 },
    { x1: 200, y1: 380, x2: 300, y2: 50 },
    { x1: 400, y1: 380, x2: 300, y2: 50 },
  ]

  const nodes = [
    { cx: 300, cy: 50 },
    { cx: 120, cy: 200 },
    { cx: 200, cy: 380 },
    { cx: 400, cy: 380 },
    { cx: 480, cy: 200 },
  ]

  return (
    <div
      ref={sectionRef}
      className="min-h-[150vh] py-24 px-8 flex flex-col items-center justify-center bg-[var(--color-bg)]"
    >
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-16">
        Connection Lines
      </h2>
      <svg
        viewBox="0 0 600 450"
        className="w-full max-w-lg h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {connections.map((c, i) => (
          <path
            key={`line-${i}`}
            ref={(el) => {
              if (el) linesRef.current[i] = el
            }}
            d={`M${c.x1} ${c.y1} Q${(c.x1 + c.x2) / 2} ${(c.y1 + c.y2) / 2 + (i % 2 === 0 ? -30 : 30)} ${c.x2} ${c.y2}`}
            fill="none"
            stroke={i % 2 === 0 ? 'var(--color-primary)' : 'var(--color-accent)'}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
          />
        ))}
        {nodes.map((n, i) => (
          <circle
            key={`node-${i}`}
            ref={(el) => {
              if (el) nodesRef.current[i] = el
            }}
            cx={n.cx}
            cy={n.cy}
            r="12"
            fill="var(--color-surface)"
            stroke="var(--color-primary)"
            strokeWidth="3"
          />
        ))}
      </svg>
      <p className="mt-8 text-[var(--color-text-muted)] text-sm">
        Network nodes connect with drawing lines on scroll
      </p>
    </div>
  )
}
