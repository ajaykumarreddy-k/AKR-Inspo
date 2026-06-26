import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SVGProgressRing() {
  const svgRef = useRef<SVGSVGElement>(null)
  const circleRef = useRef<SVGCircleElement>(null)
  const textRef = useRef<SVGTextElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const circle = circleRef.current
      if (!circle) return
      const length = 2 * Math.PI * 60
      gsap.set(circle, { strokeDasharray: length, strokeDashoffset: length })
      gsap.to(circle, {
        strokeDashoffset: 0,
        duration: 3,
        ease: 'power2.out',
        repeat: -1,
      })
    }, svgRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">SVG Progress Ring</h2>
      <svg ref={svgRef} viewBox="0 0 200 200" className="w-48 h-48">
        <circle cx="100" cy="100" r="60" fill="none" stroke="var(--color-border)" strokeWidth="8" />
        <circle ref={circleRef} cx="100" cy="100" r="60" fill="none" stroke="var(--color-primary)" strokeWidth="8" strokeLinecap="round" transform="rotate(-90 100 100)" />
        <text ref={textRef} x="100" y="100" textAnchor="middle" dominantBaseline="central" fill="var(--color-text)" fontSize="20" fontWeight="bold">Loading</text>
      </svg>
    </div>
  )
}
