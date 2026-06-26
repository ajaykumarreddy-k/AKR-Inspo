const e=`import { useRef, useCallback, useState, useEffect } from 'react'
import gsap from 'gsap'

const GRID = 40

export default function DragSnap() {
  const ref = useRef<HTMLDivElement>(null)
  const [snapped, setSnapped] = useState({ x: 2, y: 1 })
  const dragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })

  const snapToGrid = (px: number, py: number) => {
    const gx = Math.round(px / GRID)
    const gy = Math.round(py / GRID)
    return { x: gx * GRID, y: gy * GRID, gx, gy }
  }

  const onDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
  }, [])

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current || !ref.current) return
    const parent = ref.current.parentElement?.getBoundingClientRect()
    if (!parent) return
    const px = e.clientX - parent.left - offset.current.x
    const py = e.clientY - parent.top - offset.current.y
    ref.current.style.left = \`\${px}px\`
    ref.current.style.top = \`\${py}px\`
  }, [])

  const onUp = useCallback(() => {
    dragging.current = false
    if (!ref.current) return
    const parent = ref.current.parentElement?.getBoundingClientRect()
    if (!parent) return
    const px = parseFloat(ref.current.style.left || '0')
    const py = parseFloat(ref.current.style.top || '0')
    const snapped = snapToGrid(px, py)
    setSnapped({ x: snapped.gx, y: snapped.gy })
    gsap.to(ref.current, {
      left: snapped.x,
      top: snapped.y,
      duration: 0.3,
      ease: 'back.out(2)',
    })
  }, [])

  useEffect(() => {
    if (ref.current) {
      ref.current.style.left = \`\${snapped.x * GRID}px\`
      ref.current.style.top = \`\${snapped.y * GRID}px\`
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4 select-none">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Drag Snap</h2>
      <div className="relative w-full h-36 overflow-hidden rounded-lg bg-[var(--color-surface)]/10"
        style={{ backgroundImage: 'radial-gradient(circle, var(--color-border) 1px, transparent 1px)', backgroundSize: \`\${GRID}px \${GRID}px\` }}>
        <div ref={ref} onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
          className="absolute w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white text-xs font-bold"
          style={{ zIndex: 10 }}>
          Snap
        </div>
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Snaps to grid points on release</p>
    </div>
  )
}
`;export{e as default};
