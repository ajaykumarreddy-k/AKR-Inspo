import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function TransformAll() {
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, {
        x: 100,
        y: -30,
        rotation: 180,
        scale: 1.5,
        skewX: 15,
        opacity: 0.7,
        duration: 2,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Transform All</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Combining multiple transforms</p>
      <div className="flex items-center justify-center w-32 h-32">
        <div
          ref={boxRef}
          className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg flex items-center justify-center text-white font-bold"
        >
          All
        </div>
      </div>
    </div>
  )
}
