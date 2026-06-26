const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function MagneticButton() {
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return

    const ctx = gsap.context(() => {})

    const move = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' })
    }
    const leave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: 'power2.out' })
    }

    btn.addEventListener('mousemove', move)
    btn.addEventListener('mouseleave', leave)
    return () => {
      ctx.revert()
      btn.removeEventListener('mousemove', move)
      btn.removeEventListener('mouseleave', leave)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Magnetic Button</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Button that follows cursor slightly</p>
      <button
        ref={btnRef}
        className="px-6 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] font-semibold cursor-pointer"
      >
        Follow Me
      </button>
    </div>
  )
}
`;export{e as default};
