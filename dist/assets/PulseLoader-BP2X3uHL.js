const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function PulseLoader() {
  const dotsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const dots = dotsRef.current
    if (!dots.length) return

    const ctx = gsap.context(() => {
      dots.forEach((dot, i) => {
        gsap.to(dot, {
          scale: 0.5,
          opacity: 0.3,
          duration: 0.6,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
          delay: i * 0.2,
        })
      })
    })

    return () => ctx.revert()
  }, [])

  const setDotRef = (el: HTMLDivElement | null, i: number) => {
    if (el) dotsRef.current[i] = el
  }

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Pulse Loader</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Pulsing dots loader</p>
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            ref={(el) => setDotRef(el, i)}
            className="w-4 h-4 rounded-full bg-[var(--color-primary)]"
          />
        ))}
      </div>
    </div>
  )
}
`;export{e as default};
