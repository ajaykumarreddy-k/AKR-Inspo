import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CursorText() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const text = textRef.current
    if (!cursor || !text) return

    const ctx = gsap.context(() => {
      gsap.set(cursor, { xPercent: -50, yPercent: -50 })
      gsap.set(text, { opacity: 0, scale: 0.5 })
    })

    let showTimer: ReturnType<typeof setTimeout>

    const move = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX + 20, y: e.clientY + 20, duration: 0.15, ease: 'power2.out' })
      clearTimeout(showTimer)
      gsap.to(text, { opacity: 1, scale: 1, duration: 0.2, ease: 'back.out(2)' })
      showTimer = setTimeout(() => {
        gsap.to(text, { opacity: 0, scale: 0.5, duration: 0.2, ease: 'power2.in' })
      }, 2000)
    }

    window.addEventListener('mousemove', move)
    return () => {
      ctx.revert()
      window.removeEventListener('mousemove', move)
      clearTimeout(showTimer)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4 relative">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Cursor Text</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Cursor with text following</p>
      <div className="w-48 h-24 rounded-xl bg-[var(--color-surface)] border border-dashed border-[var(--color-border)] flex items-center justify-center text-sm text-[var(--color-text-muted)]">
        Move mouse here
      </div>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 flex items-center gap-1 pointer-events-none z-50"
      >
        <div className="w-3 h-3 rounded-full bg-[var(--color-accent)]" />
        <span ref={textRef} className="text-xs font-medium text-[var(--color-accent)] whitespace-nowrap">
          Hello!
        </span>
      </div>
    </div>
  )
}
