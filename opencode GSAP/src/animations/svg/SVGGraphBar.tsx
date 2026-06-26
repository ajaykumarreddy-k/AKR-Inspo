import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const bars = [
  { h: 40, color: 'var(--color-primary)' },
  { h: 70, color: 'var(--color-accent)' },
  { h: 50, color: 'var(--color-primary)' },
  { h: 90, color: 'var(--color-accent)' },
  { h: 30, color: 'var(--color-primary)' },
  { h: 80, color: 'var(--color-accent)' },
  { h: 60, color: 'var(--color-primary)' },
]

export default function SVGGraphBar() {
  const svgRef = useRef<SVGSVGElement>(null)
  const barRefs = useRef<(SVGRectElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      barRefs.current.forEach((bar, i) => {
        if (!bar) return
        gsap.fromTo(bar, { attr: { height: 0, y: 180 } }, {
          attr: { height: bars[i].h, y: 180 - bars[i].h },
          duration: 0.8,
          ease: 'back.out(1.7)',
          delay: i * 0.12,
          repeat: -1,
          yoyo: true,
        })
      })
    }, svgRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">SVG Graph Bar</h2>
      <svg ref={svgRef} viewBox="0 0 200 190" className="w-48 h-48">
        <line x1="10" y1="180" x2="190" y2="180" stroke="var(--color-border)" strokeWidth="2" />
        {bars.map((bar, i) => (
          <rect
            key={i}
            ref={(el) => { barRefs.current[i] = el }}
            x={20 + i * 24}
            y={180}
            width="16"
            height="0"
            rx="3"
            fill={bar.color}
          />
        ))}
      </svg>
    </div>
  )
}
