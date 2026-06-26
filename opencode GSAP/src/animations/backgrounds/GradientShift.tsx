import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function GradientShift() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bg = bgRef.current
    if (!bg) return

    const ctx = gsap.context(() => {
      gsap.to(bg, {
        backgroundPosition: '100% 100%',
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative flex flex-col items-center justify-center h-64 overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/40 via-[var(--color-bg)] to-[var(--color-accent)]/40 bg-[length:200%_200%] bg-[0%_0%]"
      />
      <h2 className="text-xl font-bold text-[var(--color-text)] z-10">Gradient Shift</h2>
      <p className="text-sm text-[var(--color-text-muted)] z-10">Shifting gradient background</p>
    </div>
  )
}
