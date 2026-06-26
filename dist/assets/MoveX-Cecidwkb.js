const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function MoveX() {
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, {
        x: 180,
        duration: 1.2,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Move X</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Horizontal movement</p>
      <div className="relative w-72 h-20 flex items-center border-l-2 border-r-2 border-[var(--color-border)]">
        <div
          ref={boxRef}
          className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg flex items-center justify-center text-white font-bold"
        >
          X
        </div>
      </div>
    </div>
  )
}
`;export{e as default};
