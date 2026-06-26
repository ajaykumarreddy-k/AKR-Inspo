const e=`import { useRef, useCallback, useState } from 'react'
import gsap from 'gsap'

export default function DragScale() {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const dragging = useRef(false)
  const startScale = useRef(1)
  const startY = useRef(0)

  const onDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true
    startScale.current = scale
    startY.current = e.clientY
    e.stopPropagation()
  }, [scale])

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current || !ref.current) return
    const dy = startY.current - e.clientY
    const newScale = Math.max(0.3, Math.min(3, startScale.current + dy / 100))
    setScale(newScale)
    gsap.to(ref.current, { scale: newScale, duration: 0.05, overwrite: true })
  }, [])

  const onUp = useCallback(() => { dragging.current = false }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4 select-none">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Drag Scale</h2>
      <div className="relative w-full h-36 flex items-center justify-center" onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}>
        <div ref={ref} className="relative">
          <div onMouseDown={onDown} className="w-20 h-20 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white font-bold text-sm">
            {scale.toFixed(1)}×
          </div>
          <div onMouseDown={onDown} className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white border-2 border-green-400 cursor-nwse-resize" />
        </div>
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Drag up/down to scale element</p>
    </div>
  )
}
`;export{e as default};
