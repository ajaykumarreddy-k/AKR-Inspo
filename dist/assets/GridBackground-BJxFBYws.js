const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function GridBackground() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const ctx = gsap.context(() => {
      gsap.to(grid, {
        backgroundPosition: '40px 40px',
        duration: 3,
        repeat: -1,
        ease: 'linear',
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative flex flex-col items-center justify-center h-64 overflow-hidden bg-[var(--color-bg)]">
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <h2 className="text-xl font-bold text-[var(--color-text)] z-10">Grid Background</h2>
      <p className="text-sm text-[var(--color-text-muted)] z-10">Animated grid background</p>
    </div>
  )
}
`;export{e as default};
