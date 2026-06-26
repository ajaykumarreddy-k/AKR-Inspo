const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Sparkles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      const sparkles = container.querySelectorAll<HTMLDivElement>('.sparkle')
      sparkles.forEach((s) => {
        gsap.to(s, {
          opacity: 0,
          scale: 2,
          duration: 0.8 + Math.random() * 0.8,
          repeat: -1,
          ease: 'power2.out',
          delay: Math.random() * 2,
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative flex flex-col items-center justify-center h-64 overflow-hidden bg-[var(--color-bg)]">
      <h2 className="text-xl font-bold text-[var(--color-text)] z-10">Sparkles</h2>
      <p className="text-sm text-[var(--color-text-muted)] z-10">Sparkle particle effects</p>
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="sparkle absolute"
          style={{
            left: \`\${Math.random() * 100}%\`,
            top: \`\${Math.random() * 100}%\`,
          }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8">
            <path d="M4 0 L4.5 3.5 L8 4 L4.5 4.5 L4 8 L3.5 4.5 L0 4 L3.5 3.5 Z" fill="var(--color-accent)" />
          </svg>
        </div>
      ))}
    </div>
  )
}
`;export{e as default};
