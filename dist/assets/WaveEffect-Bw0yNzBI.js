const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function WaveEffect() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.wave-bar', {
        scaleY: 2.5,
        duration: 0.5,
        ease: 'sine.inOut',
        stagger: {
          each: 0.08,
          repeat: -1,
          yoyo: true
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Wave Effect</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Wave motion across elements</p>
      <div ref={containerRef} className="flex items-end gap-1 h-24">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="wave-bar w-3 rounded-t-md bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-accent)]"
            style={{ height: '30px', transformOrigin: 'bottom center' }}
          />
        ))}
      </div>
    </div>
  )
}
`;export{e as default};
