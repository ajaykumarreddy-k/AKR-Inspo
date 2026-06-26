const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function OnRepeat() {
  const boxRef = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)
  const logRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let count = 0
    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, {
        x: 150,
        duration: 0.8,
        ease: 'power2.out',
        repeat: 5,
        yoyo: true,
        onRepeat: () => {
          count++
          if (countRef.current) countRef.current.textContent = \`\${count}\`
          if (logRef.current) {
            logRef.current.textContent = \`Repeat #\${count}\`
            logRef.current.className = 'text-xs text-amber-400 font-semibold'
          }
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">onRepeat</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Callback fires on each repeat</p>
      <div className="relative w-72 h-20 flex items-center">
        <div
          ref={boxRef}
          className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg flex items-center justify-center text-white font-bold"
        >
          R
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-xs text-[var(--color-text-muted)]">Repeats:</span>
        <span ref={countRef} className="text-xs text-[var(--color-text-muted)]">0</span>
      </div>
      <div ref={logRef} className="text-xs text-[var(--color-text-muted)]">Waiting...</div>
    </div>
  )
}
`;export{e as default};
