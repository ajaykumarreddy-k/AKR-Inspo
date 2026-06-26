import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function MoveY() {
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, {
        y: -60,
        duration: 1,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Move Y</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Vertical movement</p>
      <div className="relative h-28 w-20 flex flex-col items-center justify-center border-t-2 border-b-2 border-[var(--color-border)]">
        <div
          ref={boxRef}
          className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg flex items-center justify-center text-white font-bold"
        >
          Y
        </div>
      </div>
    </div>
  )
}
