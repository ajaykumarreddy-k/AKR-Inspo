const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function TimelineLabel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        repeatDelay: 1,
        onUpdate: function () {
          const labels = ['start', 'middle', 'end']
          const progress = this.progress()
          const idx = progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2
          if (labelRef.current) labelRef.current.textContent = labels[idx]
        }
      })
      tl.to('.label-box-1', { x: 100, duration: 0.6, ease: 'power2.out' })
        .add('middle')
        .to('.label-box-2', { x: 100, duration: 0.6, ease: 'power2.out' })
        .add('end')
        .to('.label-box-3', { x: 100, duration: 0.6, ease: 'power2.out' })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Timeline Label</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Labels for precise control points</p>
      <div ref={containerRef} className="flex flex-col gap-2 w-72">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={\`label-box-\${i} w-10 h-7 rounded bg-gradient-to-br \${
              i === 1 ? 'from-cyan-500 to-blue-600' :
              i === 2 ? 'from-purple-500 to-pink-600' :
              'from-amber-500 to-orange-600'
            } shadow\`}
          />
        ))}
      </div>
      <span ref={labelRef} className="text-xs text-[var(--color-accent)] font-semibold">start</span>
    </div>
  )
}
`;export{e as default};
