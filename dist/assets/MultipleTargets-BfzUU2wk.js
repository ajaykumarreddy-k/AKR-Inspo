const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function MultipleTargets() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.multi-box', {
        y: -40,
        opacity: 0.6,
        rotation: 360,
        duration: 1.5,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.2
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Multiple Targets</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Animating several elements at once</p>
      <div ref={containerRef} className="flex gap-3">
        {['A', 'B', 'C', 'D', 'E'].map((letter) => (
          <div
            key={letter}
            className="multi-box w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg flex items-center justify-center text-white font-bold"
          >
            {letter}
          </div>
        ))}
      </div>
    </div>
  )
}
`;export{e as default};
