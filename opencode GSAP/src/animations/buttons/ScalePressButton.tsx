import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ScalePressButton() {
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return

    const ctx = gsap.context(() => {})

    const down = () => gsap.to(btn, { scale: 0.92, duration: 0.1, ease: 'power2.in' })
    const up = () => gsap.to(btn, { scale: 1, duration: 0.15, ease: 'power2.out' })

    btn.addEventListener('mousedown', down)
    btn.addEventListener('mouseup', up)
    btn.addEventListener('mouseleave', up)
    return () => {
      ctx.revert()
      btn.removeEventListener('mousedown', down)
      btn.removeEventListener('mouseup', up)
      btn.removeEventListener('mouseleave', up)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Scale Press Button</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Button that scales on press</p>
      <button
        ref={btnRef}
        className="px-6 py-3 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white font-semibold cursor-pointer"
      >
        Press Me
      </button>
    </div>
  )
}
