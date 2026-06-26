const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const colors = [
  'from-[var(--color-primary)] to-cyan-400',
  'from-[var(--color-accent)] to-pink-400',
  'from-emerald-400 to-[var(--color-primary)]',
  'from-amber-400 to-[var(--color-accent)]',
]

export default function MotionPathMultiple() {
  const containerRef = useRef<HTMLDivElement>(null)
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      refs.current.forEach((el, i) => {
        if (!el) return
        gsap.to(el, {
          motionPath: {
            path: [
              { x: 0, y: i * 30 + 10 },
              { x: 220, y: i * 30 + 10 },
            ],
            curviness: 0,
          },
          duration: 2,
          ease: 'none',
          repeat: -1,
          delay: i * 0.3,
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Motion Path Multiple</h2>
      <div ref={containerRef} className="relative w-72 h-48 border border-[var(--color-border)] rounded-lg overflow-hidden">
        {colors.map((c, i) => (
          <div
            key={i}
            ref={(el) => { refs.current[i] = el }}
            className={\`absolute w-6 h-6 rounded-full bg-gradient-to-br \${c} shadow-lg\`}
          />
        ))}
      </div>
    </div>
  )
}
`;export{e as default};
