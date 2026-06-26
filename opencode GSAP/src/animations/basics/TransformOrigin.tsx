import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function TransformOrigin() {
  const containerRef = useRef<HTMLDivElement>(null)

  const origins = [
    { label: 'center', cls: 'from-cyan-500 to-blue-600' },
    { label: 'top left', cls: 'from-purple-500 to-pink-600' },
    { label: 'bottom right', cls: 'from-amber-500 to-orange-600' }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const boxes = containerRef.current?.querySelectorAll('.origin-box')
      if (boxes) {
        boxes.forEach((box, i) => {
          gsap.to(box, {
            rotation: 45,
            scale: 1.3,
            duration: 1.2,
            ease: 'power2.inOut',
            repeat: -1,
            yoyo: true,
            transformOrigin: origins[i].label
          })
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Transform Origin</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Different transform origins</p>
      <div ref={containerRef} className="flex gap-6">
        {origins.map((o) => (
          <div key={o.label} className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center">
              <div className={`origin-box w-8 h-8 rounded bg-gradient-to-br ${o.cls} shadow`} />
            </div>
            <span className="text-[10px] text-[var(--color-text-muted)]">{o.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
