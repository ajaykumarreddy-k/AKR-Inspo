const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ChainReaction() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, delay: 0.5 })
      const dominoes = document.querySelectorAll('.domino')
      dominoes.forEach((d, i) => {
        tl.to(d, {
          rotation: i % 2 === 0 ? -90 : 90,
          duration: 0.15,
          ease: 'power2.out',
          transformOrigin: 'bottom center',
        }, i * 0.08)
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Chain Reaction</h2>
      <div ref={containerRef} className="relative w-full h-44 flex items-end justify-center gap-2 pb-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="domino w-3 h-16 rounded-t-md bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-accent)] shadow-[0_0_8px_rgba(34,211,238,0.3)]"
            style={{ transformOrigin: 'bottom center' }} />
        ))}
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Domino chain reaction effect</p>
    </div>
  )
}
`;export{e as default};
