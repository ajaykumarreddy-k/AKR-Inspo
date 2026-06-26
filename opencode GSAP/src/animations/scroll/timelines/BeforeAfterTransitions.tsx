import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function BeforeAfterTransitions() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const beforeRef = useRef<HTMLDivElement>(null)
  const afterRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: true
        }
      })

      tl.to(afterRef.current, { width: '100%', duration: 1, ease: 'none' })
      tl.to(handleRef.current, { left: '100%', duration: 1, ease: 'none' }, 0)
      tl.to(labelRef.current, { opacity: 0, duration: 0.3 }, 0.7)
      tl.fromTo(beforeRef.current, { opacity: 0.3 }, { opacity: 1, duration: 0.5 }, 0.5)
      tl.to(beforeRef.current, { opacity: 0.3, duration: 0.3 }, 0.8)
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[200vh] flex flex-col items-center justify-center px-4 bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold mb-6 text-[var(--color-text)]">Before / After Transitions</h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-lg">
        Scroll to reveal the after state sliding over the before state.
      </p>
      <div ref={containerRef} className="relative w-80 h-64 rounded-2xl overflow-hidden shadow-lg border-2 border-[var(--color-border)]">
        <div ref={beforeRef} className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
          <span className="text-white font-bold text-xl opacity-50">BEFORE</span>
        </div>
        <div ref={afterRef} className="absolute inset-0 w-0 overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center">
          <span className="text-white font-bold text-xl">AFTER</span>
        </div>
        <div ref={handleRef} className="absolute top-0 bottom-0 left-0 w-1 bg-white shadow-lg" />
        <div ref={labelRef} className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 text-white text-xs font-semibold">
          Scroll to compare
        </div>
      </div>
    </div>
  )
}
