import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function TimelineCallbacks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const logRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        repeat: 2,
        yoyo: true,
        onStart: () => {
          if (logRef.current) {
            logRef.current.textContent = 'onStart fired'
            logRef.current.className = 'text-xs text-cyan-400 font-semibold'
          }
        },
        onComplete: () => {
          if (logRef.current) {
            logRef.current.textContent = 'onComplete fired'
            logRef.current.className = 'text-xs text-green-400 font-semibold'
          }
        }
      })
      tl.to('.cb-box-1', { x: 100, duration: 0.5, ease: 'power2.out' })
        .to('.cb-box-2', { x: 100, duration: 0.5, ease: 'power2.out' })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Timeline Callbacks</h2>
      <p className="text-sm text-[var(--color-text-muted)]">onStart and onComplete callbacks</p>
      <div ref={containerRef} className="flex flex-col gap-2 w-72">
        <div className="cb-box-1 w-10 h-7 rounded bg-gradient-to-br from-cyan-500 to-blue-600 shadow" />
        <div className="cb-box-2 w-10 h-7 rounded bg-gradient-to-br from-purple-500 to-pink-600 shadow" />
      </div>
      <div ref={logRef} className="text-xs text-[var(--color-text-muted)]">Waiting...</div>
    </div>
  )
}
