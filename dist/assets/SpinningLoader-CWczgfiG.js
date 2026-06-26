const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SpinningLoader() {
  const spinnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const spinner = spinnerRef.current
    if (!spinner) return

    const ctx = gsap.context(() => {
      gsap.to(spinner, {
        rotation: 360,
        duration: 1.5,
        repeat: -1,
        ease: 'linear',
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Spinning Loader</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Classic spinning loader</p>
      <div
        ref={spinnerRef}
        className="w-10 h-10 border-4 border-[var(--color-border)] border-t-[var(--color-primary)] rounded-full"
      />
    </div>
  )
}
`;export{e as default};
