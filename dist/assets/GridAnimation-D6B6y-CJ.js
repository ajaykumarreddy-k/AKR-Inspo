const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function GridAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      gsap.from('.grid-cell', {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        stagger: { grid: [4, 4], from: 'center', amount: 0.8 },
        ease: 'back.out(2)',
        repeat: -1,
        repeatDelay: 2,
      })
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Grid Animation</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Animated grid of shapes</p>
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="grid-cell w-6 h-6 rounded-sm bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]"
          />
        ))}
      </div>
    </div>
  )
}
`;export{e as default};
