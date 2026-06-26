import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function MotionPathCurve() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        motionPath: {
          path: [
            { x: 20, y: 100 },
            { x: 80, y: 20 },
            { x: 140, y: 100 },
            { x: 200, y: 20 },
            { x: 260, y: 100 },
          ],
          curviness: 1.2,
        },
        duration: 3,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Motion Path Curve</h2>
      <div className="relative w-72 h-48 border border-[var(--color-border)] rounded-lg">
        <div ref={ref} className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg" />
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 288 192">
          <path d="M20 100 Q80 20 140 100 T260 100" fill="none" stroke="var(--color-border)" strokeWidth="2" strokeDasharray="6 4" />
        </svg>
      </div>
    </div>
  )
}
