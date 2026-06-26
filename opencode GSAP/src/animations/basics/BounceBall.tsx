import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function BounceBall() {
  const ballRef = useRef<HTMLDivElement>(null)
  const shadowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const ball = ballRef.current
      const shadow = shadowRef.current
      if (!ball || !shadow) return

      gsap.to(ball, {
        y: -80,
        duration: 0.6,
        ease: 'bounce.out',
        yoyo: true,
        repeat: -1,
        repeatDelay: 0.1
      })
      gsap.to(ball, {
        scaleY: 0.7,
        scaleX: 1.3,
        duration: 0.15,
        ease: 'power1.in',
        yoyo: true,
        repeat: -1,
        repeatDelay: 0.55,
        delay: 0.55
      })
      gsap.to(shadow, {
        scale: 0.5,
        opacity: 0.3,
        duration: 0.6,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-2">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Bounce Ball</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Bouncing ball with squash &amp; stretch</p>
      <div className="relative flex flex-col items-center justify-end h-40 w-40">
        <div
          ref={ballRef}
          className="w-16 h-16 rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-accent)] shadow-[0_0_20px_rgba(34,211,238,0.5)] origin-bottom"
        />
        <div
          ref={shadowRef}
          className="w-16 h-3 rounded-full bg-black/40 blur-sm -mt-1"
        />
      </div>
    </div>
  )
}
