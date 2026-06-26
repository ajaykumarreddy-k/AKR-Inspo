import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function WobbleEffect() {
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wobble = () => {
        gsap.to(boxRef.current, {
          rotation: 5,
          duration: 0.1,
          repeat: 3,
          yoyo: true,
          ease: 'sine.inOut',
          onComplete: () => {
            gsap.to(boxRef.current, {
              rotation: 0,
              duration: 0.05,
              onComplete: () => setTimeout(wobble, 2000)
            })
          }
        })
      }
      wobble()
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Wobble Effect</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Wiggly wobble animation</p>
      <div
        ref={boxRef}
        className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold shadow-lg"
      >
        Wobble
      </div>
    </div>
  )
}
