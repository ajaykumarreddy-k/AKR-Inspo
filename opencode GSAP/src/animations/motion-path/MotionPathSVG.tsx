import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

export default function MotionPathSVG() {
  const containerRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try { gsap.registerPlugin(MotionPathPlugin) } catch { /* empty */ }

    const ctx = gsap.context(() => {
      gsap.to(dotRef.current, {
        motionPath: {
          path: '#motionSvgPath',
          align: '#motionSvgPath',
          alignOrigin: [0.5, 0.5],
        },
        duration: 3,
        ease: 'power1.inOut',
        repeat: -1,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Motion Path SVG</h2>
      <div ref={containerRef} className="relative w-72 h-48">
        <svg viewBox="0 0 288 192" className="w-full h-full">
          <path id="motionSvgPath" d="M30 150 Q80 20 150 80 T260 120" fill="none" stroke="var(--color-border)" strokeWidth="2" strokeDasharray="6 4" />
        </svg>
        <div ref={dotRef} className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg" style={{ top: 0, left: 0 }} />
      </div>
    </div>
  )
}
