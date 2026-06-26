const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ImplosionEffect() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, delay: 1 })
      tl.to('.implode-particle', {
        x: 0,
        y: 0,
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in',
        stagger: 0.03,
      })
      tl.to('.implode-particle', {
        x: \`random(-80, 80)\`,
        y: \`random(-80, 80)\`,
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(2)',
        stagger: 0.03,
      })
      tl.to('.implode-center', {
        scale: 0.5,
        opacity: 0.3,
        duration: 0.2,
        ease: 'power3.in',
      }, 0)
      tl.to('.implode-center', {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'back.out(3)',
      }, '>-0.1')
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Implosion Effect</h2>
      <div ref={containerRef} className="relative w-full h-44 flex items-center justify-center">
        <div className="implode-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 shadow-[0_0_30px_rgba(168,85,247,0.6)] z-10" />
        {[...Array(20)].map((_, i) => (
          <div key={i} className="implode-particle absolute w-2 h-2 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]"
            style={{ transform: \`rotate(\${i * 18}deg) translateX(60px)\` }} />
        ))}
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Particles imploding inward</p>
    </div>
  )
}
`;export{e as default};
