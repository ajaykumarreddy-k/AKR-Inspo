import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MOBILE_BREAKPOINT = 768

export default function MobileOptimizations() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const heavyRef = useRef<HTMLDivElement>(null)
  const lightRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT

      if (isMobile) {
        gsap.set(heavyRef.current, { opacity: 1 })
        gsap.set(lightRef.current, { opacity: 1 })

        gsap.from(heavyRef.current, {
          scrollTrigger: { trigger: heavyRef.current, start: 'top 85%' },
          opacity: 0,
          duration: 0.3
        })
        gsap.from(lightRef.current, {
          scrollTrigger: { trigger: lightRef.current, start: 'top 85%' },
          opacity: 0,
          duration: 0.3
        })
      } else {
        gsap.from(heavyRef.current, {
          scrollTrigger: { trigger: heavyRef.current, start: 'top 85%' },
          scale: 0, rotation: 360, borderRadius: '50%',
          duration: 1.2, ease: 'elastic.out(1, 0.5)'
        })

        gsap.from(lightRef.current, {
          scrollTrigger: { trigger: lightRef.current, start: 'top 85%' },
          y: 80, opacity: 0, duration: 0.8, ease: 'power2.out'
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4">
      <h2 className="text-3xl font-bold mb-2 text-[var(--color-text)]">MobileOptimizations</h2>
      <p className="text-[var(--color-text-muted)] mb-4 text-center max-w-lg">
        Heavy effects (scale/rotation) disabled below {MOBILE_BREAKPOINT}px viewport.
      </p>
      <div className="h-[20vh]" />
      <div
        ref={infoRef}
        className="w-full max-w-md mb-8 p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-center text-sm text-[var(--color-text-muted)]"
      >
        Current width: <span className="font-mono text-[var(--color-text)]">{typeof window !== 'undefined' ? window.innerWidth : '--'}px</span>
        {' — '}
        {typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT ? (
          <span className="text-[var(--color-accent)]">Mobile mode (heavy effects off)</span>
        ) : (
          <span className="text-[var(--color-primary)]">Desktop mode (full effects)</span>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
        <div
          ref={heavyRef}
          className="flex-1 h-48 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white font-bold shadow-lg"
        >
          Heavy Effect
        </div>
        <div
          ref={lightRef}
          className="flex-1 h-48 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text)] font-bold shadow-sm"
        >
          Light Effect
        </div>
      </div>
      <div className="h-[30vh]" />
    </div>
  )
}
