import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SpringMotion() {
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.spring-box', {
        x: 200,
        duration: 1.5,
        ease: 'bounce.out',
        repeat: -1,
        yoyo: true,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Spring Motion</h2>
      <div className="relative w-full h-40 flex items-center">
        <div ref={boxRef} className="spring-box w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg absolute left-0" />
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Bounce easing spring-like motion</p>
    </div>
  )
}
