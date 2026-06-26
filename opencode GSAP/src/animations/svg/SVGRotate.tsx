import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SVGRotate() {
  const svgRef = useRef<SVGSVGElement>(null)
  const gearRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(gearRef.current, {
        rotation: 360,
        duration: 4,
        ease: 'none',
        repeat: -1,
        transformOrigin: '100 100',
      })
    }, svgRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">SVG Rotate</h2>
      <svg ref={svgRef} viewBox="0 0 200 200" className="w-48 h-48">
        <g ref={gearRef}>
          <circle cx="100" cy="100" r="30" fill="none" stroke="var(--color-primary)" strokeWidth="8" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <rect
              key={angle}
              x="92"
              y="40"
              width="16"
              height="30"
              rx="3"
              fill="var(--color-accent)"
              transform={`rotate(${angle} 100 100)`}
            />
          ))}
          <circle cx="100" cy="100" r="12" fill="var(--color-accent)" />
        </g>
      </svg>
    </div>
  )
}
