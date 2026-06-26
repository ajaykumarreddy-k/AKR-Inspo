import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SVGBounce() {
  const svgRef = useRef<SVGSVGElement>(null)
  const circleRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(circleRef.current, {
        attr: { cy: 320 },
        duration: 0.6,
        ease: 'bounce.out',
        yoyo: true,
        repeat: -1,
      })
    }, svgRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">SVG Bounce</h2>
      <svg ref={svgRef} viewBox="0 0 200 350" className="w-48 h-64">
        <line x1="20" y1="330" x2="180" y2="330" stroke="var(--color-border)" strokeWidth="2" />
        <circle ref={circleRef} cx="100" cy="50" r="24" fill="var(--color-primary)" />
      </svg>
    </div>
  )
}
