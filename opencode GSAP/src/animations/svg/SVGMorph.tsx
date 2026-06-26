import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SVGMorph() {
  const svgRef = useRef<SVGSVGElement>(null)
  const shapeRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(shapeRef.current, {
        attr: { d: 'M100 10 L180 100 L140 190 L60 190 L20 100 Z' },
        duration: 1.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    }, svgRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">SVG Morph</h2>
      <svg ref={svgRef} viewBox="0 0 200 200" className="w-48 h-48">
        <path ref={shapeRef} d="M100 10 Q190 10 190 100 Q190 190 100 190 Q10 190 10 100 Q10 10 100 10 Z" fill="var(--color-primary)" />
      </svg>
    </div>
  )
}
