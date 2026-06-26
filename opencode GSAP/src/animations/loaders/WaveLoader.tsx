import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function WaveLoader() {
  const barsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const bars = barsRef.current
    if (!bars.length) return

    const ctx = gsap.context(() => {
      bars.forEach((bar, i) => {
        gsap.to(bar, {
          scaleY: 0.3,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: i * 0.1,
          transformOrigin: 'bottom center',
        })
      })
    })

    return () => ctx.revert()
  }, [])

  const setBarRef = (el: HTMLDivElement | null, i: number) => {
    if (el) barsRef.current[i] = el
  }

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Wave Loader</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Wave bars loader</p>
      <div className="flex items-end gap-1 h-10">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            ref={(el) => setBarRef(el, i)}
            className="w-3 rounded-full bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-accent)]"
            style={{ height: '40px' }}
          />
        ))}
      </div>
    </div>
  )
}
