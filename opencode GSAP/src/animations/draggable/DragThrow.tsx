import { useRef, useCallback, useEffect } from 'react'
import gsap from 'gsap'

export default function DragThrow() {
  const ref = useRef<HTMLDivElement>(null)
  const state = useRef({ x: 80, y: 50, vx: 0, vy: 0, dragging: false, prevX: 0, prevY: 0, time: 0 })

  const onDown = useCallback((e: React.MouseEvent) => {
    state.current.dragging = true
    state.current.prevX = e.clientX
    state.current.prevY = e.clientY
    state.current.time = Date.now()
    state.current.vx = 0
    state.current.vy = 0
    gsap.killTweensOf(ref.current)
  }, [])

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!state.current.dragging || !ref.current) return
    const dx = e.clientX - state.current.prevX
    const dy = e.clientY - state.current.prevY
    const now = Date.now()
    const dt = now - state.current.time
    state.current.vx = dx / (dt || 1) * 16
    state.current.vy = dy / (dt || 1) * 16
    state.current.prevX = e.clientX
    state.current.prevY = e.clientY
    state.current.time = now
    state.current.x += dx
    state.current.y += dy
    ref.current.style.left = `${state.current.x}px`
    ref.current.style.top = `${state.current.y}px`
  }, [])

  const onUp = useCallback(() => {
    state.current.dragging = false
    if (Math.abs(state.current.vx) > 0.5 || Math.abs(state.current.vy) > 0.5) {
      gsap.to(ref.current, {
        x: state.current.x + state.current.vx * 15,
        y: state.current.y + state.current.vy * 15,
        duration: 1.5,
        ease: 'power3.out',
        onUpdate: function () {
          if (!ref.current) return
          state.current.x = parseFloat(ref.current.style.left || '0')
          state.current.y = parseFloat(ref.current.style.top || '0')
        },
      })
    }
  }, [])

  useEffect(() => {
    if (ref.current) {
      ref.current.style.left = `${state.current.x}px`
      ref.current.style.top = `${state.current.y}px`
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4 select-none">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Drag Throw</h2>
      <div className="relative w-full h-36 overflow-hidden rounded-lg bg-[var(--color-surface)]/10">
        <div ref={ref} onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
          className="absolute w-14 h-14 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white font-bold text-lg"
          style={{ left: '80px', top: '50px', zIndex: 10 }}>
          ↴
        </div>
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Drag and release to throw with momentum</p>
    </div>
  )
}
