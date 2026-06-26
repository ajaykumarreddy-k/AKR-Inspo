const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SVGColorChange() {
  const svgRef = useRef<SVGSVGElement>(null)
  const rectRef = useRef<SVGRectElement>(null)
  const circleRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(rectRef.current, {
        fill: 'var(--color-accent)',
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
      gsap.to(circleRef.current, {
        stroke: 'var(--color-accent)',
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: 0.5,
      })
    }, svgRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">SVG Color Change</h2>
      <svg ref={svgRef} viewBox="0 0 200 120" className="w-48 h-32">
        <rect ref={rectRef} x="20" y="20" width="60" height="60" rx="8" fill="var(--color-primary)" />
        <circle ref={circleRef} cx="150" cy="50" r="30" fill="none" stroke="var(--color-primary)" strokeWidth="6" />
      </svg>
    </div>
  )
}
`;export{e as default};
