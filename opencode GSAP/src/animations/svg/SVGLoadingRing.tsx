import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SVGLoadingRing() {
  const svgRef = useRef<SVGSVGElement>(null)
  const ringRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(ringRef.current, {
        rotation: 360,
        duration: 1.5,
        ease: 'none',
        repeat: -1,
        transformOrigin: '50 50',
      })
    }, svgRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">SVG Loading Ring</h2>
      <svg ref={svgRef} viewBox="0 0 100 100" className="w-32 h-32">
        <circle cx="50" cy="50" r="36" fill="none" stroke="var(--color-border)" strokeWidth="6" />
        <circle ref={ringRef} cx="50" cy="50" r="36" fill="none" stroke="var(--color-primary)" strokeWidth="6" strokeDasharray="80 200" strokeLinecap="round" />
      </svg>
    </div>
  )
}
