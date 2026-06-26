const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ParticleSystem() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const particles = document.querySelectorAll('.phys-particle')
      particles.forEach((p, i) => {
        gsap.to(p, {
          x: \`random(-80, 80)\`,
          y: \`random(-80, 80)\`,
          scale: \`random(0.3, 1)\`,
          opacity: \`random(0.4, 1)\`,
          rotation: \`random(-180, 180)\`,
          duration: \`random(2, 4)\`,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.05,
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Particle System</h2>
      <div ref={containerRef} className="relative w-full h-44 overflow-hidden rounded-lg bg-[var(--color-surface)]/10">
        {[...Array(30)].map((_, i) => {
          const size = 3 + (i % 5) * 2
          return (
            <div key={i} className="phys-particle absolute rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]"
              style={{
                width: size,
                height: size,
                left: \`\${10 + (i * 3) % 80}%\`,
                top: \`\${10 + (i * 7) % 80}%\`,
                opacity: 0.8,
              }} />
          )
        })}
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Full particle system with physics</p>
    </div>
  )
}
`;export{e as default};
