const e=`import { useRef, useCallback, useState } from 'react'

export default function DragAxis() {
  const [axis, setAxis] = useState<'x' | 'y'>('x')
  const ref = useRef<HTMLDivElement>(null)
  const startPos = useRef({ x: 0, y: 0 })
  const startElem = useRef({ x: 0, y: 0 })
  const dragging = useRef(false)

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
    const dx = e.clientX - startPos.current.x
    const dy = e.clientY - startPos.current.y
    const parent = ref.current.parentElement?.getBoundingClientRect()
    if (!parent) return
    if (axis === 'x') {
      ref.current.style.left = \`\${startElem.current.x - parent.left + dx}px\`
    } else {
      ref.current.style.top = \`\${startElem.current.y - parent.top + dy}px\`
    }
  }, [axis])

  const onUp = useCallback(() => { dragging.current = false }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4 select-none">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Drag Axis</h2>
      <div className="flex gap-2">
        <button onClick={() => setAxis('x')} className={\`px-3 py-1 rounded text-sm \${axis === 'x' ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-surface)] text-[var(--color-text-muted)]'}\`}>X-Axis</button>
        <button onClick={() => setAxis('y')} className={\`px-3 py-1 rounded text-sm \${axis === 'y' ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-surface)] text-[var(--color-text-muted)]'}\`}>Y-Axis</button>
      </div>
      <div className="relative w-full h-36 overflow-hidden rounded-lg bg-[var(--color-surface)]/10">
        <div ref={ref} onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
          className="absolute w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-blue-500 shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white text-sm font-bold"
          style={{ left: '40%', top: '35%', zIndex: 10 }}>
          {axis === 'x' ? '↔' : '↕'}
        </div>
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Constrained to {axis === 'x' ? 'horizontal' : 'vertical'} axis</p>
    </div>
  )
}
`;export{e as default};
