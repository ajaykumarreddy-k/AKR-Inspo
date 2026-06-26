const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function OnComplete() {
  const boxRef = useRef<HTMLDivElement>(null)
  const logRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let count = 0
    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, {
        x: 150,
        duration: 1,
        ease: 'power2.out',
        repeat: 3,
        yoyo: true,
        onComplete: () => {
          count++
          if (logRef.current) {
            logRef.current.textContent = \`Completed! (x\${count})\`
            logRef.current.className = 'text-xs text-green-400 font-semibold'
          }
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">onComplete</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Callback fires when animation completes</p>
      <div className="relative w-72 h-20 flex items-center">
        <div
          ref={boxRef}
          className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg flex items-center justify-center text-white font-bold"
        >
          C
        </div>
      </div>
      <div ref={logRef} className="text-xs text-[var(--color-text-muted)]">Waiting...</div>
    </div>
  )
}
`;export{e as default};
