import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SVGStarTwinkle() {
  const svgRef = useRef<SVGSVGElement>(null)
  const starRef = useRef<SVGPolygonElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(starRef.current, {
        opacity: 0.3,
        scale: 0.8,
        duration: 0.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        transformOrigin: '100 100',
      })
      gsap.to(starRef.current, {
        rotate: 360,
        duration: 8,
        ease: 'none',
        repeat: -1,
        transformOrigin: '100 100',
      })
    }, svgRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">SVG Star Twinkle</h2>
      <svg ref={svgRef} viewBox="0 0 200 200" className="w-48 h-48">
        <polygon ref={starRef} points="100,10 120,70 185,70 133,110 150,175 100,140 50,175 67,110 15,70 80,70" fill="var(--color-accent)" />
      </svg>
    </div>
  )
}
