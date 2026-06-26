import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ProgressLoader() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const ctx = gsap.context(() => {
      gsap.to(bar, {
        scaleX: 1,
        duration: 3,
        repeat: -1,
        ease: 'power2.inOut',
        transformOrigin: 'left center',
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Progress Loader</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Linear progress bar loader</p>
      <div className="w-48 h-2 rounded-full bg-[var(--color-border)] overflow-hidden">
        <div
          ref={barRef}
          className="w-full h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] scale-x-0 origin-left"
        />
      </div>
      <p className="text-xs text-[var(--color-text-muted)]">Loading...</p>
    </div>
  )
}
