const e=`import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function MotionPathReverse() {
  const ref = useRef<HTMLDivElement>(null)
  const [reversed, setReversed] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        x: reversed ? 0 : 200,
        y: reversed ? 0 : 80,
        duration: 2,
        ease: 'power2.inOut',
      })
    })

    return () => ctx.revert()
  }, [reversed])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Motion Path Reverse</h2>
      <div className="relative w-72 h-48 border border-[var(--color-border)] rounded-lg">
        <div ref={ref} className="absolute top-8 left-8 w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg" />
      </div>
      <button
        onClick={() => setReversed(!reversed)}
        className="px-4 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
      >
        {reversed ? 'Forward' : 'Reverse'}
      </button>
    </div>
  )
}
`;export{e as default};
