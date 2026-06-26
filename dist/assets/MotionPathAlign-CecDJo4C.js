const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function MotionPathAlign() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        motionPath: {
          path: [
            { x: 40, y: 40 },
            { x: 220, y: 40 },
            { x: 220, y: 120 },
            { x: 40, y: 120 },
            { x: 40, y: 40 },
          ],
          alignOrigin: [0.5, 0.5],
        },
        duration: 4,
        ease: 'none',
        repeat: -1,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Motion Path Align</h2>
      <div className="relative w-72 h-48 border border-[var(--color-border)] rounded-lg">
        <div ref={ref} className="absolute w-8 h-8 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
      </div>
    </div>
  )
}
`;export{e as default};
