const r=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function BackgroundParallax() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const fg1Ref = useRef<HTMLDivElement>(null)
  const fg2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        y: 80,
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      })
      gsap.to(fg1Ref.current, {
        y: -120,
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      })
      gsap.to(fg2Ref.current, {
        y: -180,
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4 overflow-hidden bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold mb-4 z-10 text-[var(--color-text)]">Background Parallax</h2>
      <p className="text-[var(--color-text-muted)] mb-12 z-10 text-center max-w-md">
        Background drifts slowly while foreground elements rush past.
      </p>
      <div
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-b from-indigo-900/40 via-purple-900/30 to-transparent"
      />
      <div
        ref={fg1Ref}
        className="absolute top-60 left-[5%] w-64 h-64 rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/30 to-[var(--color-accent)]/30 border border-[var(--color-border)]"
      />
      <div
        ref={fg2Ref}
        className="absolute top-80 right-[10%] w-48 h-48 rounded-full bg-gradient-to-br from-[var(--color-accent)]/20 to-pink-600/20 border border-[var(--color-border)]"
      />
      <div className="h-[70vh]" />
    </div>
  )
}
`;export{r as default};
