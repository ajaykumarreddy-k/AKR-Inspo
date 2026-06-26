import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function MotionPathOrbit() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        motionPath: {
          path: [
            { x: 120, y: 20 },
            { x: 220, y: 80 },
            { x: 120, y: 140 },
            { x: 20, y: 80 },
          ],
          curviness: 1,
        },
        duration: 3,
        ease: 'none',
        repeat: -1,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Motion Path Orbit</h2>
      <div className="relative w-72 h-48 border border-[var(--color-border)] rounded-lg">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--color-primary)] opacity-20" />
        <div ref={ref} className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-pink-400 shadow-lg" />
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 288 192">
          <ellipse cx="144" cy="80" rx="100" ry="60" fill="none" stroke="var(--color-border)" strokeWidth="1.5" strokeDasharray="4 4" />
        </svg>
      </div>
    </div>
  )
}
