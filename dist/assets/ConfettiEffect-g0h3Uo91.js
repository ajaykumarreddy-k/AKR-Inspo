const n=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ConfettiEffect() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, delay: 0.5 })
      tl.to('.confetti-piece', {
        y: \`random(100, 160)\`,
        x: \`random(-60, 60)\`,
        rotation: \`random(-360, 360)\`,
        opacity: 0,
        duration: \`random(1, 2)\`,
        ease: 'power2.out',
        stagger: 0.03,
      })
      tl.set('.confetti-piece', {
        y: 0,
        x: 0,
        rotation: 0,
        opacity: 1,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Confetti Effect</h2>
      <div ref={containerRef} className="relative w-full h-44 overflow-hidden rounded-lg bg-gradient-to-b from-[var(--color-surface)]/20 to-transparent">
        {[...Array(30)].map((_, i) => {
          const colors = ['bg-pink-400', 'bg-cyan-400', 'bg-yellow-400', 'bg-green-400', 'bg-purple-400', 'bg-orange-400']
          return (
            <div key={i} className="confetti-piece absolute w-2 h-3 rounded-sm"
              style={{
                backgroundColor: ['#f472b6', '#22d3ee', '#facc15', '#4ade80', '#c084fc', '#fb923c'][i % 6],
                left: \`\${5 + (i * 3) % 90}%\`,
                top: \`\${10 + (i * 7) % 50}%\`,
              }} />
          )
        })}
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Confetti falling animation</p>
    </div>
  )
}
`;export{n as default};
