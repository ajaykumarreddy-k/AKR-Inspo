import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function MotionPathFigure8() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        motionPath: {
          path: [
            { x: 120, y: 80 },
            { x: 200, y: 20 },
            { x: 220, y: 80 },
            { x: 200, y: 140 },
            { x: 120, y: 80 },
            { x: 40, y: 20 },
            { x: 20, y: 80 },
            { x: 40, y: 140 },
            { x: 120, y: 80 },
          ],
          curviness: 0.8,
        },
        duration: 5,
        ease: 'none',
        repeat: -1,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Motion Path Figure 8</h2>
      <div className="relative w-72 h-48 border border-[var(--color-border)] rounded-lg">
        <div ref={ref} className="absolute w-7 h-7 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg" />
      </div>
    </div>
  )
}
