import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function TranslateZ() {
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, {
        z: 200,
        scale: 1.5,
        duration: 1.5,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Translate Z</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Z-axis 3D movement</p>
      <div className="flex items-center justify-center w-32 h-32" style={{ perspective: '500px' }}>
        <div
          ref={boxRef}
          className="w-20 h-20 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg flex items-center justify-center text-white font-bold"
          style={{ transformStyle: 'preserve-3d' }}
        >
          Z
        </div>
      </div>
    </div>
  )
}
