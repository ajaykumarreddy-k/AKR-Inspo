import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function GradientShiftButton() {
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return

    const ctx = gsap.context(() => {
      gsap.set(btn, { backgroundPosition: '0% 50%' })
    })

    const enter = () => {
      gsap.to(btn, { backgroundPosition: '100% 50%', duration: 0.4, ease: 'power2.out' })
    }
    const leave = () => {
      gsap.to(btn, { backgroundPosition: '0% 50%', duration: 0.4, ease: 'power2.out' })
    }

    btn.addEventListener('mouseenter', enter)
    btn.addEventListener('mouseleave', leave)
    return () => {
      ctx.revert()
      btn.removeEventListener('mouseenter', enter)
      btn.removeEventListener('mouseleave', leave)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Gradient Shift Button</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Button with shifting gradient on hover</p>
      <button
        ref={btnRef}
        className="px-6 py-3 rounded-xl text-white font-semibold cursor-pointer bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-primary)] bg-[length:200%_100%]"
      >
        Hover Me
      </button>
    </div>
  )
}
