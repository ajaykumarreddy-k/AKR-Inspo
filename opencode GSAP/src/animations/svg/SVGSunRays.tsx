import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const rays = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]

export default function SVGSunRays() {
  const svgRef = useRef<SVGSVGElement>(null)
  const raysRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(raysRef.current, {
        rotation: 360,
        duration: 12,
        ease: 'none',
        repeat: -1,
        transformOrigin: '100 100',
      })
      gsap.to('svg', {
        opacity: 0.7,
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
      <h2 className="text-xl font-bold text-[var(--color-text)]">SVG Sun Rays</h2>
      <svg ref={svgRef} viewBox="0 0 200 200" className="w-48 h-48">
        <circle cx="100" cy="100" r="30" fill="var(--color-accent)" />
        <g ref={raysRef}>
          {rays.map((angle) => (
            <line key={angle} x1="100" y1="40" x2="100" y2="25" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" transform={`rotate(${angle} 100 100)`} />
          ))}
        </g>
      </svg>
    </div>
  )
}
