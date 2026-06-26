const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function FrictionSlide() {
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.slide-box', {
        x: 200,
        duration: 2,
        ease: 'power3.out',
        repeat: -1,
        yoyo: true,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Friction Slide</h2>
      <div className="relative w-full h-40 flex items-center">
        <div className="w-full h-2 rounded-full bg-[var(--color-border)] opacity-30" />
        <div ref={boxRef} className="slide-box w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-blue-500 shadow-lg flex items-center justify-center absolute left-0 text-white font-bold text-lg">
          →
        </div>
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Decelerating slide with friction</p>
    </div>
  )
}
`;export{e as default};
