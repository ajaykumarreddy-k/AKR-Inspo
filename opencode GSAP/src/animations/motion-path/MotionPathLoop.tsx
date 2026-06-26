import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const pathPoints = [
  { x: 0, y: 0 },
  { x: 160, y: 0 },
  { x: 160, y: 100 },
  { x: 0, y: 100 },
]

export default function MotionPathLoop() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        motionPath: {
          path: pathPoints,
          curviness: 0,
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
      <h2 className="text-xl font-bold text-[var(--color-text)]">Motion Path Loop</h2>
      <div className="relative w-72 h-48 border border-[var(--color-border)] rounded-lg">
        <div ref={ref} className="absolute w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg" />
      </div>
    </div>
  )
}
