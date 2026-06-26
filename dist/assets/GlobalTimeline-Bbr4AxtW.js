const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function GlobalTimeline() {
  const box1Ref = useRef<HTMLDivElement>(null)
  const box2Ref = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(box1Ref.current, {
        x: 120,
        duration: 1.5,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
      })
      gsap.to(box2Ref.current, {
        rotation: 360,
        duration: 2,
        ease: 'none',
        repeat: -1
      })
    })

    return () => ctx.revert()
  }, [])

  const pauseAll = () => {
    gsap.globalTimeline.pause()
    if (statusRef.current) statusRef.current.textContent = 'All paused'
  }

  const resumeAll = () => {
    gsap.globalTimeline.play()
    if (statusRef.current) statusRef.current.textContent = 'All resumed'
  }

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Global Timeline</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Control all animations at once</p>
      <div className="flex gap-6 items-center">
        <div ref={box1Ref} className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg flex items-center justify-center text-white font-bold text-sm">X</div>
        <div ref={box2Ref} className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg flex items-center justify-center text-white font-bold text-sm">Rot</div>
      </div>
      <div className="flex gap-2">
        <button onClick={pauseAll} className="px-3 py-1 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-xs hover:border-[var(--color-primary)] transition-colors">Pause All</button>
        <button onClick={resumeAll} className="px-3 py-1 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-xs hover:border-[var(--color-primary)] transition-colors">Resume All</button>
      </div>
      <span ref={statusRef} className="text-xs text-[var(--color-text-muted)]">Running</span>
    </div>
  )
}
`;export{e as default};
