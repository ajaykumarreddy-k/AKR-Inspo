const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function RainDrops() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const drops = document.querySelectorAll('.rain-drop')
      drops.forEach((d, i) => {
        gsap.to(d, {
          y: 140,
          opacity: 0,
          duration: \`random(0.5, 1.2)\`,
          ease: 'power1.in',
          repeat: -1,
          delay: i * 0.08,
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Rain Drops</h2>
      <div ref={containerRef} className="relative w-full h-44 overflow-hidden rounded-lg bg-[var(--color-surface)]/10">
        {[...Array(25)].map((_, i) => (
          <div key={i} className="rain-drop absolute w-[2px] h-4 bg-gradient-to-b from-transparent to-cyan-400/80 rounded-full"
            style={{
              left: \`\${4 + (i * 4) % 92}%\`,
              top: '-20px',
            }} />
        ))}
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Rain drops falling with gravity</p>
    </div>
  )
}
`;export{e as default};
