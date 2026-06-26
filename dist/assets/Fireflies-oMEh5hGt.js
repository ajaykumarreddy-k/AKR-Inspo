const n=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Fireflies() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      const fireflies = container.querySelectorAll<HTMLDivElement>('.firefly')
      fireflies.forEach((f) => {
        gsap.to(f, {
          x: -60 + Math.random() * 120,
          y: -40 + Math.random() * 80,
          opacity: 0.2 + Math.random() * 0.3,
          duration: 2 + Math.random() * 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 2,
        })
        gsap.to(f, {
          scale: 1.5,
          duration: 0.5 + Math.random() * 1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 2,
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative flex flex-col items-center justify-center h-64 overflow-hidden bg-[var(--color-bg)]">
      <h2 className="text-xl font-bold text-[var(--color-text)] z-10">Fireflies</h2>
      <p className="text-sm text-[var(--color-text-muted)] z-10">Firefly-like particles</p>
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="firefly absolute rounded-full"
          style={{
            width: \`\${3 + Math.random() * 3}px\`,
            height: \`\${3 + Math.random() * 3}px\`,
            left: \`\${Math.random() * 100}%\`,
            top: \`\${Math.random() * 100}%\`,
            background: 'var(--color-accent)',
            boxShadow: '0 0 6px 2px var(--color-accent)',
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  )
}
`;export{n as default};
