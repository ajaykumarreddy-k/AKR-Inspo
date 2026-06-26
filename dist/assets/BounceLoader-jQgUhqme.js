const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function BounceLoader() {
  const ballsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const balls = ballsRef.current
    if (!balls.length) return

    const ctx = gsap.context(() => {
      balls.forEach((ball, i) => {
        gsap.to(ball, {
          y: -24,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
          delay: i * 0.15,
        })
      })
    })

    return () => ctx.revert()
  }, [])

  const setBallRef = (el: HTMLDivElement | null, i: number) => {
    if (el) ballsRef.current[i] = el
  }

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Bounce Loader</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Bouncing balls loader</p>
      <div className="flex items-end gap-2 h-10">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            ref={(el) => setBallRef(el, i)}
            className="w-4 h-4 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]"
          />
        ))}
      </div>
    </div>
  )
}
`;export{e as default};
