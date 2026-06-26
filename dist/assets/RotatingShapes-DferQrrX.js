const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function RotatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null)
  const shapesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const shapes = shapesRef.current
    if (!shapes.length) return

    const ctx = gsap.context(() => {
      shapes.forEach((shape, i) => {
        gsap.to(shape, {
          rotation: 360,
          duration: 3 + i * 1.5,
          repeat: -1,
          ease: 'linear',
        })
      })
    })

    return () => ctx.revert()
  }, [])

  const setShapeRef = (el: HTMLDivElement | null, i: number) => {
    if (el) shapesRef.current[i] = el
  }

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Rotating Shapes</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Geometric shapes rotating</p>
      <div ref={containerRef} className="flex gap-4 items-center">
        <div
          ref={(el) => setShapeRef(el, 0)}
          className="w-12 h-12 rounded-md bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]"
        />
        <div
          ref={(el) => setShapeRef(el, 1)}
          className="w-12 h-12 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]"
          style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
        />
        <div
          ref={(el) => setShapeRef(el, 2)}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]"
        />
      </div>
    </div>
  )
}
`;export{e as default};
