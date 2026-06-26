import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function BlinkEffect() {
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, {
        opacity: 0.15,
        scale: 0.95,
        duration: 0.2,
        ease: 'none',
        repeat: -1,
        yoyo: true,
        repeatDelay: 1.5
      })
      gsap.to(boxRef.current, {
        boxShadow: '0 0 60px rgba(34,211,238,0.8), 0 0 120px rgba(34,211,238,0.3)',
        duration: 0.2,
        ease: 'none',
        repeat: -1,
        yoyo: true,
        repeatDelay: 1.5
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Blink / Glow</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Blinking and glowing effect</p>
      <div
        ref={boxRef}
        className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white font-bold shadow-lg"
      >
        Blink
      </div>
    </div>
  )
}
