import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function DepthBasedMovement() {
  const containerRef = useRef<HTMLDivElement>(null)
  const deepRef = useRef<HTMLDivElement>(null)
  const midRef = useRef<HTMLDivElement>(null)
  const shallowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(deepRef.current, {
        y: 240, scale: 0.8, opacity: 0.5,
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      })
      gsap.to(midRef.current, {
        y: 120, scale: 0.9,
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      })
      gsap.to(shallowRef.current, {
        y: -80,
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4 overflow-hidden bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold mb-4 z-10 text-[var(--color-text)]">Depth-Based Movement</h2>
      <p className="text-[var(--color-text-muted)] mb-12 z-10 text-center max-w-md">
        Elements at different simulated depths move at proportionally different rates.
      </p>
      <div
        ref={deepRef}
        className="absolute top-40 left-[5%] w-80 h-80 rounded-3xl bg-gradient-to-br from-slate-700/40 to-slate-900/40 border border-[var(--color-border)]"
      />
      <div
        ref={midRef}
        className="absolute top-56 right-[12%] w-60 h-60 rounded-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 border-2 border-[var(--color-border)]"
      />
      <div
        ref={shallowRef}
        className="absolute bottom-40 left-[18%] w-64 h-40 rounded-2xl bg-gradient-to-r from-[var(--color-accent)]/25 to-amber-600/20 border border-[var(--color-border)] shadow-lg"
      />
      <div className="h-[70vh]" />
    </div>
  )
}
