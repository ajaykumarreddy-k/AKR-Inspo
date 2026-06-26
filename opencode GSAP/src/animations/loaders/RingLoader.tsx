import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function RingLoader() {
  const ringRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    const ring = ringRef.current
    if (!ring) return

    const ctx = gsap.context(() => {
      gsap.to(ring, {
        strokeDashoffset: 0,
        duration: 2,
        repeat: -1,
        ease: 'linear',
      })
      gsap.to(ring, {
        rotation: 360,
        duration: 2,
        repeat: -1,
        ease: 'linear',
        transformOrigin: '50% 50%',
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Ring Loader</h2>
      <p className="text-sm text-[var(--color-text-muted)]">SVG ring spinner</p>
      <svg className="w-12 h-12" viewBox="0 0 50 50">
        <circle
          className="stroke-[var(--color-border)] fill-none"
          cx="25"
          cy="25"
          r="20"
          strokeWidth="4"
        />
        <circle
          ref={ringRef}
          className="stroke-[var(--color-primary)] fill-none"
          cx="25"
          cy="25"
          r="20"
          strokeWidth="4"
          strokeDasharray="125.6"
          strokeDashoffset="125.6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
