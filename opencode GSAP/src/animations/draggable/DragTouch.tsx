import { useRef, useCallback, useEffect } from 'react'
import gsap from 'gsap'

export default function DragTouch() {
  const ref = useRef<HTMLDivElement>(null)
  const state = useRef({ x: 80, y: 50, dragging: false, ox: 0, oy: 0, sx: 0, sy: 0 })

  const startDrag = useCallback((clientX: number, clientY: number) => {
    if (!ref.current) return
    state.current.dragging = true
    const rect = ref.current.getBoundingClientRect()
    const parent = ref.current.parentElement?.getBoundingClientRect()
    if (!parent) return
    state.current.ox = clientX - rect.left
    state.current.oy = clientY - rect.top
    state.current.sx = rect.left - parent.left
    state.current.sy = rect.top - parent.top
    gsap.to(ref.current, { scale: 1.1, duration: 0.2 })
  }, [])

  const moveDrag = useCallback((clientX: number, clientY: number) => {
    if (!state.current.dragging || !ref.current) return
    const parent = ref.current.parentElement?.getBoundingClientRect()
    if (!parent) return
    const x = Math.max(0, clientX - parent.left - state.current.ox)
    const y = Math.max(0, clientY - parent.top - state.current.oy)
    ref.current.style.left = `${Math.min(x, 200)}px`
    ref.current.style.top = `${Math.min(y, 80)}px`
  }, [])

  const endDrag = useCallback(() => {
    state.current.dragging = false
    if (ref.current) gsap.to(ref.current, { scale: 1, duration: 0.2 })
  }, [])

  const onMouseDown = useCallback((e: React.MouseEvent) => startDrag(e.clientX, e.clientY), [startDrag])
  const onMouseMove = useCallback((e: React.MouseEvent) => moveDrag(e.clientX, e.clientY), [moveDrag])
  const onMouseUp = useCallback(() => endDrag(), [endDrag])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      const t = e.touches[0]
      startDrag(t.clientX, t.clientY)
    }
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const t = e.touches[0]
      moveDrag(t.clientX, t.clientY)
    }
    const onTouchEnd = () => endDrag()

    el.addEventListener('touchstart', onTouchStart, { passive: false })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd)

    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [startDrag, moveDrag, endDrag])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4 select-none">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Drag Touch</h2>
      <div className="relative w-full h-36 overflow-hidden rounded-lg bg-[var(--color-surface)]/10" onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}>
        <div ref={ref} onMouseDown={onMouseDown}
          className="absolute w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white font-bold text-sm"
          style={{ left: '80px', top: '50px', zIndex: 10, touchAction: 'none' }}>
          Touch Me
        </div>
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Touch-friendly drag (works with mouse too)</p>
    </div>
  )
}
