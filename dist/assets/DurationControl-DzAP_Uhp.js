const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function DurationControl() {
  const fastRef = useRef<HTMLDivElement>(null)
  const mediumRef = useRef<HTMLDivElement>(null)
  const slowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(fastRef.current, { x: 150, duration: 0.3, ease: 'power2.inOut', repeat: -1, yoyo: true })
      gsap.to(mediumRef.current, { x: 150, duration: 1, ease: 'power2.inOut', repeat: -1, yoyo: true })
      gsap.to(slowRef.current, { x: 150, duration: 2.5, ease: 'power2.inOut', repeat: -1, yoyo: true })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Duration Control</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Different speeds compared</p>
      <div className="flex flex-col gap-3 w-72">
        {[
          { ref: fastRef, label: '0.3s', color: 'from-green-500 to-emerald-600' },
          { ref: mediumRef, label: '1s', color: 'from-cyan-500 to-blue-600' },
          { ref: slowRef, label: '2.5s', color: 'from-rose-500 to-red-600' }
        ].map(({ ref, label, color }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="text-xs text-[var(--color-text-muted)] w-10">{label}</span>
            <div
              ref={ref}
              className={\`w-10 h-8 rounded-md bg-gradient-to-br \${color} shadow shrink-0\`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
`;export{e as default};
