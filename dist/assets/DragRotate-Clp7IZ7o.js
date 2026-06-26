const e=`import { useRef, useCallback, useState } from 'react'
import gsap from 'gsap'

export default function DragRotate() {
  const ref = useRef<HTMLDivElement>(null)
  const [angle, setAngle] = useState(0)
  const dragging = useRef(false)
  const startAngle = useRef(0)
  const startPos = useRef({ x: 0, y: 0 })

  const onDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true
    startAngle.current = angle
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      startPos.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    }
  }, [angle])

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current) return
    const dx = e.clientX - startPos.current.x
    const dy = e.clientY - startPos.current.y
    const newAngle = startAngle.current + Math.atan2(dy, dx) * (180 / Math.PI)
    setAngle(newAngle)
    if (ref.current) {
      gsap.to(ref.current, { rotation: newAngle, duration: 0.05, overwrite: true })
    }
  }, [])

  const onUp = useCallback(() => { dragging.current = false }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4 select-none">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Drag Rotate</h2>
      <div className="relative w-full h-36 flex items-center justify-center" onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}>
        <div ref={ref} onMouseDown={onDown}
          className="w-20 h-20 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white font-bold text-2xl"
          style={{ transform: \`rotate(\${angle}deg)\` }}>
          ↻
        </div>
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Drag to rotate element</p>
    </div>
  )
}
`;export{e as default};
