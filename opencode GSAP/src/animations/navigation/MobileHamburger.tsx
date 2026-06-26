import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function MobileHamburger() {
  const btnRef = useRef<HTMLButtonElement>(null)
  const topRef = useRef<HTMLDivElement>(null)
  const midRef = useRef<HTMLDivElement>(null)
  const botRef = useRef<HTMLDivElement>(null)
  const openRef = useRef(false)

  useEffect(() => {
    const top = topRef.current
    const mid = midRef.current
    const bot = botRef.current
    const btn = btnRef.current
    if (!top || !mid || !bot || !btn) return

    const ctx = gsap.context(() => {})

    const toggle = () => {
      if (openRef.current) {
        gsap.to(top, { rotate: 0, y: 0, duration: 0.3, ease: 'power2.out' })
        gsap.to(mid, { opacity: 1, scaleX: 1, duration: 0.2, ease: 'power2.out' })
        gsap.to(bot, { rotate: 0, y: 0, duration: 0.3, ease: 'power2.out' })
      } else {
        gsap.to(top, { rotate: 45, y: 6, duration: 0.3, ease: 'power2.out' })
        gsap.to(mid, { opacity: 0, scaleX: 0, duration: 0.2, ease: 'power2.out' })
        gsap.to(bot, { rotate: -45, y: -6, duration: 0.3, ease: 'power2.out' })
      }
      openRef.current = !openRef.current
    }

    btn.addEventListener('click', toggle)
    return () => {
      ctx.revert()
      btn.removeEventListener('click', toggle)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Mobile Hamburger</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Hamburger to X animation</p>
      <button
        ref={btnRef}
        className="w-12 h-12 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col items-center justify-center gap-1 cursor-pointer"
      >
        <div ref={topRef} className="w-6 h-[2px] bg-[var(--color-text)] rounded-full" />
        <div ref={midRef} className="w-6 h-[2px] bg-[var(--color-text)] rounded-full" />
        <div ref={botRef} className="w-6 h-[2px] bg-[var(--color-text)] rounded-full" />
      </button>
    </div>
  )
}
