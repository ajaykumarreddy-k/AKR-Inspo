import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function BorderDrawButton() {
  const btnRef = useRef<HTMLButtonElement>(null)
  const topRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([topRef.current, rightRef.current, bottomRef.current, leftRef.current], { scale: 0 })
    })

    const enter = () => {
      gsap.to(topRef.current, { scaleX: 1, duration: 0.2, ease: 'power2.out', transformOrigin: 'left center' })
      gsap.to(rightRef.current, { scaleY: 1, duration: 0.2, ease: 'power2.out', transformOrigin: 'top center', delay: 0.15 })
      gsap.to(bottomRef.current, { scaleX: 1, duration: 0.2, ease: 'power2.out', transformOrigin: 'right center', delay: 0.3 })
      gsap.to(leftRef.current, { scaleY: 1, duration: 0.2, ease: 'power2.out', transformOrigin: 'bottom center', delay: 0.45 })
    }
    const leave = () => {
      gsap.to([topRef.current, rightRef.current, bottomRef.current, leftRef.current], { scale: 0, duration: 0.15, ease: 'power2.in' })
    }

    const btn = btnRef.current
    if (!btn) return () => ctx.revert()
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
      <h2 className="text-xl font-bold text-[var(--color-text)]">Border Draw Button</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Button with border drawing on hover</p>
      <button
        ref={btnRef}
        className="relative px-6 py-3 rounded-xl bg-[var(--color-surface)] text-[var(--color-text)] font-semibold cursor-pointer"
      >
        <div ref={topRef} className="absolute top-0 left-0 h-[2px] bg-[var(--color-primary)] w-full scale-x-0 origin-left" />
        <div ref={rightRef} className="absolute top-0 right-0 w-[2px] bg-[var(--color-accent)] h-full scale-y-0 origin-top" />
        <div ref={bottomRef} className="absolute bottom-0 right-0 h-[2px] bg-[var(--color-primary)] w-full scale-x-0 origin-right" />
        <div ref={leftRef} className="absolute bottom-0 left-0 w-[2px] bg-[var(--color-accent)] h-full scale-y-0 origin-bottom" />
        Hover Me
      </button>
    </div>
  )
}
