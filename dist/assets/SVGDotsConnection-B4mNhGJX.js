const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const dots = [
  { x: 40, y: 40 },
  { x: 160, y: 30 },
  { x: 180, y: 140 },
  { x: 30, y: 160 },
  { x: 100, y: 100 },
]

export default function SVGDotsConnection() {
  const svgRef = useRef<SVGSVGElement>(null)
  const linesRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = linesRef.current
      if (!path) return
      const length = path.getTotalLength()
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.out',
        repeat: -1,
        yoyo: true,
      })
    }, svgRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">SVG Dots Connection</h2>
      <svg ref={svgRef} viewBox="0 0 200 200" className="w-48 h-48">
        <path ref={linesRef} d="M40 40 L160 30 L180 140 L30 160 Z M100 100 L40 40 M100 100 L160 30 M100 100 L180 140 M100 100 L30 160" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" opacity="0.6" />
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r="5" fill="var(--color-accent)" />
        ))}
      </svg>
    </div>
  )
}
`;export{e as default};
