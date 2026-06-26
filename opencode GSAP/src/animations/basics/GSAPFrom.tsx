import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function GSAPFrom() {
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(boxRef.current, {
        x: 200,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
        repeat: -1,
        yoyo: true
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">gsap.from()</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Animates from defined start values to current state</p>
      <div className="relative w-72 h-20 flex items-center">
        <div
          ref={boxRef}
          className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg flex items-center justify-center text-white font-bold"
        >
          from
        </div>
      </div>
    </div>
  )
}
