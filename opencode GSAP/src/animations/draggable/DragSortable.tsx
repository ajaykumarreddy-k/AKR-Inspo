import { useState, useRef, useCallback } from 'react'
import gsap from 'gsap'

const COLORS = ['#22d3ee', '#f472b6', '#facc15', '#4ade80', '#c084fc', '#fb923c']
const LABELS = ['A', 'B', 'C', 'D', 'E', 'F']

export default function DragSortable() {
  const [items, setItems] = useState(LABELS.map((l, i) => ({ id: i, label: l, color: COLORS[i] })))
  const dragIndex = useRef<number | null>(null)
  const dragEl = useRef<HTMLDivElement | null>(null)
  const offsets = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  const onDown = useCallback((idx: number, e: React.MouseEvent) => {
    dragIndex.current = idx
    dragEl.current = e.currentTarget as HTMLDivElement
    const rect = dragEl.current.getBoundingClientRect()
    offsets.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    gsap.to(dragEl.current, { scale: 1.1, zIndex: 20, duration: 0.2 })
  }, [])

  const onMove = useCallback((e: React.MouseEvent) => {
    if (dragIndex.current === null || !dragEl.current) return
    const parent = dragEl.current.parentElement?.getBoundingClientRect()
    if (!parent) return
    const x = e.clientX - parent.left - offsets.current.x
    const y = e.clientY - parent.top - offsets.current.y
    dragEl.current.style.left = `${x}px`
    dragEl.current.style.top = `${y}px`

    const children = Array.from(dragEl.current.parentElement!.children) as HTMLDivElement[]
    const dropIdx = children.findIndex((child, i) => {
      if (i === dragIndex.current) return false
      const r = child.getBoundingClientRect()
      return e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom
    })
    if (dropIdx !== -1 && dropIdx !== dragIndex.current) {
      setItems(prev => {
        const next = [...prev]
        const [moved] = next.splice(dragIndex.current!, 1)
        next.splice(dropIdx, 0, moved)
        return next
      })
      dragIndex.current = dropIdx
    }
  }, [])

  const onUp = useCallback(() => {
    if (dragEl.current) {
      gsap.to(dragEl.current, { scale: 1, zIndex: 10, left: 0, top: 0, duration: 0.3, ease: 'back.out(2)' })
    }
    dragIndex.current = null
    dragEl.current = null
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4 select-none">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Drag Sortable</h2>
      <div className="relative w-full h-36 flex flex-wrap gap-2 items-center justify-center" onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}>
        {items.map((item, idx) => (
          <div key={item.id} onMouseDown={(e) => onDown(idx, e)}
            className="relative w-10 h-10 rounded-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white font-bold text-sm shadow-md transition-colors"
            style={{ backgroundColor: item.color, zIndex: 10 }}>
            {item.label}
          </div>
        ))}
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Drag items to reorder</p>
    </div>
  )
}
