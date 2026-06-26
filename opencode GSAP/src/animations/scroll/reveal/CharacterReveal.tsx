import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CharacterReveal() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const charsRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      charsRef.current.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40, rotateX: 90 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.4,
            ease: 'back.out(1.7)',
            delay: i * 0.04,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'top 30%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const text = 'CHARACTERS'

  return (
    <div ref={sectionRef} className="min-h-[120vh] py-24 px-8 flex flex-col items-center justify-center bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-16">Character Reveal</h2>
      <div className="flex flex-wrap justify-center gap-2 max-w-4xl">
        {text.split('').map((char, i) => (
          <span
            key={i}
            ref={el => { if (el) charsRef.current[i] = el }}
            className="inline-block text-6xl sm:text-7xl md:text-8xl font-black text-[var(--color-primary)]"
            style={{ perspective: '400px' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
      <p className="mt-8 text-lg text-[var(--color-text-muted)]">Each character animates in one by one</p>
      <div className="h-24" />
    </div>
  )
}
