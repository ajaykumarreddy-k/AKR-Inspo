const e=`import { useRef, useCallback, useEffect, useState } from 'react'
import gsap from 'gsap'

const ITEMS = ['☀', '★', '♠', '♥', '♦', '♣', '☾', '✿', '♫', '⚡']
const COLORS = ['#22d3ee', '#f472b6', '#facc15', '#ef4444', '#4ade80', '#c084fc', '#fb923c', '#34d399', '#f59e0b', '#6366f1']

export default function DragCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  const dragging = useRef(false)
  const startX = useRef(0)
  const startOffset = useRef(0)
  const maxOffset = useRef(0)

  useEffect(() => {
    if (trackRef.current) {
      const trackW = trackRef.current.scrollWidth
      const parentW = trackRef.current.parentElement?.clientWidth || trackW
      maxOffset.current = Math.max(0, trackW - parentW)
    }
  }, [])

  const onDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true
    startX.current = e.clientX
    startOffset.current = offset
  }, [offset])

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current || !trackRef.current) return
    const dx = startX.current - e.clientX
    const newOff = Math.max(0, Math.min(maxOffset.current, startOffset.current + dx))
    setOffset(newOff)
    gsap.set(trackRef.current, { x: -newOff })
  }, [])

  const onUp = useCallback(() => { dragging.current = false }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4 select-none">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Drag Carousel</h2>
      <div className="relative w-full h-28 overflow-hidden rounded-lg bg-[var(--color-surface)]/10 cursor-grab active:cursor-grabbing"
        onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}>
        <div ref={trackRef} className="flex gap-3 absolute h-full items-center px-2" style={{ transform: \`translateX(\${-offset}px)\` }}>
          {ITEMS.map((item, i) => (
            <div key={i} className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center text-2xl shadow-lg"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Drag horizontally to scroll carousel</p>
    </div>
  )
}
`;export{e as default};
