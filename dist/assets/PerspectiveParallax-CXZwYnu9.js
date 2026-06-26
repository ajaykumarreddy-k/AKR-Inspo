const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PerspectiveParallax() {
  const containerRef = useRef<HTMLDivElement>(null)
  const backRef = useRef<HTMLDivElement>(null)
  const midRef = useRef<HTMLDivElement>(null)
  const frontRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(backRef.current, {
        rotationX: 15, y: 80, scale: 0.9,
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      })
      gsap.to(midRef.current, {
        rotationX: 5, y: 40, scale: 0.95,
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      })
      gsap.to(frontRef.current, {
        rotationX: -5, y: -60,
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4 overflow-hidden bg-[var(--color-bg)]" style={{ perspective: '1000px' }}>
      <h2 className="text-3xl font-bold mb-4 z-10 text-[var(--color-text)]">3D Perspective Parallax</h2>
      <p className="text-[var(--color-text-muted)] mb-12 z-10 text-center max-w-md">
        Layers rotate and shift in 3D space as you scroll.
      </p>
      <div
        ref={backRef}
        className="absolute top-48 left-[10%] w-72 h-72 rounded-2xl bg-gradient-to-br from-indigo-700/30 to-purple-700/30 border border-[var(--color-border)]"
        style={{ transformStyle: 'preserve-3d' }}
      />
      <div
        ref={midRef}
        className="absolute top-64 right-[15%] w-56 h-56 rounded-full bg-gradient-to-br from-teal-600/25 to-cyan-600/25 border border-[var(--color-border)]"
        style={{ transformStyle: 'preserve-3d' }}
      />
      <div
        ref={frontRef}
        className="absolute bottom-48 left-[20%] w-80 h-48 rounded-xl bg-gradient-to-r from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 border border-[var(--color-border)]"
        style={{ transformStyle: 'preserve-3d' }}
      />
      <div className="h-[70vh]" />
    </div>
  )
}
`;export{e as default};
