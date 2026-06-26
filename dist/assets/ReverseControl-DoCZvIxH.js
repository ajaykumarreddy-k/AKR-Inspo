const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ReverseControl() {
  const boxRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      tweenRef.current = gsap.to(boxRef.current, {
        x: 150,
        duration: 1,
        ease: 'power2.out',
        paused: true
      })
    })

    return () => ctx.revert()
  }, [])

  const handleToggle = () => {
    const t = tweenRef.current
    if (!t) return
    t.reversed(!t.reversed())
    t.play()
  }

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Reverse Control</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Reverse animation on click</p>
      <div className="relative w-72 h-20 flex items-center">
        <div
          ref={boxRef}
          className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg flex items-center justify-center text-white font-bold"
        >
          Rev
        </div>
      </div>
      <button onClick={handleToggle} className="px-4 py-1.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-sm hover:border-[var(--color-primary)] transition-colors">
        Toggle Direction
      </button>
    </div>
  )
}
`;export{e as default};
