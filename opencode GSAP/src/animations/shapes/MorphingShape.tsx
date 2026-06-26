import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function MorphingShape() {
  const shapeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const shape = shapeRef.current
    if (!shape) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, yoyo: true })
      tl.to(shape, {
        borderRadius: '50%',
        rotation: 180,
        scale: 1.2,
        duration: 1.5,
        ease: 'power2.inOut',
      })
      tl.to(shape, {
        borderRadius: '8px',
        rotation: 0,
        scale: 1,
        duration: 1.5,
        ease: 'power2.inOut',
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Morphing Shape</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Shape morphing between forms</p>
      <div
        ref={shapeRef}
        className="w-20 h-20 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]"
      />
    </div>
  )
}
