const t=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function PathMotion() {
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = [
        { x: 0, y: 0 },
        { x: 80, y: -40 },
        { x: 160, y: 0 },
        { x: 80, y: 40 },
        { x: 0, y: 0 }
      ]
      const tl = gsap.timeline({ repeat: -1, ease: 'sine.inOut' })
      path.forEach((p) => {
        tl.to(dotRef.current, { x: p.x, y: p.y, duration: 0.6, ease: 'sine.inOut' })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Path Motion</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Animation along a diamond path</p>
      <div className="relative w-44 h-44">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 176 176">
          <polyline
            points="88,128 168,88 88,48 8,88 88,128"
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>
        <div
          ref={dotRef}
          className="absolute top-1/2 left-1/2 w-5 h-5 -mt-2.5 -ml-2.5 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg"
        />
      </div>
    </div>
  )
}
`;export{t as default};
