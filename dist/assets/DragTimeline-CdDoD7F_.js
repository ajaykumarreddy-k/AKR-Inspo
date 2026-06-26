const e=`import { useState, useRef, useCallback } from 'react'
import gsap from 'gsap'

const FRAMES = 20
const MARKS = Array.from({ length: FRAMES + 1 }, (_, i) => i)

export default function DragTimeline() {
  const [frame, setFrame] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const updateFrame = (clientX: number) => {
    const track = trackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const f = Math.round(pct * FRAMES)
    setFrame(f)
    if (thumbRef.current) gsap.set(thumbRef.current, { left: \`\${(f / FRAMES) * 100}%\` })
    if (boxRef.current) {
      const progress = f / FRAMES
      gsap.set(boxRef.current, {
        x: progress * 120,
        y: Math.sin(progress * Math.PI * 2) * -30,
        scale: 0.8 + progress * 0.4,
        opacity: 0.6 + progress * 0.4,
      })
    }
  }

  const onDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true
    updateFrame(e.clientX)
  }, [])

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current) return
    updateFrame(e.clientX)
  }, [])

  const onUp = useCallback(() => { dragging.current = false }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4 select-none">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Drag Timeline</h2>
      <div className="relative w-full h-20 flex items-end justify-center">
        <div ref={boxRef} className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg" />
      </div>
      <div className="w-full px-2" onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}>
        <div ref={trackRef} onMouseDown={onDown} className="relative w-full h-6 rounded-full bg-[var(--color-surface)] cursor-pointer flex items-center">
          {MARKS.map(m => (
            <div key={m} className="absolute w-px h-3 bg-[var(--color-border)]/50"
              style={{ left: \`\${(m / FRAMES) * 100}%\` }} />
          ))}
          <div ref={thumbRef} onMouseDown={onDown}
            className="absolute -ml-2 w-4 h-4 rounded-full bg-white border-2 border-[var(--color-primary)] shadow-md cursor-grab active:cursor-grabbing z-10"
            style={{ left: \`\${(frame / FRAMES) * 100}%\` }} />
        </div>
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Frame: {frame}/{FRAMES}</p>
    </div>
  )
}
`;export{e as default};
