const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function FlipEffect() {
  const innerRef = useRef<HTMLDivElement>(null)
  const frontRef = useRef<HTMLDivElement>(null)
  const backRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 1 })
      tl.to(innerRef.current, { rotationY: 180, duration: 1, ease: 'power2.inOut' })
      tl.call(() => {
        if (frontRef.current && backRef.current) {
          frontRef.current.style.display = 'none'
          backRef.current.style.display = 'flex'
        }
      }, [], 0.5)
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Flip Effect</h2>
      <p className="text-sm text-[var(--color-text-muted)]">3D card flip animation</p>
      <div className="w-28 h-28" style={{ perspective: '600px' }}>
        <div
          ref={innerRef}
          className="w-full h-full relative"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            ref={frontRef}
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white font-bold shadow-lg backface-hidden"
          >
            Front
          </div>
          <div
            ref={backRef}
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold shadow-lg backface-hidden"
            style={{ transform: 'rotateY(180deg)', display: 'none' }}
          >
            Back
          </div>
        </div>
      </div>
    </div>
  )
}
`;export{e as default};
