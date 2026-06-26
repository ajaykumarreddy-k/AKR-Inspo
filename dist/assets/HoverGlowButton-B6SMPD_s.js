const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function HoverGlowButton() {
  const btnRef = useRef<HTMLButtonElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const btn = btnRef.current
    const glow = glowRef.current
    if (!btn || !glow) return

    const ctx = gsap.context(() => {
      gsap.set(glow, { scale: 0, opacity: 0 })
    })

    const enter = () => {
      gsap.to(glow, { scale: 1.5, opacity: 0.6, duration: 0.3, ease: 'power2.out' })
      gsap.to(btn, { boxShadow: '0 0 30px var(--color-primary)', duration: 0.3, ease: 'power2.out' })
    }
    const leave = () => {
      gsap.to(glow, { scale: 0, opacity: 0, duration: 0.3, ease: 'power2.in' })
      gsap.to(btn, { boxShadow: '0 0 0px var(--color-primary)', duration: 0.3, ease: 'power2.in' })
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
      <h2 className="text-xl font-bold text-[var(--color-text)]">Hover Glow Button</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Button with glow effect on hover</p>
      <div className="relative">
        <div
          ref={glowRef}
          className="absolute inset-0 rounded-xl bg-[var(--color-primary)] blur-xl"
        />
        <button
          ref={btnRef}
          className="relative px-6 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] font-semibold cursor-pointer transition-colors hover:bg-[var(--color-surface-2)]"
        >
          Hover Me
        </button>
      </div>
    </div>
  )
}
`;export{e as default};
