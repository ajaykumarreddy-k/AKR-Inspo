import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function RefreshBehavior() {
  const boxRef = useRef<HTMLDivElement>(null)
  const [refreshCount, setRefreshCount] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const handleRefresh = () => {
        setRefreshCount((c) => c + 1)
      }

      ScrollTrigger.addEventListener('refresh', handleRefresh)

      gsap.from(boxRef.current, {
        scrollTrigger: {
          trigger: boxRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1
        },
        x: 200,
        opacity: 0.2,
        duration: 1,
        ease: 'none'
      })

      return () => {
        ScrollTrigger.removeEventListener('refresh', handleRefresh)
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4">
      <h2 className="text-3xl font-bold mb-8 text-[var(--color-text)]">7. Refresh Behavior</h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        ScrollTrigger recalculates positions on resize. Refresh count below tracks updates.
      </p>
      <div className="h-[40vh]" />
      <div className="text-center mb-4">
        <span className="text-sm font-mono text-[var(--color-text-muted)]">
          Refreshes: <span className="text-[var(--color-accent)]">{refreshCount}</span>
        </span>
      </div>
      <div
        ref={boxRef}
        className="w-64 h-64 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center shadow-lg"
      >
        <span className="text-white font-bold text-center text-sm px-4">
          Resize browser to trigger refresh
        </span>
      </div>
      <div className="h-[30vh]" />
    </div>
  )
}
