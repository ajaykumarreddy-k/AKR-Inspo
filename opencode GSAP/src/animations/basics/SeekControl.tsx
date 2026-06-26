import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SeekControl() {
  const boxRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const pctRef = useRef<HTMLSpanElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      tweenRef.current = gsap.to(boxRef.current, {
        x: 150,
        duration: 2,
        ease: 'power2.inOut',
        paused: true
      })
    })

    return () => ctx.revert()
  }, [])

  const handleSeek = () => {
    const val = parseFloat(inputRef.current?.value || '0')
    const pct = val / 100
    if (tweenRef.current) {
      tweenRef.current.progress(pct).pause()
    }
    if (pctRef.current) pctRef.current.textContent = `${val}%`
  }

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Seek Control</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Jump to specific progress point</p>
      <div className="relative w-72 h-20 flex items-center">
        <div
          ref={boxRef}
          className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg flex items-center justify-center text-white font-bold"
        >
          Seek
        </div>
      </div>
      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="range"
          min="0"
          max="100"
          defaultValue="0"
          onChange={handleSeek}
          className="w-40 accent-[var(--color-primary)]"
        />
        <span ref={pctRef} className="text-xs text-[var(--color-text-muted)] w-10">0%</span>
      </div>
    </div>
  )
}
