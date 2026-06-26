const t=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SVGInfinity() {
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
        duration: 2.5,
        ease: 'power2.out',
        repeat: -1,
        yoyo: true,
      })
    }, svgRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">SVG Infinity</h2>
      <svg ref={svgRef} viewBox="0 0 200 100" className="w-48 h-24">
        <path ref={pathRef} d="M30 50 C30 20 70 20 100 50 C130 80 170 80 170 50 C170 20 130 20 100 50" fill="none" stroke="var(--color-primary)" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  )
}
`;export{t as default};
