import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function PendulumSwing() {
  const pivotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.pendulum-arm', {
        rotation: 30,
        duration: 1.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        transformOrigin: 'top center',
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Pendulum Swing</h2>
      <div className="relative w-full h-48 flex flex-col items-center">
        <div ref={pivotRef} className="w-4 h-4 rounded-full bg-[var(--color-primary)] shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
        <div className="pendulum-arm relative w-1 h-36 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-accent)] origin-top rounded-full flex items-end justify-center"
          style={{ transformOrigin: 'top center' }}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-[0_0_15px_rgba(34,211,238,0.4)] -ml-[19px] mb-[-4px]" />
        </div>
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Pendulum physics with sine easing</p>
    </div>
  )
}
