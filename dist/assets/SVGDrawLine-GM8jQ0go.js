const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SVGDrawLine() {
  const svgRef = useRef<SVGSVGElement>(null)
  const lineRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const line = lineRef.current
      if (!line) return
      const length = line.getTotalLength()
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length })
      gsap.to(line, {
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
      <h2 className="text-xl font-bold text-[var(--color-text)]">SVG Draw Line</h2>
      <svg ref={svgRef} viewBox="0 0 300 100" className="w-full max-w-sm h-24">
        <path ref={lineRef} d="M20 50 Q80 10 150 50 T280 50" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  )
}
`;export{e as default};
