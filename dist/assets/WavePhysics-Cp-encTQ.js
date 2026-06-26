const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function WavePhysics() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const bars = document.querySelectorAll('.wave-bar')
      bars.forEach((bar, i) => {
        gsap.to(bar, {
          scaleY: \`random(0.3, 1)\`,
          duration: 0.6,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.08,
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Wave Physics</h2>
      <div ref={containerRef} className="relative w-full h-44 flex items-center justify-center gap-[3px]">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="wave-bar w-3 rounded-full bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-accent)] shadow-[0_0_8px_rgba(34,211,238,0.3)]"
            style={{ height: '60px', transformOrigin: 'bottom center' }} />
        ))}
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Wave propagation with phase delays</p>
    </div>
  )
}
`;export{e as default};
