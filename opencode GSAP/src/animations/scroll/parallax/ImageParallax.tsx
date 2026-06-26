import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ImageParallax() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        yPercent: 30,
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      })
      gsap.to(overlayRef.current, {
        opacity: 0.6,
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'center center', scrub: true }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4 bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold mb-4 z-10 text-[var(--color-text)]">Image Parallax</h2>
      <p className="text-[var(--color-text-muted)] mb-8 z-10 text-center max-w-md">
        A simulated image moves slower than the scroll.
      </p>
      <div className="relative w-full max-w-3xl h-[50vh] rounded-2xl overflow-hidden border border-[var(--color-border)]">
        <div
          ref={imageRef}
          className="absolute inset-0 bg-gradient-to-br from-emerald-800 via-teal-700 to-cyan-600 bg-cover bg-center"
          style={{ height: '130%', top: '-15%' }}
        />
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/80 to-transparent opacity-0"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white/80 text-lg font-medium tracking-widest uppercase">Mountain Vista</span>
        </div>
      </div>
      <div className="h-[40vh]" />
    </div>
  )
}
