const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function NestedTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const inner1 = gsap.timeline()
      inner1.to('.nest-box-1', { x: 80, duration: 0.5, ease: 'power2.out' })
        .to('.nest-box-1', { rotation: 180, duration: 0.4, ease: 'power2.out' })

      const inner2 = gsap.timeline()
      inner2.to('.nest-box-2', { x: 80, duration: 0.5, ease: 'power2.out' })
        .to('.nest-box-2', { scale: 1.5, duration: 0.4, ease: 'power2.out' })

      const main = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0.5 })
      main.add(inner1)
        .add(inner2)
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Nested Timeline</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Timeline within a timeline</p>
      <div ref={containerRef} className="flex flex-col gap-3 w-72">
        <div className="nest-box-1 w-12 h-8 rounded bg-gradient-to-br from-cyan-500 to-blue-600 shadow" />
        <div className="nest-box-2 w-12 h-8 rounded bg-gradient-to-br from-purple-500 to-pink-600 shadow" />
      </div>
    </div>
  )
}
`;export{e as default};
