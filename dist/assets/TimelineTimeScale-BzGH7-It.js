const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function TimelineTimeScale() {
  const containerRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const speedRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      tlRef.current = gsap.timeline({ repeat: -1, yoyo: true })
      tlRef.current.to('.ts-box-1', { x: 120, duration: 0.8, ease: 'power2.out' })
        .to('.ts-box-2', { x: 120, duration: 0.8, ease: 'power2.out' })
        .to('.ts-box-3', { x: 120, duration: 0.8, ease: 'power2.out' })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const setSpeed = (s: number) => {
    if (tlRef.current) {
      tlRef.current.timeScale(s)
      if (speedRef.current) speedRef.current.textContent = \`\${s}x\`
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Timeline TimeScale</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Changing timeline speed</p>
      <div ref={containerRef} className="flex flex-col gap-2 w-72">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={\`ts-box-\${i} w-10 h-7 rounded bg-gradient-to-br \${
              i === 1 ? 'from-cyan-500 to-blue-600' :
              i === 2 ? 'from-purple-500 to-pink-600' :
              'from-amber-500 to-orange-600'
            } shadow\`}
          />
        ))}
      </div>
      <div className="flex gap-2 items-center">
        {[0.25, 0.5, 1, 2, 4].map((s) => (
          <button
            key={s}
            onClick={() => setSpeed(s)}
            className="px-2.5 py-1 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-xs hover:border-[var(--color-primary)] transition-colors"
          >
            {s}x
          </button>
        ))}
        <span ref={speedRef} className="text-xs text-[var(--color-accent)] font-semibold ml-1">1x</span>
      </div>
    </div>
  )
}
`;export{e as default};
