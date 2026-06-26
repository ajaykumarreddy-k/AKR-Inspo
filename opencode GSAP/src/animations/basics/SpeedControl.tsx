import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SpeedControl() {
  const boxRef = useRef<HTMLDivElement>(null)
  const speedRef = useRef<HTMLSpanElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      tweenRef.current = gsap.to(boxRef.current, {
        x: 150,
        duration: 2,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
      })
    })

    return () => ctx.revert()
  }, [])

  const setSpeed = (s: number) => {
    if (tweenRef.current) {
      tweenRef.current.timeScale(s)
      if (speedRef.current) speedRef.current.textContent = `${s}x`
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Speed Control</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Speed up / slow down</p>
      <div className="relative w-72 h-20 flex items-center">
        <div
          ref={boxRef}
          className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg flex items-center justify-center text-white font-bold"
        >
          Spd
        </div>
      </div>
      <div className="flex gap-2 items-center">
        {[0.25, 0.5, 1, 2, 4].map((s) => (
          <button
            key={s}
            onClick={() => setSpeed(s)}
            className="px-2.5 py-1 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-xs hover:border-[var(--color-primary)] transition-colors"
          >
            {s}x
          </button>
        ))}
        <span ref={speedRef} className="text-xs text-[var(--color-accent)] font-semibold ml-1">1x</span>
      </div>
    </div>
  )
}
