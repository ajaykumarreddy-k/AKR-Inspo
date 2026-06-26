const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function OnUpdate() {
  const boxRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const pctRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, {
        x: 150,
        duration: 2,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        onUpdate: function () {
          const pct = Math.round(this.progress() * 100)
          if (pctRef.current) pctRef.current.textContent = \`\${pct}%\`
          if (progressRef.current) progressRef.current.style.width = \`\${pct}%\`
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">onUpdate</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Tracks progress in real-time</p>
      <div className="relative w-72 h-20 flex items-center">
        <div
          ref={boxRef}
          className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg flex items-center justify-center text-white font-bold"
        >
          U
        </div>
      </div>
      <div className="w-72 bg-[var(--color-surface)] rounded-full h-2 border border-[var(--color-border)] overflow-hidden">
        <div ref={progressRef} className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-full w-0" />
      </div>
      <span ref={pctRef} className="text-xs text-[var(--color-text-muted)]">0%</span>
    </div>
  )
}
`;export{e as default};
