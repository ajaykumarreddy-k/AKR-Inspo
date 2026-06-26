const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function EasingComparison() {
  const containerRef = useRef<HTMLDivElement>(null)

  const easings = [
    { name: 'power1.out', cls: 'from-pink-500 to-rose-600' },
    { name: 'power2.out', cls: 'from-purple-500 to-violet-600' },
    { name: 'bounce.out', cls: 'from-cyan-500 to-blue-600' },
    { name: 'elastic.out(1,0.3)', cls: 'from-emerald-500 to-green-600' },
    { name: 'back.out(2)', cls: 'from-amber-500 to-orange-600' }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const boxes = containerRef.current?.querySelectorAll('.ease-box')
      if (boxes) {
        boxes.forEach((box, i) => {
          gsap.to(box, {
            x: 150,
            duration: 1.8,
            ease: easings[i].name as gsap.EaseFunction,
            repeat: -1,
            yoyo: true
          })
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-2">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Easing Comparison</h2>
      <p className="text-sm text-[var(--color-text-muted)] mb-1">Different easing functions side by side</p>
      <div ref={containerRef} className="flex flex-col gap-1.5 w-72">
        {easings.map((e) => (
          <div key={e.name} className="flex items-center gap-2">
            <span className="text-[10px] text-[var(--color-text-muted)] w-24 truncate">{e.name}</span>
            <div
              className={\`ease-box w-8 h-6 rounded bg-gradient-to-br \${e.cls} shadow shrink-0\`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
`;export{e as default};
