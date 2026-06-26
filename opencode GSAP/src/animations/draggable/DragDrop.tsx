import { useState, useRef, useCallback } from 'react'
import gsap from 'gsap'

export default function DragDrop() {
  const [dropped, setDropped] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const zoneRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })
  const startPos = useRef({ x: 0, y: 0 })

  const onDown = useCallback((e: React.MouseEvent) => {
    if (dropped) return
    dragging.current = true
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      startPos.current = { x: rect.left, y: rect.top }
    }
  }, [dropped])

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current || !ref.current) return
    const parent = ref.current.parentElement?.getBoundingClientRect()
    if (!parent) return
    ref.current.style.left = `${e.clientX - parent.left - offset.current.x}px`
    ref.current.style.top = `${e.clientY - parent.top - offset.current.y}px`
  }, [])

  const onUp = useCallback(() => {
    if (!dragging.current) return
    dragging.current = false
    const zone = zoneRef.current?.getBoundingClientRect()
    const el = ref.current?.getBoundingClientRect()
    if (zone && el) {
      const overlap = !(el.right < zone.left || el.left > zone.right || el.bottom < zone.top || el.top > zone.bottom)
      if (overlap) {
        setDropped(true)
        gsap.to(ref.current, {
          left: zone.left - (ref.current!.parentElement?.getBoundingClientRect()?.left || 0) + zone.width / 2 - 25,
          top: zone.top - (ref.current!.parentElement?.getBoundingClientRect()?.top || 0) + zone.height / 2 - 25,
          scale: 0.6,
          duration: 0.3,
          ease: 'back.out(2)',
        })
        return
      }
    }
    gsap.to(ref.current, { left: 20, top: '50%', duration: 0.4, ease: 'back.out(2)' })
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4 select-none">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Drag & Drop</h2>
      <div className="relative w-full h-36 rounded-lg bg-[var(--color-surface)]/10" onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}>
        <div ref={zoneRef} className="absolute right-4 top-1/2 -translate-y-1/2 w-20 h-20 rounded-xl border-2 border-dashed border-[var(--color-accent)]/50 flex items-center justify-center text-[var(--color-text-muted)] text-xs">
          {dropped ? '✓ Dropped!' : 'Drop Zone'}
        </div>
        <div ref={ref} onMouseDown={onDown}
          className="absolute w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white font-bold text-sm"
          style={{ left: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
          {dropped ? '✓' : 'Drag'}
        </div>
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Drag item into drop zone</p>
    </div>
  )
}
