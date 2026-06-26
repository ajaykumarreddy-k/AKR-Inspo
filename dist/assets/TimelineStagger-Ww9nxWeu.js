const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function TimelineStagger() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0.5 })
      tl.from('.stagger-tl-box', {
        y: 50,
        opacity: 0,
        scale: 0.5,
        duration: 0.6,
        ease: 'back.out(1.7)',
        stagger: 0.15
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Timeline Stagger</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Stagger within a timeline</p>
      <div ref={containerRef} className="flex gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="stagger-tl-box w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow flex items-center justify-center text-white text-sm font-bold"
          >
            {i}
          </div>
        ))}
      </div>
    </div>
  )
}
`;export{e as default};
