import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CursorHoverEffect() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const target = targetRef.current
    if (!cursor || !target) return

    const ctx = gsap.context(() => {
      gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 1 })
    })

    const move = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.15, ease: 'power2.out' })
    }

    const enter = () => gsap.to(cursor, { scale: 2.5, backgroundColor: 'var(--color-accent)', duration: 0.3, ease: 'power2.out' })
    const leave = () => gsap.to(cursor, { scale: 1, backgroundColor: 'var(--color-primary)', duration: 0.3, ease: 'power2.out' })

    window.addEventListener('mousemove', move)
    target.addEventListener('mouseenter', enter)
    target.addEventListener('mouseleave', leave)
    return () => {
      ctx.revert()
      window.removeEventListener('mousemove', move)
      target.removeEventListener('mouseenter', enter)
      target.removeEventListener('mouseleave', leave)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4 relative">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Cursor Hover Effect</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Cursor changes on hover over elements</p>
      <div
        ref={targetRef}
        className="w-48 h-24 rounded-xl bg-[var(--color-primary)] flex items-center justify-center text-white font-semibold cursor-pointer"
      >
        Hover Me
      </div>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 rounded-full bg-[var(--color-primary)] mix-blend-difference pointer-events-none z-50"
      />
    </div>
  )
}
