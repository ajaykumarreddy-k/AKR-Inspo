import { useState, useRef, useCallback } from 'react'
import gsap from 'gsap'

export default function DragKnob() {
  const [value, setValue] = useState(0)
  const knobRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const startAngle = useRef(0)
  const startVal = useRef(0)

  const onDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true
    const rect = knobRef.current?.getBoundingClientRect()
    if (!rect) return
    startAngle.current = Math.atan2(e.clientY - (rect.top + rect.height / 2), e.clientX - (rect.left + rect.width / 2))
    startVal.current = value
  }, [value])

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current || !knobRef.current) return
    const rect = knobRef.current.getBoundingClientRect()
    const angle = Math.atan2(e.clientY - (rect.top + rect.height / 2), e.clientX - (rect.left + rect.width / 2))
    let diff = angle - startAngle.current
    if (diff > Math.PI) diff -= 2 * Math.PI
    if (diff < -Math.PI) diff += 2 * Math.PI
    const newVal = Math.max(0, Math.min(100, startVal.current + diff * (100 / (2 * Math.PI)) * 2))
    setValue(Math.round(newVal))
    gsap.to(knobRef.current, { rotation: (newVal / 100) * 270 - 135, duration: 0.05, overwrite: true })
  }, [])

  const onUp = useCallback(() => { dragging.current = false }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4 select-none">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Drag Knob</h2>
      <div className="relative w-28 h-28" onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-surface)" strokeWidth="6" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-accent)" strokeWidth="6"
            strokeDasharray={`${(value / 100) * 264}`} strokeDashoffset="0" strokeLinecap="round"
            transform="rotate(-135 50 50)" />
        </svg>
        <div ref={knobRef} onMouseDown={onDown}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-bg)] border-2 border-[var(--color-border)] shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ transform: `translate(-50%, -50%) rotate(${(value / 100) * 270 - 135}deg)` }}>
          <div className="w-1 h-5 rounded-full bg-[var(--color-accent)] absolute -top-1" />
        </div>
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Value: {value}</p>
    </div>
  )
}
