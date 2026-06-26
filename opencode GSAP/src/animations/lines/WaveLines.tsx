import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function WaveLines() {
  const linesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const lines = linesRef.current
    if (!lines.length) return

    const ctx = gsap.context(() => {
      lines.forEach((line, i) => {
        gsap.to(line, {
          height: 10 + Math.random() * 30,
          duration: 0.8 + Math.random() * 0.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.08,
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
      <h2 className="text-xl font-bold text-[var(--color-text)]">Wave Lines</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Animated wave lines</p>
      <div className="flex items-center gap-1 h-20">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => setLineRef(el, i)}
            className="w-2 bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-accent)] rounded-full"
            style={{ height: '20px' }}
          />
        ))}
      </div>
    </div>
  )
}
