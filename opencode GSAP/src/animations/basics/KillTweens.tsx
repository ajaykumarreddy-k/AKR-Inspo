import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function KillTweens() {
  const box1Ref = useRef<HTMLDivElement>(null)
  const box2Ref = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(box1Ref.current, {
        x: 120,
        duration: 1,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
      })
      gsap.to(box2Ref.current, {
        x: 120,
        duration: 1,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
      })
    })

    return () => ctx.revert()
  }, [])

  const killBox1 = () => {
    gsap.killTweensOf(box1Ref.current)
    if (statusRef.current) statusRef.current.textContent = 'Box A killed'
  }

  const killAll = () => {
    gsap.killTweensOf([box1Ref.current, box2Ref.current])
    if (statusRef.current) statusRef.current.textContent = 'All tweens killed'
  }

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Kill Tweens</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Stop specific or all tweens</p>
      <div className="flex gap-4">
        <div ref={box1Ref} className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 shadow flex items-center justify-center text-white text-xs font-bold">A</div>
        <div ref={box2Ref} className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 shadow flex items-center justify-center text-white text-xs font-bold">B</div>
      </div>
      <div className="flex gap-2">
        <button onClick={killBox1} className="px-3 py-1 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-xs hover:border-red-500 transition-colors">Kill A</button>
        <button onClick={killAll} className="px-3 py-1 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-xs hover:border-red-500 transition-colors">Kill All</button>
      </div>
      <span ref={statusRef} className="text-xs text-[var(--color-text-muted)]">Both running</span>
    </div>
  )
}
