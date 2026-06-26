import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ClickRippleButton() {
  const btnRef = useRef<HTMLButtonElement>(null)
  const rippleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const btn = btnRef.current
    const ripple = rippleRef.current
    if (!btn || !ripple) return

    const ctx = gsap.context(() => {
      gsap.set(ripple, { scale: 0, opacity: 0.5 })
    })

    const handleClick = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      gsap.set(ripple, { x, y, scale: 0, opacity: 0.5 })
      gsap.to(ripple, {
        scale: 4,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
    }

    btn.addEventListener('click', handleClick)
    return () => {
      ctx.revert()
      btn.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Click Ripple Button</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Button with click ripple effect</p>
      <button
        ref={btnRef}
        className="relative px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-semibold cursor-pointer overflow-hidden"
      >
        <div
          ref={rippleRef}
          className="absolute w-8 h-8 rounded-full bg-white/40 pointer-events-none"
        />
        <span className="relative z-10">Click Me</span>
      </button>
    </div>
  )
}
