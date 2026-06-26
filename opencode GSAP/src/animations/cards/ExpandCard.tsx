import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ExpandCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const content = contentRef.current
    if (!card || !content) return

    const ctx = gsap.context(() => {
      gsap.set(content, { opacity: 0, height: 0 })
    })

    const enter = () => {
      gsap.to(card, { width: 280, height: 160, duration: 0.4, ease: 'power2.out' })
      gsap.to(content, { opacity: 1, height: 'auto', duration: 0.3, delay: 0.2, ease: 'power2.out' })
    }
    const leave = () => {
      gsap.to(content, { opacity: 0, height: 0, duration: 0.2, ease: 'power2.in' })
      gsap.to(card, { width: 192, height: 128, duration: 0.4, ease: 'power2.out' })
    }

    card.addEventListener('mouseenter', enter)
    card.addEventListener('mouseleave', leave)
    return () => {
      ctx.revert()
      card.removeEventListener('mouseenter', enter)
      card.removeEventListener('mouseleave', leave)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Expand Card</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Card expands on hover</p>
      <div
        ref={cardRef}
        className="w-48 h-32 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-4 cursor-pointer overflow-hidden"
      >
        <h3 className="text-[var(--color-text)] font-semibold">Expand</h3>
        <div ref={contentRef}>
          <p className="text-sm text-[var(--color-text-muted)] mt-2">Extra content revealed on hover!</p>
        </div>
      </div>
    </div>
  )
}
