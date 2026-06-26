import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

export default function SVGPathAnimate() {
  const svgRef = useRef<SVGSVGElement>(null)
  const dotRef = useRef<SVGCircleElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    try { gsap.registerPlugin(MotionPathPlugin) } catch { /* empty */ }

    const ctx = gsap.context(() => {
      gsap.to(dotRef.current, {
        duration: 3,
        ease: 'power1.inOut',
        repeat: -1,
        motionPath: { path: '#followPath', align: '#followPath', alignOrigin: [0.5, 0.5] },
      })
    }, svgRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">SVG Path Animate</h2>
      <svg ref={svgRef} viewBox="0 0 300 200" className="w-full max-w-sm h-48">
        <path id="followPath" ref={pathRef} d="M30 100 Q80 20 150 100 T270 100" fill="none" stroke="var(--color-border)" strokeWidth="2" strokeDasharray="6 4" />
        <circle ref={dotRef} r="10" fill="var(--color-primary)" />
      </svg>
    </div>
  )
}
