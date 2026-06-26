import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Rotation() {
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, {
        rotation: 360,
        duration: 2,
        ease: 'none',
        repeat: -1
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Rotation</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Continuous rotation</p>
      <div className="flex items-center justify-center w-32 h-32">
        <div
          ref={boxRef}
          className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg flex items-center justify-center text-white font-bold"
        >
          R
        </div>
      </div>
    </div>
  )
}
