import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CharacterCascade() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const charsRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      charsRef.current.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: -80, scale: 0.2 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'bounce.out',
            delay: i * 0.06,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'top 25%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const text = 'CASCADE'

  return (
    <section ref={sectionRef} className="min-h-[150vh] py-32 px-8 flex flex-col items-center justify-center bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-24">Character Cascade</h2>
      <div className="flex flex-wrap justify-center gap-3 max-w-5xl">
        {text.split('').map((char, i) => (
          <span
            key={i}
            ref={el => { if (el) charsRef.current[i] = el }}
            className="inline-block text-7xl sm:text-8xl md:text-9xl font-black text-[var(--color-primary)]"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
      <p className="mt-12 text-xl text-[var(--color-text-muted)] max-w-xl text-center">
        Each character drops in like a domino, bouncing into place one after another.
      </p>
      <div className="h-32" />
      <p className="text-lg text-[var(--color-accent)] font-semibold">CASCADE — a falling sequence</p>
      <div className="h-24" />
    </section>
  )
}
