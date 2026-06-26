import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function TiltCard() {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const ctx = gsap.context(() => {})

    const move = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      gsap.to(card, {
        rotationX: -y * 20,
        rotationY: x * 20,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 800,
      })
    }
    const leave = () => {
      gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.4, ease: 'power2.out' })
    }

    card.addEventListener('mousemove', move)
    card.addEventListener('mouseleave', leave)
    return () => {
      ctx.revert()
      card.removeEventListener('mousemove', move)
      card.removeEventListener('mouseleave', leave)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Tilt Card</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Card tilts with mouse position</p>
      <div
        ref={cardRef}
        className="w-48 h-32 rounded-xl bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-2)] border border-[var(--color-border)] p-4 cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <h3 className="text-[var(--color-text)] font-semibold">3D Tilt</h3>
        <p className="text-sm text-[var(--color-text-muted)] mt-2">Move mouse</p>
      </div>
    </div>
  )
}
