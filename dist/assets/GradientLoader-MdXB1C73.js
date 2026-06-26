const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function GradientLoader() {
  const circleRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const circle = circleRef.current
    const bar = barRef.current
    if (!circle || !bar) return

    const ctx = gsap.context(() => {
      gsap.to([circle, bar], {
        backgroundPosition: '200% 50%',
        duration: 2,
        repeat: -1,
        ease: 'linear',
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Gradient Loader</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Gradient shifting loader</p>
      <div className="flex flex-col items-center gap-3">
        <div
          ref={circleRef}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-primary)] bg-[length:200%_100%]"
        />
        <div className="w-32 h-2 rounded-full bg-[var(--color-border)] overflow-hidden">
          <div
            ref={barRef}
            className="w-full h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-primary)] bg-[length:200%_100%]"
          />
        </div>
      </div>
    </div>
  )
}
`;export{e as default};
