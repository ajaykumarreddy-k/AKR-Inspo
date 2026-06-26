import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const racers = [
  { name: 'A', color: 'from-[var(--color-primary)] to-cyan-400' },
  { name: 'B', color: 'from-[var(--color-accent)] to-pink-400' },
  { name: 'C', color: 'from-emerald-400 to-teal-500' },
  { name: 'D', color: 'from-amber-400 to-orange-500' },
]

export default function MotionPathRacing() {
  const containerRef = useRef<HTMLDivElement>(null)
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      refs.current.forEach((el, i) => {
        if (!el) return
        gsap.to(el, {
          motionPath: {
            path: [
              { x: 0, y: i * 36 + 12 },
              { x: 250, y: i * 36 + 12 },
              { x: 250, y: i * 36 + 12 },
              { x: 0, y: i * 36 + 12 },
            ],
            curviness: 0,
          },
          duration: 2 + i * 0.4,
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true,
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Motion Path Racing</h2>
      <div ref={containerRef} className="relative w-72 h-48 border border-[var(--color-border)] rounded-lg overflow-hidden">
        {racers.map((r, i) => (
          <div
            key={r.name}
            ref={(el) => { refs.current[i] = el }}
            className={`absolute w-8 h-6 rounded bg-gradient-to-r ${r.color} shadow-lg flex items-center justify-center text-xs font-bold text-white`}
          >
            {r.name}
          </div>
        ))}
      </div>
    </div>
  )
}
