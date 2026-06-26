const t=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function GSAPSet() {
  const boxRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(boxRef.current, {
        x: 100,
        rotation: 15,
        scale: 1.2,
        backgroundColor: '#22d3ee'
      })
      if (statusRef.current) {
        statusRef.current.textContent = 'Properties set instantly'
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">gsap.set()</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Sets properties instantly with no transition</p>
      <div className="relative w-72 h-20 flex items-center">
        <div
          ref={boxRef}
          className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg flex items-center justify-center text-white font-bold"
        >
          set
        </div>
      </div>
      <span ref={statusRef} className="text-xs text-[var(--color-text-muted)]">Setting properties...</span>
    </div>
  )
}
`;export{t as default};
