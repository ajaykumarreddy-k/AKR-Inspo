const e=`import { useRef, useCallback } from 'react'

const ITEMS = ['A', 'B', 'C', 'D', 'E']
const COLORS = ['from-cyan-400 to-blue-500', 'from-pink-400 to-rose-500', 'from-yellow-400 to-orange-500', 'from-green-400 to-emerald-500', 'from-purple-400 to-violet-500']

export default function DragMultiple() {
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const dragState = useRef<{ idx: number; ox: number; oy: number; sx: number; sy: number } | null>(null)

  const onDown = useCallback((idx: number, e: React.MouseEvent) => {
    const el = refs.current[idx]
    if (!el) return
    const rect = el.getBoundingClientRect()
    const parent = el.parentElement?.getBoundingClientRect()
    if (!parent) return
    dragState.current = {
      idx,
      ox: e.clientX - rect.left,
      oy: e.clientY - rect.top,
      sx: rect.left - parent.left,
      sy: rect.top - parent.top,
    }
    el.style.zIndex = '20'
  }, [])

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!dragState.current) return
    const { idx, ox, oy, sx, sy } = dragState.current
    const el = refs.current[idx]
    if (!el) return
    const parent = el.parentElement?.getBoundingClientRect()
    if (!parent) return
    const x = sx + (e.clientX - (parent.left + sx + ox))
    const y = sy + (e.clientY - (parent.top + sy + oy))
    el.style.left = \`\${Math.max(0, Math.min(200, x))}px\`
    el.style.top = \`\${Math.max(0, Math.min(60, y))}px\`
  }, [])

  const onUp = useCallback(() => {
    if (dragState.current !== null) {
      const el = refs.current[dragState.current.idx]
      if (el) el.style.zIndex = '10'
    }
    dragState.current = null
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4 select-none">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Drag Multiple</h2>
      <div className="relative w-full h-36 overflow-hidden rounded-lg bg-[var(--color-surface)]/10" onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}>
        {ITEMS.map((label, idx) => (
          <div key={idx} ref={el => { refs.current[idx] = el }} onMouseDown={(e) => onDown(idx, e)}
            className={\`absolute w-11 h-11 rounded-lg bg-gradient-to-br \${COLORS[idx]} shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white font-bold text-sm\`}
            style={{ left: \`\${20 + idx * 35}px\`, top: \`\${20 + (idx % 3) * 25}px\`, zIndex: 10 }}>
            {label}
          </div>
        ))}
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Multiple independently draggable items</p>
    </div>
  )
}
`;export{e as default};
