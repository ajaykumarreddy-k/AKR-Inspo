const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function DelayAnimation() {
  const box1Ref = useRef<HTMLDivElement>(null)
  const box2Ref = useRef<HTMLDivElement>(null)
  const box3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(box1Ref.current, { x: 100, duration: 0.8, ease: 'power2.out', repeat: -1, yoyo: true })
      gsap.to(box2Ref.current, { x: 100, duration: 0.8, delay: 0.4, ease: 'power2.out', repeat: -1, yoyo: true })
      gsap.to(box3Ref.current, { x: 100, duration: 0.8, delay: 0.8, ease: 'power2.out', repeat: -1, yoyo: true })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Delay Animation</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Chained animations with staggered delays</p>
      <div className="flex flex-col gap-2 w-72">
        {[
          { ref: box1Ref, label: '0s', color: 'from-cyan-500 to-blue-600' },
          { ref: box2Ref, label: '0.4s', color: 'from-purple-500 to-pink-600' },
          { ref: box3Ref, label: '0.8s', color: 'from-amber-500 to-orange-600' }
        ].map(({ ref, label, color }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="text-xs text-[var(--color-text-muted)] w-8">{label}</span>
            <div
              ref={ref}
              className={\`w-12 h-8 rounded-md bg-gradient-to-br \${color} shadow\`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
`;export{e as default};
