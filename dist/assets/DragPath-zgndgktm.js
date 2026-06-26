const e=`import { useRef, useCallback, useEffect } from 'react'
import gsap from 'gsap'

const PATH_POINTS = [
  { x: 10, y: 70 },
  { x: 60, y: 10 },
  { x: 110, y: 70 },
  { x: 160, y: 10 },
  { x: 210, y: 70 },
]

export default function DragPath() {
  const ref = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dragging = useRef(false)
  const closestIdx = useRef(0)
  const offset = useRef({ x: 0, y: 0 })

  const findClosest = (px: number, py: number) => {
    let minDist = Infinity
    let idx = 0
    PATH_POINTS.forEach((p, i) => {
      const d = Math.hypot(px - p.x, py - p.y)
      if (d < minDist) { minDist = d; idx = i }
    })
    return idx
  }

  const drawPath = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = 'var(--color-border)'
    ctx.lineWidth = 2
    ctx.setLineDash([4, 4])
    ctx.beginPath()
    PATH_POINTS.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y)
      else ctx.lineTo(p.x, p.y)
    })
    ctx.stroke()
    PATH_POINTS.forEach((p, i) => {
      ctx.beginPath()
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2)
      ctx.fillStyle = i === closestIdx.current ? 'var(--color-accent)' : 'var(--color-border)'
      ctx.fill()
    })
  }

  useEffect(() => { drawPath() })

  const onDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const parent = ref.current!.parentElement?.getBoundingClientRect()
    if (!parent) return
    const px = e.clientX - parent.left
    const py = e.clientY - parent.top
    closestIdx.current = findClosest(px, py)
    offset.current = { x: px - PATH_POINTS[closestIdx.current].x, y: py - PATH_POINTS[closestIdx.current].y }
  }, [])

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current || !ref.current) return
    const parent = ref.current.parentElement?.getBoundingClientRect()
    if (!parent) return
    const px = Math.max(5, Math.min(225, e.clientX - parent.left - offset.current.x))
    const py = Math.max(5, Math.min(85, e.clientY - parent.top - offset.current.y))
    ref.current.style.left = \`\${px}px\`
    ref.current.style.top = \`\${py}px\`

    const closestPts = PATH_POINTS.reduce((best, p, i) => {
      const d = Math.hypot(px - p.x, py - p.y)
      return d < best.d ? { d, i } : best
    }, { d: Infinity, i: 0 })
    closestIdx.current = closestPts.i
    drawPath()
  }, [])

  const onUp = useCallback(() => {
    dragging.current = false
    const target = PATH_POINTS[closestIdx.current]
    if (ref.current) {
      gsap.to(ref.current, { left: target.x, top: target.y, duration: 0.3, ease: 'back.out(2)' })
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4 select-none">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Drag Path</h2>
      <div className="relative w-full h-28 rounded-lg bg-[var(--color-surface)]/10" onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}>
        <canvas ref={canvasRef} width="230" height="90" className="absolute inset-0 w-full h-full pointer-events-none" />
        <div ref={ref} onMouseDown={onDown}
          className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white text-xs font-bold"
          style={{ left: '10px', top: '70px', zIndex: 10 }}>
          ●
        </div>
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Drag constrained to path waypoints</p>
    </div>
  )
}
`;export{e as default};
