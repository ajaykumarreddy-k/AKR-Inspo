const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const slices = [
  { pct: 0.35, color: 'var(--color-primary)', offset: 0 },
  { pct: 0.25, color: 'var(--color-accent)', offset: 0.35 },
  { pct: 0.20, color: 'var(--color-text)', offset: 0.60 },
  { pct: 0.20, color: 'var(--color-border)', offset: 0.80 },
]

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function describeArc(cx: number, cy: number, r: number, start: number, end: number) {
  const s = polarToCartesian(cx, cy, r, end)
  const e = polarToCartesian(cx, cy, r, start)
  const large = end - start > 180 ? 1 : 0
  return \`M \${cx} \${cy} L \${s.x} \${s.y} A \${r} \${r} 0 \${large} 0 \${e.x} \${e.y} Z\`
}

export default function SVGPieChart() {
  const svgRef = useRef<SVGSVGElement>(null)
  const sliceRefs = useRef<(SVGPathElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      let cumulative = 0
      slices.forEach((slice, i) => {
        const end = slice.pct * 360
        const el = sliceRefs.current[i]
        if (!el) return
        gsap.fromTo(el, { attr: { d: describeArc(100, 100, 0, cumulative, cumulative) } }, {
          attr: { d: describeArc(100, 100, 70, cumulative, cumulative + end) },
          duration: 1,
          ease: 'power2.out',
          delay: i * 0.2,
        })
        cumulative += end
      })
    }, svgRef)

    return () => ctx.revert()
  }, [])

  let cumulative = 0
  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">SVG Pie Chart</h2>
      <svg ref={svgRef} viewBox="0 0 200 200" className="w-48 h-48">
        {slices.map((slice, i) => {
          const end = slice.pct * 360
          const d = describeArc(100, 100, 70, cumulative, cumulative + end)
          cumulative += end
          return <path key={i} ref={(el) => { sliceRefs.current[i] = el }} d={d} fill={slice.color} stroke="var(--color-bg)" strokeWidth="2" />
        })}
      </svg>
    </div>
  )
}
`;export{e as default};
