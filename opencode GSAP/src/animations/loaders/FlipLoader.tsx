import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function FlipLoader() {
  const squaresRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const squares = squaresRef.current
    if (!squares.length) return

    const ctx = gsap.context(() => {
      squares.forEach((square, i) => {
        gsap.to(square, {
          rotationX: 180,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
          delay: i * 0.2,
          transformPerspective: 400,
        })
      })
    })

    return () => ctx.revert()
  }, [])

  const setSquareRef = (el: HTMLDivElement | null, i: number) => {
    if (el) squaresRef.current[i] = el
  }

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Flip Loader</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Flipping squares loader</p>
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            ref={(el) => setSquareRef(el, i)}
            className="w-8 h-8 rounded-md bg-[var(--color-primary)]"
          />
        ))}
      </div>
    </div>
  )
}
