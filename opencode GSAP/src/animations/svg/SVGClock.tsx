import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SVGClock() {
  const svgRef = useRef<SVGSVGElement>(null)
  const secondRef = useRef<SVGLineElement>(null)
  const minuteRef = useRef<SVGLineElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(secondRef.current, {
        rotation: 360,
        duration: 60,
        ease: 'none',
        repeat: -1,
        transformOrigin: '100 100',
      })
      gsap.to(minuteRef.current, {
        rotation: 360,
        duration: 3600,
        ease: 'none',
        repeat: -1,
        transformOrigin: '100 100',
      })
    }, svgRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">SVG Clock</h2>
      <svg ref={svgRef} viewBox="0 0 200 200" className="w-48 h-48">
        <circle cx="100" cy="100" r="80" fill="none" stroke="var(--color-border)" strokeWidth="4" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => (
          <line key={a} x1="100" y1="28" x2="100" y2="36" stroke="var(--color-text)" strokeWidth="3" transform={`rotate(${a} 100 100)`} />
        ))}
        <line ref={minuteRef} x1="100" y1="100" x2="100" y2="50" stroke="var(--color-text)" strokeWidth="4" strokeLinecap="round" />
        <line ref={secondRef} x1="100" y1="100" x2="100" y2="35" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="100" cy="100" r="5" fill="var(--color-primary)" />
      </svg>
    </div>
  )
}
