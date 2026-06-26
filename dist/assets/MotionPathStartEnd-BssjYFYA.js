const t=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function MotionPathStartEnd() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        motionPath: {
          path: [
            { x: 0, y: 0 },
            { x: 200, y: 40 },
            { x: 200, y: 100 },
            { x: 0, y: 100 },
          ],
          start: 0.2,
          end: 0.8,
        },
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Motion Path Start/End</h2>
      <div className="relative w-72 h-48 border border-[var(--color-border)] rounded-lg">
        <div ref={ref} className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg" />
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 288 192">
          <path d="M40 40 L240 80 L240 140 L40 140" fill="none" stroke="var(--color-border)" strokeWidth="2" strokeDasharray="6 4" />
        </svg>
      </div>
    </div>
  )
}
`;export{t as default};
