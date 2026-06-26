import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SVGSpiral() {
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current
      if (!path) return
      const length = path.getTotalLength()
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 3,
        ease: 'power2.out',
        repeat: -1,
        yoyo: true,
      })
    }, svgRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">SVG Spiral</h2>
      <svg ref={svgRef} viewBox="0 0 200 200" className="w-48 h-48">
        <path ref={pathRef} d="M100 100 Q110 90 120 100 Q130 120 110 130 Q80 140 70 110 Q60 70 100 60 Q150 50 160 100 Q170 160 100 170" fill="none" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  )
}
