import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function PulseButton() {
  const btnRef = useRef<HTMLButtonElement>(null)
  const ring1Ref = useRef<HTMLDivElement>(null)
  const ring2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ring1 = ring1Ref.current
    const ring2 = ring2Ref.current
    if (!ring1 || !ring2) return

    const ctx = gsap.context(() => {
      gsap.set([ring1, ring2], { scale: 1, opacity: 0.5 })
    })

    const pulse = () => {
      gsap.fromTo(ring1,
        { scale: 1, opacity: 0.5 },
        { scale: 2, opacity: 0, duration: 1, ease: 'power2.out', repeat: -1 }
      )
      gsap.fromTo(ring2,
        { scale: 1, opacity: 0.5 },
        { scale: 2, opacity: 0, duration: 1, ease: 'power2.out', repeat: -1, delay: 0.3 }
      )
    }

    pulse()

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Pulse Button</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Button with pulsing ring</p>
      <div className="relative">
        <div ref={ring1Ref} className="absolute inset-0 rounded-xl border-2 border-[var(--color-primary)]" />
        <div ref={ring2Ref} className="absolute inset-0 rounded-xl border-2 border-[var(--color-primary)]" />
        <button
          ref={btnRef}
          className="relative px-6 py-3 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white font-semibold cursor-pointer"
        >
          Pulse
        </button>
      </div>
    </div>
  )
}
