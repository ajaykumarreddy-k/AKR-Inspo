import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function DonutChartAnimated() {
  const circlesRef = useRef<SVGCircleElement[]>([])

  useEffect(() => {
    const circles = circlesRef.current
    if (!circles.length) return

    const ctx = gsap.context(() => {
      circles.forEach((circle) => {
        const length = circle.getTotalLength()
        gsap.set(circle, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(circle, {
          strokeDashoffset: circle.getAttribute('data-offset'),
          duration: 1.5,
          ease: 'power2.out',
        })
      })
    })

    return () => ctx.revert()
  }, [])

  const setCircleRef = (el: SVGCircleElement | null, i: number) => {
    if (el) circlesRef.current[i] = el
  }

  const segments = [
    { pct: 40, color: 'var(--color-primary)', offset: 0 },
    { pct: 25, color: 'var(--color-accent)', offset: 40 },
    { pct: 20, color: 'var(--color-success)', offset: 65 },
    { pct: 15, color: 'var(--color-warning)', offset: 85 },
  ]
  const r = 36
  const circ = 2 * Math.PI * r

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Donut Chart</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Animated donut chart</p>
      <svg className="w-24 h-24" viewBox="0 0 100 100">
        {segments.map((seg, i) => {
          const dashLen = (seg.pct / 100) * circ
          const dashOff = circ - dashLen
          const rotOffset = segments.slice(0, i).reduce((a, s) => a + (s.pct / 100) * 360, 0)
          return (
            <circle
              key={i}
              ref={(el) => setCircleRef(el, i)}
              className="donut-segment"
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth="8"
              strokeDasharray={`${dashLen} ${dashOff}`}
              data-offset={dashOff}
              strokeLinecap="round"
              transform={`rotate(${rotOffset - 90} 50 50)`}
            />
          )
        })}
      </svg>
    </div>
  )
}
