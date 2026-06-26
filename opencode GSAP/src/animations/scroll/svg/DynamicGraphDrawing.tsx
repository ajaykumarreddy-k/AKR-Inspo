import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function DynamicGraphDrawing() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<SVGPathElement>(null)
  const barsRef = useRef<SVGRectElement[]>([])
  const dotsRef = useRef<SVGCircleElement[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength()
        gsap.set(lineRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        })
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
          },
        })
      }

      barsRef.current.forEach((bar, i) => {
        const h = Number(bar.getAttribute('data-height'))
        gsap.set(bar, { scaleY: 0, transformOrigin: 'bottom' })
        gsap.to(bar, {
          scaleY: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
            offset: i * 0.06,
          },
        })
      })

      dotsRef.current.forEach((dot, i) => {
        gsap.set(dot, { scale: 0, opacity: 0 })
        gsap.to(dot, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
            offset: i * 0.06,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const data = [
    { x: 70, y: 340, h: 60 },
    { x: 130, y: 340, h: 120 },
    { x: 190, y: 340, h: 200 },
    { x: 250, y: 340, h: 150 },
    { x: 310, y: 340, h: 280 },
    { x: 370, y: 340, h: 220 },
    { x: 430, y: 340, h: 310 },
    { x: 490, y: 340, h: 250 },
  ]

  return (
    <div
      ref={sectionRef}
      className="min-h-[150vh] py-24 px-8 flex flex-col items-center justify-center bg-[var(--color-bg)]"
    >
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-16">
        Dynamic Graph Drawing
      </h2>
      <svg
        viewBox="0 0 560 400"
        className="w-full max-w-lg h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Axes */}
        <line
          x1="40" y1="350" x2="530" y2="350"
          stroke="var(--color-border)"
          strokeWidth="2"
        />
        <line
          x1="50" y1="40" x2="50" y2="355"
          stroke="var(--color-border)"
          strokeWidth="2"
        />

        {/* Grid lines */}
        {[80, 160, 240, 320].map((y, i) => (
          <line
            key={i}
            x1="50" y1={y} x2="530" y2={y}
            stroke="var(--color-border)"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.3"
          />
        ))}

        {/* Bars */}
        {data.map((d, i) => (
          <rect
            key={`bar-${i}`}
            ref={(el) => {
              if (el) barsRef.current[i] = el
            }}
            x={d.x - 18}
            y={d.y - d.h}
            width="36"
            height={d.h}
            rx="4"
            fill={i % 2 === 0 ? 'var(--color-primary)' : 'var(--color-accent)'}
            opacity="0.6"
            data-height={d.h}
          />
        ))}

        {/* Line path */}
        <path
          ref={lineRef}
          d={`M${data.map((d, i) => `${i === 0 ? 'M' : 'L'}${d.x} ${d.y - d.h}`).join(' ')}`}
          fill="none"
          stroke="var(--color-text)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data dots */}
        {data.map((d, i) => (
          <circle
            key={`dot-${i}`}
            ref={(el) => {
              if (el) dotsRef.current[i] = el
            }}
            cx={d.x}
            cy={d.y - d.h}
            r="6"
            fill="var(--color-surface)"
            stroke="var(--color-text)"
            strokeWidth="3"
          />
        ))}
      </svg>
      <p className="mt-8 text-[var(--color-text-muted)] text-sm">
        Bars rise and the trend line draws on scroll
      </p>
    </div>
  )
}
