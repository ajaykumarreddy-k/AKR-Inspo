const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SVGPulsingCircle() {
  const svgRef = useRef<SVGSVGElement>(null)
  const pulseRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(pulseRef.current,
        { attr: { r: 20, opacity: 0.8 } },
        {
          attr: { r: 60, opacity: 0 },
          duration: 1.5,
          ease: 'power2.out',
          repeat: -1,
        }
      )
    }, svgRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">SVG Pulsing Circle</h2>
      <svg ref={svgRef} viewBox="0 0 200 200" className="w-48 h-48">
        <circle ref={pulseRef} cx="100" cy="100" r="20" fill="none" stroke="var(--color-primary)" strokeWidth="3" />
        <circle cx="100" cy="100" r="20" fill="var(--color-primary)" />
      </svg>
    </div>
  )
}
`;export{e as default};
