const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const segments = 8

export default function MotionPathSnake() {
  const containerRef = useRef<HTMLDivElement>(null)
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      refs.current.forEach((el, i) => {
        if (!el) return
        gsap.to(el, {
          motionPath: {
            path: [
              { x: 20, y: 20 + i * 2 },
              { x: 130, y: 20 + i * 2 },
              { x: 250, y: 140 - i * 2 },
              { x: 20, y: 140 - i * 2 },
            ],
            curviness: 0.5,
          },
          duration: 3,
          ease: 'none',
          repeat: -1,
          delay: i * 0.1,
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Motion Path Snake</h2>
      <div ref={containerRef} className="relative w-72 h-48 border border-[var(--color-border)] rounded-lg overflow-hidden">
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            ref={(el) => { refs.current[i] = el }}
            className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg"
            style={{ opacity: 1 - i / segments }}
          />
        ))}
      </div>
    </div>
  )
}
`;export{e as default};
