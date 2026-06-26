import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SVGHeartbeat() {
  const svgRef = useRef<SVGSVGElement>(null)
  const heartRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(heartRef.current, {
        scale: 1.25,
        duration: 0.3,
        ease: 'power2.out',
        yoyo: true,
        repeat: -1,
        repeatDelay: 0.6,
        transformOrigin: '100 90',
      })
    }, svgRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">SVG Heartbeat</h2>
      <svg ref={svgRef} viewBox="0 0 200 200" className="w-48 h-48">
        <path ref={heartRef} d="M100 170 Q30 110 30 70 Q30 30 65 30 Q85 30 100 50 Q115 30 135 30 Q170 30 170 70 Q170 110 100 170 Z" fill="var(--color-primary)" />
      </svg>
    </div>
  )
}
