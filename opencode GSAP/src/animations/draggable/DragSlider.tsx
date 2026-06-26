import { useState, useRef, useCallback } from 'react'
import gsap from 'gsap'

export default function DragSlider() {
  const [value, setValue] = useState(50)
  const trackRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const updateFromMouse = (clientX: number) => {
    const track = trackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    setValue(Math.round(pct))
    if (thumbRef.current) {
      gsap.set(thumbRef.current, { left: `${pct}%` })
    }
  }

  const onDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true
    updateFromMouse(e.clientX)
  }, [])

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current) return
    updateFromMouse(e.clientX)
  }, [])

  const onUp = useCallback(() => { dragging.current = false }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4 select-none">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Drag Slider</h2>
      <div className="w-full px-4">
        <div className="text-center text-4xl font-bold text-[var(--color-text)] mb-2">{value}%</div>
        <div ref={trackRef} onMouseDown={onDown} className="relative w-full h-2 rounded-full bg-[var(--color-surface)] cursor-pointer"
          onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}>
          <div className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"
            style={{ width: `${value}%` }} />
          <div ref={thumbRef} onMouseDown={onDown}
            className="absolute top-1/2 -translate-y-1/2 -ml-3 w-6 h-6 rounded-full bg-white border-2 border-[var(--color-primary)] shadow-md cursor-grab active:cursor-grabbing"
            style={{ left: `${value}%` }} />
        </div>
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Drag thumb to adjust value</p>
    </div>
  )
}
