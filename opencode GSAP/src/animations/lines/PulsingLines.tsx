import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function PulsingLines() {
  const linesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const lines = linesRef.current
    if (!lines.length) return

    const ctx = gsap.context(() => {
      lines.forEach((line, i) => {
        gsap.to(line, {
          width: '100%',
          opacity: 0.2,
          duration: 1.5,
          repeat: -1,
          ease: 'power2.out',
          delay: i * 0.3,
        })
      })
    })

    return () => ctx.revert()
  }, [])

  const setLineRef = (el: HTMLDivElement | null, i: number) => {
    if (el) linesRef.current[i] = el
  }

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Pulsing Lines</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Pulsing line animation</p>
      <div className="w-48 h-16 flex flex-col justify-center gap-2 bg-[var(--color-surface)] rounded-xl p-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-full h-[2px] bg-[var(--color-border)] rounded-full overflow-hidden">
            <div
              ref={(el) => setLineRef(el, i)}
              className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-full"
              style={{ width: '0%' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
