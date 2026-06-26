import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ElasticBounce() {
  const ballRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.elastic-ball', {
        y: -120,
        duration: 1.2,
        ease: 'elastic.out(1, 0.3)',
        repeat: -1,
        yoyo: true,
      })
      gsap.to('.elastic-shadow', {
        scale: 0.6,
        opacity: 0.3,
        duration: 1.2,
        ease: 'elastic.out(1, 0.3)',
        repeat: -1,
        yoyo: true,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Elastic Bounce</h2>
      <div className="relative w-full h-40 flex flex-col items-center justify-end">
        <div ref={ballRef} className="elastic-ball w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-[0_0_20px_rgba(34,211,238,0.4)]" />
        <div className="elastic-shadow w-14 h-3 mt-2 rounded-full bg-[var(--color-border)] opacity-60" />
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Elastic easing with overshoot</p>
    </div>
  )
}
