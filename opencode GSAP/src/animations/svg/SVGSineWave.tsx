import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SVGSineWave() {
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(pathRef.current, {
        attr: { d: 'M0 50 Q25 80 50 50 T100 50 T150 50 T200 50 T250 50 T300 50' },
        duration: 0.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    }, svgRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">SVG Sine Wave</h2>
      <svg ref={svgRef} viewBox="0 0 300 100" className="w-full max-w-sm h-24">
        <path ref={pathRef} d="M0 50 Q25 20 50 50 T100 50 T150 50 T200 50 T250 50 T300 50" fill="none" stroke="var(--color-primary)" strokeWidth="3" />
      </svg>
    </div>
  )
}
