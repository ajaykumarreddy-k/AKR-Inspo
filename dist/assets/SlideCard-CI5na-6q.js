const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SlideCard() {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const ctx = gsap.context(() => {
      gsap.set(card, { x: -100, opacity: 0 })
    })

    gsap.to(card, { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.2 })

    const enter = () => {
      gsap.to(card, { x: 20, duration: 0.3, ease: 'power2.out' })
    }
    const leave = () => {
      gsap.to(card, { x: 0, duration: 0.3, ease: 'power2.out' })
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
      <h2 className="text-xl font-bold text-[var(--color-text)]">Slide Card</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Card slides in from left</p>
      <div
        ref={cardRef}
        className="w-48 h-32 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-4 cursor-pointer"
      >
        <h3 className="text-[var(--color-text)] font-semibold">Slide In</h3>
        <p className="text-sm text-[var(--color-text-muted)] mt-2">Hover to shift</p>
      </div>
    </div>
  )
}
`;export{e as default};
