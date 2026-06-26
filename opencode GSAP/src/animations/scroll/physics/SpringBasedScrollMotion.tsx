import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SpringBasedScrollMotion() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el) => {
        gsap.fromTo(el,
          { y: 120, scale: 0.6, opacity: 0 },
          {
            y: 0, scale: 1, opacity: 1,
            duration: 1.8,
            ease: 'bounce.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'top 40%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[150vh] py-24 px-8 flex flex-col items-center bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">Spring-Based Scroll Motion</h2>
      <p className="text-[var(--color-text-muted)] mb-16 text-center max-w-md">
        Elements spring into place with bounce physics on scroll entry.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-5xl">
        {['Spring One', 'Spring Two', 'Spring Three', 'Spring Four', 'Spring Five', 'Spring Six'].map((label, i) => (
          <div
            key={i}
            ref={el => { if (el) itemsRef.current[i] = el }}
            className="h-48 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] text-lg shadow-lg"
          >
            {label}
          </div>
        ))}
      </div>
      <div className="h-32" />
    </div>
  )
}
