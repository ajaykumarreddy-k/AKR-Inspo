const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SnowFall() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const flakes = document.querySelectorAll('.snow-flake')
      flakes.forEach((f, i) => {
        gsap.set(f, { x: 0, y: -10 })
        gsap.to(f, {
          y: 150,
          x: \`random(-30, 30)\`,
          duration: \`random(2, 4)\`,
          ease: 'sine.inOut',
          repeat: -1,
          delay: i * 0.15,
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Snow Fall</h2>
      <div ref={containerRef} className="relative w-full h-44 overflow-hidden rounded-lg bg-gradient-to-b from-[var(--color-surface)]/5 to-[var(--color-surface)]/20">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="snow-flake absolute w-[6px] h-[6px] rounded-full bg-white/60 shadow-[0_0_6px_rgba(255,255,255,0.3)]"
            style={{ left: \`\${5 + (i * 5) % 90}%\` }} />
        ))}
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Snowflakes falling gently</p>
    </div>
  )
}
`;export{e as default};
