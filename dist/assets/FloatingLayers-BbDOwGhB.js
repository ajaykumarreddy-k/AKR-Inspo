const t=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FloatingLayers() {
  const containerRef = useRef<HTMLDivElement>(null)
  const float1Ref = useRef<HTMLDivElement>(null)
  const float2Ref = useRef<HTMLDivElement>(null)
  const float3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(float1Ref.current, {
        y: -120, x: 60, rotation: 15,
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      })
      gsap.to(float2Ref.current, {
        y: 80, x: -40, rotation: -10,
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      })
      gsap.to(float3Ref.current, {
        y: -40, x: 80, rotation: 8,
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4 overflow-hidden bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold mb-4 z-10 text-[var(--color-text)]">Floating Layers</h2>
      <p className="text-[var(--color-text-muted)] mb-12 z-10 text-center max-w-md">
        Layers drift, rotate, and float with scroll-based depth.
      </p>
      <div
        ref={float1Ref}
        className="absolute top-40 left-[12%] w-60 h-60 rounded-[40px] bg-gradient-to-bl from-fuchsia-600/30 to-rose-600/20 border border-[var(--color-border)] shadow-lg shadow-fuchsia-900/20"
      />
      <div
        ref={float2Ref}
        className="absolute top-72 right-[10%] w-48 h-48 rounded-full bg-gradient-to-tr from-cyan-600/25 to-blue-600/20 border border-[var(--color-border)] shadow-lg shadow-cyan-900/20"
      />
      <div
        ref={float3Ref}
        className="absolute bottom-48 left-[28%] w-72 h-36 rounded-2xl bg-gradient-to-r from-amber-600/20 to-orange-600/15 border border-[var(--color-border)] shadow-lg shadow-amber-900/20"
      />
      <div className="h-[70vh]" />
    </div>
  )
}
`;export{t as default};
