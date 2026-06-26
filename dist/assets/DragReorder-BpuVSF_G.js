const e=`import { useState, useRef, useCallback } from 'react'
import gsap from 'gsap'

interface Item { id: number; text: string }
const INITIAL: Item[] = [
  { id: 1, text: 'Item A' }, { id: 2, text: 'Item B' }, { id: 3, text: 'Item C' },
  { id: 4, text: 'Item D' }, { id: 5, text: 'Item E' },
]

export default function DragReorder() {
  const [items, setItems] = useState(INITIAL)
  const dragIdx = useRef<number | null>(null)
  const dragEl = useRef<HTMLDivElement | null>(null)
  const startY = useRef(0)
  const startTop = useRef(0)

  const onDown = useCallback((idx: number, e: React.MouseEvent) => {
    dragIdx.current = idx
    dragEl.current = e.currentTarget as HTMLDivElement
    const rect = dragEl.current.getBoundingClientRect()
    startY.current = e.clientY
    startTop.current = rect.top
    gsap.to(dragEl.current, { scale: 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.3)', duration: 0.2, zIndex: 20 })
  }, [])

  const onMove = useCallback((e: React.MouseEvent) => {
    if (dragIdx.current === null || !dragEl.current) return
    const parent = dragEl.current.parentElement?.getBoundingClientRect()
    if (!parent) return
    const dy = e.clientY - startY.current
    dragEl.current.style.transform = \`translateY(\${dy}px) scale(1.05)\`

    const children = Array.from(dragEl.current.parentElement!.children) as HTMLDivElement[]
    const dropIdx = children.findIndex((child, i) => {
      if (i === dragIdx.current) return false
      const r = child.getBoundingClientRect()
      return e.clientY > r.top && e.clientY < r.bottom
    })
    if (dropIdx !== -1 && dropIdx !== dragIdx.current) {
      setItems(prev => {
        const next = [...prev]
        const [moved] = next.splice(dragIdx.current!, 1)
        next.splice(dropIdx, 0, moved)
        return next
      })
      dragIdx.current = dropIdx
    }
  }, [])

  const onUp = useCallback(() => {
    if (dragEl.current) {
      gsap.to(dragEl.current, { transform: 'translateY(0) scale(1)', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', duration: 0.3, ease: 'back.out(2)', zIndex: 10 })
    }
    dragIdx.current = null
    dragEl.current = null
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4 select-none">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Drag Reorder</h2>
      <div className="w-full flex flex-col gap-1" onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}>
        {items.map((item, idx) => (
          <div key={item.id} onMouseDown={(e) => onDown(idx, e)}
            className="relative px-4 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] cursor-grab active:cursor-grabbing text-[var(--color-text)] font-medium text-sm flex items-center gap-2 transition-colors hover:border-[var(--color-primary)]/50">
            <span className="text-[var(--color-text-muted)]">⠿</span>
            {item.text}
          </div>
        ))}
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Drag items to reorder list</p>
    </div>
  )
}
`;export{e as default};
