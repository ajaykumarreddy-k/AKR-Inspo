const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ProjectileMotion() {
  const ballRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, delay: 0.5 })
      tl.to('.proj-ball', {
        x: 220,
        duration: 1.2,
        ease: 'none',
      })
      tl.to('.proj-ball', {
        y: -100,
        duration: 0.6,
        ease: 'power2.out',
      }, '<')
      tl.to('.proj-ball', {
        y: 0,
        duration: 0.6,
        ease: 'power2.in',
      }, '>-0.6')
      tl.to('.proj-ball', {
        scaleY: 0.7,
        scaleX: 1.3,
        duration: 0.08,
        ease: 'none',
      }, '>')
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Projectile Motion</h2>
      <div className="relative w-full h-44 flex items-end">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--color-border)] opacity-30" />
        <div ref={ballRef} className="proj-ball w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-[0_0_15px_rgba(255,200,50,0.4)] absolute bottom-0 left-0" />
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Arc trajectory with gravity</p>
    </div>
  )
}
`;export{e as default};
