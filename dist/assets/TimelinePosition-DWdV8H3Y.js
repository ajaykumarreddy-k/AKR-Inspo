const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function TimelinePosition() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 1 })
      tl.to('.pos-box-1', { x: 100, duration: 0.8, ease: 'power2.out' })
        .to('.pos-box-2', { x: 100, duration: 0.8, ease: 'power2.out' }, '-=0.4')
        .to('.pos-box-3', { x: 100, duration: 0.8, ease: 'power2.out' }, '+=0.2')
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Timeline Position</h2>
      <p className="text-sm text-[var(--color-text-muted])">Absolute/relative position params</p>
      <div ref={containerRef} className="flex flex-col gap-2 w-72">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[var(--color-text-muted)] w-16">normal</span>
          <div className="pos-box-1 w-10 h-7 rounded bg-gradient-to-br from-cyan-500 to-blue-600 shadow" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[var(--color-text-muted)] w-16">-=0.4s</span>
          <div className="pos-box-2 w-10 h-7 rounded bg-gradient-to-br from-purple-500 to-pink-600 shadow" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[var(--color-text-muted)] w-16">+=0.2s</span>
          <div className="pos-box-3 w-10 h-7 rounded bg-gradient-to-br from-amber-500 to-orange-600 shadow" />
        </div>
      </div>
    </div>
  )
}
`;export{e as default};
