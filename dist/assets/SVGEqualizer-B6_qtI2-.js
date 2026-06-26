const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const bars = [30, 60, 45, 80, 35, 65, 50]

export default function SVGEqualizer() {
  const svgRef = useRef<SVGSVGElement>(null)
  const barRefs = useRef<(SVGRectElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      barRefs.current.forEach((bar, i) => {
        if (!bar) return
        gsap.to(bar, {
          attr: { height: bars[i] * 2 },
          duration: 0.4 + Math.random() * 0.3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: i * 0.08,
        })
      })
    }, svgRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">SVG Equalizer</h2>
      <svg ref={svgRef} viewBox="0 0 200 200" className="w-48 h-48">
        {bars.map((_, i) => (
          <rect
            key={i}
            ref={(el) => { barRefs.current[i] = el }}
            x={20 + i * 24}
            y={180}
            width="12"
            height={bars[i]}
            rx="3"
            fill={i % 2 === 0 ? 'var(--color-primary)' : 'var(--color-accent)'}
          />
        ))}
      </svg>
    </div>
  )
}
`;export{e as default};
