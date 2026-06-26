import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ShakeButton() {
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return

    const ctx = gsap.context(() => {})

    const shake = () => {
      gsap.to(btn, {
        x: [0, -8, 8, -6, 6, -3, 3, 0],
        duration: 0.5,
        ease: 'power2.out',
      })
    }

    btn.addEventListener('click', shake)
    return () => {
      ctx.revert()
      btn.removeEventListener('click', shake)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Shake Button</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Button that shakes on click</p>
      <button
        ref={btnRef}
        className="px-6 py-3 rounded-xl bg-[var(--color-danger)] text-white font-semibold cursor-pointer"
      >
        Click to Shake
      </button>
    </div>
  )
}
