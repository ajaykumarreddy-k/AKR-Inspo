const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function GravityDrop() {
  const ballRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.drop-ball', {
        y: 120,
        duration: 0.8,
        ease: 'bounce.out',
        repeat: -1,
        yoyo: true,
        delay: 0.2,
      })
      gsap.to('.drop-ball', {
        scaleY: 0.7,
        scaleX: 1.3,
        duration: 0.15,
        ease: 'none',
        repeat: -1,
        yoyo: true,
        delay: 0.8,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Gravity Drop</h2>
      <div className="relative w-full h-44 flex flex-col items-center justify-start">
        <div ref={ballRef} className="drop-ball w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 shadow-[0_0_20px_rgba(255,100,50,0.4)]" />
        <div className="w-16 h-3 mt-auto rounded-full bg-[var(--color-border)] opacity-50" />
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Gravity-driven drop with bounce</p>
    </div>
  )
}
`;export{e as default};
