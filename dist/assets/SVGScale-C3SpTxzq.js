const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SVGScale() {
  const svgRef = useRef<SVGSVGElement>(null)
  const shapeRef = useRef<SVGRectElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(shapeRef.current, {
        attr: { rx: 40, ry: 40 },
        scale: 0.5,
        duration: 1,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        transformOrigin: '100 100',
      })
    }, svgRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">SVG Scale</h2>
      <svg ref={svgRef} viewBox="0 0 200 200" className="w-48 h-48">
        <rect ref={shapeRef} x="40" y="40" width="120" height="120" rx="12" fill="var(--color-primary)" />
      </svg>
    </div>
  )
}
`;export{e as default};
