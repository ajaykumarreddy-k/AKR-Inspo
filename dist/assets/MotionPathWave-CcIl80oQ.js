const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function MotionPathWave() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        motionPath: {
          path: [
            { x: 10, y: 90 },
            { x: 55, y: 20 },
            { x: 100, y: 90 },
            { x: 145, y: 20 },
            { x: 190, y: 90 },
            { x: 235, y: 20 },
            { x: 270, y: 90 },
          ],
          curviness: 1,
        },
        duration: 3,
        ease: 'power1.inOut',
        repeat: -1,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Motion Path Wave</h2>
      <div className="relative w-72 h-48 border border-[var(--color-border)] rounded-lg">
        <div ref={ref} className="absolute w-7 h-7 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg" />
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 288 192">
          <path d="M10 90 Q55 20 100 90 T190 90 T270 90" fill="none" stroke="var(--color-border)" strokeWidth="2" strokeDasharray="6 4" />
        </svg>
      </div>
    </div>
  )
}
`;export{e as default};
