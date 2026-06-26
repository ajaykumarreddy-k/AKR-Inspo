const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function HoverLiftCard() {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const ctx = gsap.context(() => {})

    const enter = () => {
      gsap.to(card, { y: -12, scale: 1.02, boxShadow: '0 20px 60px rgba(99,102,241,0.2)', duration: 0.3, ease: 'power2.out' })
    }
    const leave = () => {
      gsap.to(card, { y: 0, scale: 1, boxShadow: '0 4px 20px rgba(0,0,0,0.1)', duration: 0.3, ease: 'power2.out' })
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
      <h2 className="text-xl font-bold text-[var(--color-text)]">Hover Lift Card</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Card lifts on hover</p>
      <div
        ref={cardRef}
        className="w-48 h-32 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-4 cursor-pointer"
      >
        <h3 className="text-[var(--color-text)] font-semibold">Lift Card</h3>
        <p className="text-sm text-[var(--color-text-muted)] mt-2">Hover to lift</p>
      </div>
    </div>
  )
}
`;export{e as default};
