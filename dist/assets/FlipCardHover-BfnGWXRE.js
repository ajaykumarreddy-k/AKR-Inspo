const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function FlipCardHover() {
  const cardRef = useRef<HTMLDivElement>(null)
  const frontRef = useRef<HTMLDivElement>(null)
  const backRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const back = backRef.current
    if (!card || !back) return

    const ctx = gsap.context(() => {
      gsap.set(back, { rotationY: 180 })
    })

    const enter = () => {
      gsap.to(card, { rotationY: 180, duration: 0.6, ease: 'power2.inOut', transformPerspective: 800 })
    }
    const leave = () => {
      gsap.to(card, { rotationY: 0, duration: 0.6, ease: 'power2.inOut' })
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
      <h2 className="text-xl font-bold text-[var(--color-text)]">Flip Card</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Card flips on hover</p>
      <div
        ref={cardRef}
        className="relative w-48 h-32 cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          ref={frontRef}
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] p-4 flex items-center justify-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <h3 className="text-white font-bold">Front</h3>
        </div>
        <div
          ref={backRef}
          className="absolute inset-0 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-4 flex items-center justify-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <h3 className="text-[var(--color-text)] font-bold">Back Side</h3>
        </div>
      </div>
    </div>
  )
}
`;export{e as default};
