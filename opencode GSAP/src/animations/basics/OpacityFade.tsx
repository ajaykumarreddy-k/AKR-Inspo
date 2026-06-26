import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function OpacityFade() {
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, {
        opacity: 0.2,
        duration: 1.2,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Opacity Fade</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Fading in and out</p>
      <div className="flex items-center justify-center w-32 h-32">
        <div
          ref={boxRef}
          className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg flex items-center justify-center text-white font-bold"
        >
          Fade
        </div>
      </div>
    </div>
  )
}
