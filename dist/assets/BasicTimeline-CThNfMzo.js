const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function BasicTimeline() {
  const boxesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0.5 })
      tl.to('.tl-box-1', { x: 120, duration: 0.6, ease: 'power2.out' })
        .to('.tl-box-2', { x: 120, duration: 0.6, ease: 'power2.out' })
        .to('.tl-box-3', { x: 120, duration: 0.6, ease: 'power2.out' })
    }, boxesRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Basic Timeline</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Sequenced animations one after another</p>
      <div ref={boxesRef} className="flex flex-col gap-2 w-72">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={\`tl-box-\${i} w-12 h-8 rounded-md bg-gradient-to-br \${
              i === 1 ? 'from-cyan-500 to-blue-600' :
              i === 2 ? 'from-purple-500 to-pink-600' :
              'from-amber-500 to-orange-600'
            } shadow\`}
          />
        ))}
      </div>
    </div>
  )
}
`;export{e as default};
