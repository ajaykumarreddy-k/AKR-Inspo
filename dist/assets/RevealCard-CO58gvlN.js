const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function RevealCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const overlay = overlayRef.current
    const content = contentRef.current
    if (!card || !overlay || !content) return

    const ctx = gsap.context(() => {
      gsap.set(content, { opacity: 0, y: 20 })
      gsap.set(overlay, { y: '100%' })
    })

    const enter = () => {
      gsap.to(overlay, { y: '0%', duration: 0.4, ease: 'power2.out' })
      gsap.to(content, { opacity: 1, y: 0, duration: 0.3, delay: 0.2, ease: 'power2.out' })
    }
    const leave = () => {
      gsap.to(overlay, { y: '100%', duration: 0.4, ease: 'power2.in' })
      gsap.to(content, { opacity: 0, y: 20, duration: 0.2, ease: 'power2.in' })
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
      <h2 className="text-xl font-bold text-[var(--color-text)]">Reveal Card</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Card with content reveal on hover</p>
      <div
        ref={cardRef}
        className="relative w-48 h-32 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] cursor-pointer overflow-hidden"
      >
        <div className="p-4">
          <h3 className="text-[var(--color-text)] font-semibold">Reveal</h3>
        </div>
        <div ref={overlayRef} className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-accent)]" />
        <div ref={contentRef} className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-white text-sm font-medium">Content revealed!</p>
        </div>
      </div>
    </div>
  )
}
`;export{e as default};
