import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function PieChartAnimated() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const arcs = svg.querySelectorAll<SVGPathElement>('.arc')

    const ctx = gsap.context(() => {
      arcs.forEach((arc) => {
        const length = arc.getTotalLength?.() || 0
        if (length) {
          gsap.set(arc, { strokeDasharray: length, strokeDashoffset: length })
          gsap.to(arc, {
            strokeDashoffset: 0,
            duration: 1,
            ease: 'power2.out',
          })
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Pie Chart</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Animated pie chart</p>
      <svg ref={svgRef} className="w-24 h-24" viewBox="0 0 100 100">
        <path className="arc" d="M50,50 L50,5 A45,45 0 1,1 49.9,5 Z" fill="var(--color-primary)" opacity="0.8" />
        <path className="arc" d="M50,50 L50,95 A45,45 0 0,1 5,50 Z" fill="var(--color-accent)" opacity="0.8" />
        <path className="arc" d="M50,50 L95,50 A45,45 0 0,1 50,95 Z" fill="var(--color-success)" opacity="0.8" />
        <path className="arc" d="M50,50 L5,50 A45,45 0 0,1 50,5 Z" fill="var(--color-warning)" opacity="0.8" />
        <circle cx="50" cy="50" r="15" fill="var(--color-bg)" />
      </svg>
    </div>
  )
}
