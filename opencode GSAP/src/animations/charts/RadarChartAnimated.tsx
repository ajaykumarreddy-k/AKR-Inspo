import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function RadarChartAnimated() {
  const polygonRef = useRef<SVGPolygonElement>(null)

  useEffect(() => {
    const polygon = polygonRef.current
    if (!polygon) return

    const ctx = gsap.context(() => {
      gsap.from(polygon, {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: 'back.out(2)',
        transformOrigin: '50% 50%',
      })
      gsap.from('.radar-point', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(2)',
        delay: 0.5,
      })
    })

    return () => ctx.revert()
  }, [])

  const points = [
    { x: 50, y: 5 }, { x: 90, y: 30 }, { x: 75, y: 70 },
    { x: 25, y: 70 }, { x: 10, y: 30 },
  ]

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Radar Chart</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Animated radar chart</p>
      <svg className="w-28 h-28" viewBox="0 0 100 100">
        <polygon points="50,5 95,30 80,75 20,75 5,30" fill="none" stroke="var(--color-border)" strokeWidth="1" />
        <polygon points="25,30 75,30 60,60 40,60 35,40" fill="none" stroke="var(--color-border)" strokeWidth="1" />
        <polygon
          ref={polygonRef}
          points={points.map((p) => `${p.x},${p.y}`).join(' ')}
          fill="var(--color-primary)"
          opacity="0.3"
          stroke="var(--color-accent)"
          strokeWidth="2"
        />
        {points.map((p, i) => (
          <circle key={i} className="radar-point" cx={p.x} cy={p.y} r="3" fill="var(--color-accent)" />
        ))}
      </svg>
    </div>
  )
}
