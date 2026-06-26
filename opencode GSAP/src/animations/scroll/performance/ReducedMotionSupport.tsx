import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ReducedMotionSupport() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const box1Ref = useRef<HTMLDivElement>(null)
  const box2Ref = useRef<HTMLDivElement>(null)
  const box3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)')

      const fullAnim = () => {
        gsap.from(box1Ref.current, {
          scrollTrigger: { trigger: box1Ref.current, start: 'top 85%' },
          scale: 0, rotation: 360, duration: 1, ease: 'back.out(1.7)'
        })
        gsap.from(box2Ref.current, {
          scrollTrigger: { trigger: box2Ref.current, start: 'top 85%' },
          y: 100, opacity: 0, duration: 0.8, ease: 'power2.out'
        })
        gsap.from(box3Ref.current, {
          scrollTrigger: { trigger: box3Ref.current, start: 'top 85%' },
          x: -80, opacity: 0, duration: 0.8, ease: 'power2.out'
        })
      }

      const reducedAnim = () => {
        gsap.set(box1Ref.current, { opacity: 1 })
        gsap.set(box2Ref.current, { opacity: 1 })
        gsap.set(box3Ref.current, { opacity: 1 })
        gsap.from(box1Ref.current, {
          scrollTrigger: { trigger: box1Ref.current, start: 'top 85%' },
          opacity: 0, duration: 0.3
        })
        gsap.from(box2Ref.current, {
          scrollTrigger: { trigger: box2Ref.current, start: 'top 85%' },
          opacity: 0, duration: 0.3
        })
        gsap.from(box3Ref.current, {
          scrollTrigger: { trigger: box3Ref.current, start: 'top 85%' },
          opacity: 0, duration: 0.3
        })
      }

      const apply = () => (prefersReduced.matches ? reducedAnim() : fullAnim())
      apply()
      prefersReduced.addEventListener('change', apply)

      return () => prefersReduced.removeEventListener('change', apply)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4">
      <h2 className="text-3xl font-bold mb-2 text-[var(--color-text)]">ReducedMotionSupport</h2>
      <p className="text-[var(--color-text-muted)] mb-4 text-center max-w-lg">
        Respects <code className="text-[var(--color-accent)]">prefers-reduced-motion</code> —
        disables scale/rotation/translation.
      </p>
      <div className="h-[20vh]" />
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
        <div ref={box1Ref} className="flex-1 h-40 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white font-bold shadow-lg">
          Scale+Rotate
        </div>
        <div ref={box2Ref} className="flex-1 h-40 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text)] font-bold shadow-sm">
          Slide Up
        </div>
        <div ref={box3Ref} className="flex-1 h-40 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text)] font-bold shadow-sm">
          Slide Left
        </div>
      </div>
      <div className="h-[30vh]" />
    </div>
  )
}
