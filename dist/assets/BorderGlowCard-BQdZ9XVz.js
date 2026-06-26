const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function BorderGlowCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card || !glow) return

    const ctx = gsap.context(() => {
      gsap.set(glow, { opacity: 0 })
    })

    const enter = () => {
      gsap.to(glow, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.to(card, { borderColor: 'var(--color-primary)', duration: 0.3 })
    }
    const leave = () => {
      gsap.to(glow, { opacity: 0, duration: 0.3, ease: 'power2.out' })
      gsap.to(card, { borderColor: 'var(--color-border)', duration: 0.3 })
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
      <h2 className="text-xl font-bold text-[var(--color-text)]">Border Glow Card</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Card with glowing border on hover</p>
      <div className="relative">
        <div
          ref={glowRef}
          className="absolute -inset-1 rounded-xl bg-[var(--color-primary)] blur-md"
        />
        <div
          ref={cardRef}
          className="relative w-48 h-32 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-4 cursor-pointer"
        >
          <h3 className="text-[var(--color-text)] font-semibold">Glow Border</h3>
          <p className="text-sm text-[var(--color-text-muted)] mt-2">Hover me</p>
        </div>
      </div>
    </div>
  )
}
`;export{e as default};
