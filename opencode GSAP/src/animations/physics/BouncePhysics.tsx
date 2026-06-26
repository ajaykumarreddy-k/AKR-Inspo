import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function BouncePhysics() {
  const ballRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.bounce-ball', {
        y: -150,
        duration: 0.6,
        ease: 'power2.out',
        repeat: -1,
        yoyo: true,
        yoyoEase: 'bounce.out',
      })
      gsap.to('.bounce-ball-shadow', {
        scale: 0.5,
        opacity: 0.2,
        duration: 0.6,
        ease: 'power2.out',
        repeat: -1,
        yoyo: true,
        yoyoEase: 'bounce.out',
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Bounce Physics</h2>
      <div className="relative w-full h-44 flex flex-col items-center justify-end">
        <div ref={ballRef} className="bounce-ball w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-[0_0_20px_rgba(74,222,128,0.4)]" />
        <div className="bounce-ball-shadow w-14 h-4 mt-2 rounded-full bg-[var(--color-border)] opacity-50" />
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Ball bouncing with gravity physics</p>
    </div>
  )
}
