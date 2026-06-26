const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SVGCircleDraw() {
  const svgRef = useRef<SVGSVGElement>(null)
  const circleRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const circle = circleRef.current
      if (!circle) return
      const length = 2 * Math.PI * 40
      gsap.set(circle, { strokeDasharray: length, strokeDashoffset: length })
      gsap.to(circle, {
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
      <h2 className="text-xl font-bold text-[var(--color-text)]">SVG Circle Draw</h2>
      <svg ref={svgRef} viewBox="0 0 200 200" className="w-48 h-48">
        <circle ref={circleRef} cx="100" cy="100" r="40" fill="none" stroke="var(--color-primary)" strokeWidth="6" strokeLinecap="round" transform="rotate(-90 100 100)" />
      </svg>
    </div>
  )
}
`;export{e as default};
