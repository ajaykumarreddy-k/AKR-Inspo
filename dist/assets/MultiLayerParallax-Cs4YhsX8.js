const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function MultiLayerParallax() {
  const containerRef = useRef<HTMLDivElement>(null)
  const layer1Ref = useRef<HTMLDivElement>(null)
  const layer2Ref = useRef<HTMLDivElement>(null)
  const layer3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(layer1Ref.current, {
        y: 200,
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      })
      gsap.to(layer2Ref.current, {
        y: 100,
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      })
      gsap.to(layer3Ref.current, {
        y: -50,
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4 overflow-hidden bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold mb-4 z-10 text-[var(--color-text)]">Multi-Layer Parallax</h2>
      <p className="text-[var(--color-text-muted)] mb-12 z-10 text-center max-w-md">
        Each layer scrolls at a different speed creating depth.
      </p>
      <div
        ref={layer1Ref}
        className="absolute top-40 left-[10%] w-72 h-72 rounded-3xl bg-gradient-to-br from-purple-600/40 to-pink-600/40 blur-sm"
      />
      <div
        ref={layer2Ref}
        className="absolute top-60 right-[15%] w-56 h-56 rounded-full bg-gradient-to-br from-blue-600/30 to-cyan-600/30 blur-md"
      />
      <div
        ref={layer3Ref}
        className="absolute bottom-40 left-[25%] w-80 h-48 rounded-2xl bg-gradient-to-r from-amber-600/20 to-orange-600/20 blur-sm"
      />
      <div className="h-[80vh]" />
    </div>
  )
}
`;export{e as default};
