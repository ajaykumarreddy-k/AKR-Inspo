import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function OnReverse() {
  const boxRef = useRef<HTMLDivElement>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      tweenRef.current = gsap.to(boxRef.current, {
        x: 150,
        duration: 1,
        ease: 'power2.out',
        paused: true,
        onReverse: () => {
          if (logRef.current) {
            logRef.current.textContent = 'Reversing...'
            logRef.current.className = 'text-xs text-purple-400 font-semibold'
          }
        },
        onReverseComplete: () => {
          if (logRef.current) {
            logRef.current.textContent = 'Reverse complete!'
            logRef.current.className = 'text-xs text-green-400 font-semibold'
          }
        }
      })
    })

    return () => ctx.revert()
  }, [])

  const handlePlay = () => tweenRef.current?.play()
  const handleReverse = () => tweenRef.current?.reverse()

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">onReverse</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Callback fires when reversing</p>
      <div className="relative w-72 h-20 flex items-center">
        <div
          ref={boxRef}
          className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg flex items-center justify-center text-white font-bold"
        >
          Rev
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={handlePlay} className="px-3 py-1 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-xs hover:border-[var(--color-primary)] transition-colors">Play</button>
        <button onClick={handleReverse} className="px-3 py-1 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-xs hover:border-[var(--color-primary)] transition-colors">Reverse</button>
      </div>
      <div ref={logRef} className="text-xs text-[var(--color-text-muted)]">Waiting...</div>
    </div>
  )
}
