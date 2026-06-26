const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const petals = [0, 45, 90, 135, 180, 225, 270, 315]

export default function SVGFlower() {
  const svgRef = useRef<SVGSVGElement>(null)
  const groupRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(groupRef.current, {
        rotation: 360,
        duration: 6,
        ease: 'none',
        repeat: -1,
        transformOrigin: '100 100',
      })
    }, svgRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">SVG Flower</h2>
      <svg ref={svgRef} viewBox="0 0 200 200" className="w-48 h-48">
        <g ref={groupRef}>
          {petals.map((angle) => (
            <ellipse
              key={angle}
              cx="100"
              cy="50"
              rx="16"
              ry="40"
              fill="var(--color-accent)"
              opacity="0.8"
              transform={\`rotate(\${angle} 100 100)\`}
            />
          ))}
          <circle cx="100" cy="100" r="20" fill="var(--color-primary)" />
        </g>
      </svg>
    </div>
  )
}
`;export{e as default};
