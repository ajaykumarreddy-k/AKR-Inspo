import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SwingEffect() {
  const pendulumRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(pendulumRef.current, {
        rotation: 45,
        duration: 1.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        transformOrigin: 'top center'
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Swing Effect</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Pendulum swing motion</p>
      <div className="flex flex-col items-center">
        <div className="w-1 h-12 bg-[var(--color-border)]" />
        <div
          ref={pendulumRef}
          className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 shadow-lg flex items-center justify-center text-white font-bold"
          style={{ transformOrigin: 'top center' }}
        >
          Swing
        </div>
      </div>
    </div>
  )
}
