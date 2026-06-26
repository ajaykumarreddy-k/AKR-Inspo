const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function PulsingRing() {
  const ringsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const rings = ringsRef.current
    if (!rings.length) return

    const ctx = gsap.context(() => {
      rings.forEach((ring, i) => {
        gsap.fromTo(ring,
          { scale: 0, opacity: 0.8 },
          { scale: 3, opacity: 0, duration: 2, repeat: -1, ease: 'power2.out', delay: i * 0.4 }
        )
      })
    })

    return () => ctx.revert()
  }, [])

  const setRingRef = (el: HTMLDivElement | null, i: number) => {
    if (el) ringsRef.current[i] = el
  }

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Pulsing Ring</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Expanding pulsing rings</p>
      <div className="relative w-24 h-24 flex items-center justify-center">
        <div className="absolute w-8 h-8 rounded-full bg-[var(--color-primary)]" />
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            ref={(el) => setRingRef(el, i)}
            className="absolute w-8 h-8 rounded-full border-2 border-[var(--color-accent)]"
          />
        ))}
      </div>
    </div>
  )
}
`;export{e as default};
