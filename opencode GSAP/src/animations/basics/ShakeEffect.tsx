import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ShakeEffect() {
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const shake = () => {
        gsap.to(boxRef.current, {
          x: '+=8',
          duration: 0.05,
          repeat: 5,
          yoyo: true,
          ease: 'none',
          onComplete: () => {
            gsap.set(boxRef.current, { x: 0 })
            setTimeout(shake, 1500)
          }
        })
      }
      shake()
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Shake Effect</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Vibration/shake animation</p>
      <div
        ref={boxRef}
        className="w-24 h-24 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-white font-bold shadow-lg"
      >
        SHAKE
      </div>
    </div>
  )
}
