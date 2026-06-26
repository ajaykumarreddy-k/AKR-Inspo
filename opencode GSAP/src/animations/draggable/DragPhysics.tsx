import { useRef, useCallback, useEffect } from 'react'
import gsap from 'gsap'

export default function DragPhysics() {
  const ref = useRef<HTMLDivElement>(null)
  const vel = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 80, y: 40 })
  const dragging = useRef(false)
  const prev = useRef({ x: 0, y: 0, t: 0 })
  const rafId = useRef<number>(0)

  const onDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true
    prev.current = { x: e.clientX, y: e.clientY, t: Date.now() }
    vel.current = { x: 0, y: 0 }
    gsap.killTweensOf(ref.current)
  }, [])

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current || !ref.current) return
    const dx = e.clientX - prev.current.x
    const dy = e.clientY - prev.current.y
    const dt = Date.now() - prev.current.t
    vel.current = { x: dx / (dt || 1) * 16, y: dy / (dt || 1) * 16 }
    prev.current = { x: e.clientX, y: e.clientY, t: Date.now() }
    pos.current.x += dx
    pos.current.y += dy
    ref.current.style.left = `${pos.current.x}px`
    ref.current.style.top = `${pos.current.y}px`
  }, [])

  const onUp = useCallback(() => {
    dragging.current = false
    if (Math.abs(vel.current.x) > 0.3 || Math.abs(vel.current.y) > 0.3) {
      const friction = 0.92
      const animate = () => {
        vel.current.x *= friction
        vel.current.y *= friction
        pos.current.x += vel.current.x
        pos.current.y += vel.current.y
        if (ref.current) {
          ref.current.style.left = `${pos.current.x}px`
          ref.current.style.top = `${pos.current.y}px`
        }
        if (Math.abs(vel.current.x) > 0.05 || Math.abs(vel.current.y) > 0.05) {
          rafId.current = requestAnimationFrame(animate)
        }
      }
      animate()
    }
  }, [])

  useEffect(() => () => cancelAnimationFrame(rafId.current), [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4 select-none">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Drag Physics</h2>
      <div className="relative w-full h-36 overflow-hidden rounded-lg bg-[var(--color-surface)]/10" onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}>
        <div ref={ref} onMouseDown={onDown}
          className="absolute w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white font-bold text-lg"
          style={{ left: '80px', top: '40px', zIndex: 10 }}>
          ⚡
        </div>
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Drag with friction-based physics deceleration</p>
    </div>
  )
}
