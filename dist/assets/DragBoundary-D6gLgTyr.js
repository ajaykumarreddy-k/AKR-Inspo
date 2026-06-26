const e=`import { useRef, useCallback } from 'react'

export default function DragBoundary() {
  const ref = useRef<HTMLDivElement>(null)
  const startPos = useRef({ x: 0, y: 0 })
  const startElem = useRef({ x: 0, y: 0 })
  const dragging = useRef(false)
  const BOUNDS = { minX: 0, maxX: 180, minY: 0, maxY: 80 }

  const onDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      startPos.current = { x: e.clientX, y: e.clientY }
      startElem.current = { x: rect.left, y: rect.top }
    }
  }, [])

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current || !ref.current) return
    const parent = ref.current.parentElement?.getBoundingClientRect()
    if (!parent) return
    let x = startElem.current.x - parent.left + (e.clientX - startPos.current.x)
    let y = startElem.current.y - parent.top + (e.clientY - startPos.current.y)
    x = Math.max(BOUNDS.minX, Math.min(BOUNDS.maxX, x))
    y = Math.max(BOUNDS.minY, Math.min(BOUNDS.maxY, y))
    ref.current.style.left = \`\${x}px\`
    ref.current.style.top = \`\${y}px\`
  }, [])

  const onUp = useCallback(() => { dragging.current = false }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4 select-none">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Drag Boundary</h2>
      <div className="relative w-full h-36 overflow-hidden rounded-lg bg-[var(--color-surface)]/10 border-2 border-dashed border-[var(--color-border)]/50">
        <div ref={ref} onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
          className="absolute w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white text-xs font-bold"
          style={{ left: 0, top: 0, zIndex: 10 }}>
          Bound
        </div>
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Dragging constrained within dashed bounds</p>
    </div>
  )
}
`;export{e as default};
