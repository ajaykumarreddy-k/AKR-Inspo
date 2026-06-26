const e=`import { useRef, useCallback, useState } from 'react'

export default function DragResize() {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 120, h: 80 })
  const dragging = useRef(false)
  const start = useRef({ x: 0, y: 0, w: 0, h: 0 })

  const onDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true
    start.current = { x: e.clientX, y: e.clientY, w: size.w, h: size.h }
    e.stopPropagation()
  }, [size])

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current) return
    const dx = e.clientX - start.current.x
    const dy = e.clientY - start.current.y
    const newW = Math.max(50, start.current.w + dx)
    const newH = Math.max(30, start.current.h + dy)
    setSize({ w: newW, h: newH })
  }, [])

  const onUp = useCallback(() => { dragging.current = false }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4 select-none">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Drag Resize</h2>
      <div className="relative w-full h-36 flex items-center justify-center" onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}>
        <div ref={ref} className="relative rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg flex items-center justify-center"
          style={{ width: size.w, height: size.h, transition: 'width 0.05s, height 0.05s' }}>
          <span className="text-white text-xs font-bold">{size.w}×{size.h}</span>
          <div onMouseDown={onDown} className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-white border-2 border-[var(--color-primary)] cursor-se-resize shadow-md" />
        </div>
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Drag corner handle to resize</p>
    </div>
  )
}
`;export{e as default};
