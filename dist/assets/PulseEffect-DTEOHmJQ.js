const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function PulseEffect() {
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, {
        scale: 1.3,
        opacity: 0.6,
        duration: 0.8,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true
      })
      gsap.to(boxRef.current, {
        boxShadow: '0 0 40px rgba(34,211,238,0.6)',
        duration: 0.8,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Pulse Effect</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Pulsing scale, opacity, and glow</p>
      <div
        ref={boxRef}
        className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white font-bold shadow-lg"
      >
        Pulse
      </div>
    </div>
  )
}
`;export{e as default};
