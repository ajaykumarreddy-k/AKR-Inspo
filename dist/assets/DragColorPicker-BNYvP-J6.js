const e=`import { useState, useRef, useCallback, useEffect } from 'react'

const COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e',
  '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
  '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
]

export default function DragColorPicker() {
  const [color, setColor] = useState('#22d3ee')
  const [brightness, setBrightness] = useState(100)
  const paletteRef = useRef<HTMLDivElement>(null)
  const brightRef = useRef<HTMLDivElement>(null)
  const dragging = useRef<'color' | 'brightness' | null>(null)

  const handleColorMove = (clientX: number, clientY: number) => {
    const pal = paletteRef.current
    if (!pal) return
    const rect = pal.getBoundingClientRect()
    const cols = Math.ceil(Math.sqrt(COLORS.length))
    const cellW = rect.width / cols
    const cellH = rect.height / Math.ceil(COLORS.length / cols)
    const col = Math.floor((clientX - rect.left) / cellW)
    const row = Math.floor((clientY - rect.top) / cellH)
    const idx = row * cols + col
    if (idx >= 0 && idx < COLORS.length) setColor(COLORS[idx])
  }

  const handleBrightMove = (clientX: number) => {
    const rect = brightRef.current?.getBoundingClientRect()
    if (!rect) return
    setBrightness(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)))
  }

  const onDown = useCallback((type: 'color' | 'brightness', e: React.MouseEvent) => {
    dragging.current = type
    if (type === 'color') handleColorMove(e.clientX, e.clientY)
    else handleBrightMove(e.clientX)
  }, [])

  const onMove = useCallback((e: React.MouseEvent) => {
    if (dragging.current === 'color') handleColorMove(e.clientX, e.clientY)
    else if (dragging.current === 'brightness') handleBrightMove(e.clientX)
  }, [])

  const onUp = useCallback(() => { dragging.current = null }, [])

  const adjustedColor = () => {
    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5, 7), 16)
    const f = brightness / 100
    const nr = Math.round(255 - (255 - r) * f)
    const ng = Math.round(255 - (255 - g) * f)
    const nb = Math.round(255 - (255 - b) * f)
    return \`rgb(\${nr}, \${ng}, \${nb})\`
  }

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4 select-none">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Drag Color Picker</h2>
      <div className="flex gap-4 items-center" onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}>
        <div ref={paletteRef} className="grid grid-cols-4 gap-1 rounded-lg overflow-hidden cursor-pointer"
          onMouseDown={(e) => onDown('color', e)}>
          {COLORS.map((c, i) => (
            <div key={i} className="w-7 h-7 rounded-sm" style={{ backgroundColor: c }} />
          ))}
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-xl shadow-lg border-2 border-[var(--color-border)]" style={{ backgroundColor: adjustedColor() }} />
          <div ref={brightRef} onMouseDown={(e) => onDown('brightness', e)}
            className="w-full h-2 rounded-full bg-gradient-to-r from-black to-white cursor-pointer relative">
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border border-[var(--color-border)] shadow"
              style={{ left: \`\${brightness}%\` }} />
          </div>
        </div>
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Drag to pick color and adjust brightness</p>
    </div>
  )
}
`;export{e as default};
