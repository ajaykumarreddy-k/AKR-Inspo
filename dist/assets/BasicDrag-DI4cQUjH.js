const e=`import { useRef, useCallback } from 'react'

export default function BasicDrag() {
  const ref = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const dragging = useRef(false)

  const onDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      pos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
  }, [])

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current || !ref.current) return
    ref.current.style.left = \`\${e.clientX - pos.current.x}px\`
    ref.current.style.top = \`\${e.clientY - pos.current.y}px\`
  }, [])

  const onUp = useCallback(() => {
    dragging.current = false
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4 select-none">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Basic Drag</h2>
      <div className="relative w-full h-44 overflow-hidden rounded-lg bg-[var(--color-surface)]/10">
        <div ref={ref} onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
          className="absolute w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white font-bold"
          style={{ left: '40%', top: '35%', zIndex: 10 }}>
          Drag
        </div>
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Simple draggable element</p>
    </div>
  )
}
`;export{e as default};
