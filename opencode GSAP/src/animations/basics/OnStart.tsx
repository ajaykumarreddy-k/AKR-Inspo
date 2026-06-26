import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function OnStart() {
  const boxRef = useRef<HTMLDivElement>(null)
  const logRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, {
        x: 150,
        duration: 1.5,
        ease: 'power2.out',
        repeat: -1,
        yoyo: true,
        onStart: () => {
          if (logRef.current) {
            logRef.current.textContent = 'Animation started!'
            logRef.current.className = 'text-xs text-cyan-400 font-semibold'
          }
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">onStart</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Callback fires when animation starts</p>
      <div className="relative w-72 h-20 flex items-center">
        <div
          ref={boxRef}
          className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg flex items-center justify-center text-white font-bold"
        >
          S
        </div>
      </div>
      <div ref={logRef} className="text-xs text-[var(--color-text-muted)]">Waiting...</div>
    </div>
  )
}
