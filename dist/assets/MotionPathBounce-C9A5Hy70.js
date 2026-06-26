const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function MotionPathBounce() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        motionPath: {
          path: [
            { x: 30, y: 30 },
            { x: 80, y: 140 },
            { x: 130, y: 30 },
            { x: 180, y: 140 },
            { x: 230, y: 30 },
          ],
          curviness: 0.2,
        },
        duration: 2,
        ease: 'bounce.out',
        repeat: -1,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Motion Path Bounce</h2>
      <div className="relative w-72 h-48 border border-[var(--color-border)] rounded-lg">
        <div ref={ref} className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg" />
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 288 192">
          <path d="M30 30 Q80 140 130 30 T230 30" fill="none" stroke="var(--color-border)" strokeWidth="2" strokeDasharray="6 4" />
        </svg>
      </div>
    </div>
  )
}
`;export{e as default};
