import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SplitTextScrollReveal() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const charsRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(charsRef.current,
        { opacity: 0, y: 60, rotateZ: -15 },
        {
          opacity: 1,
          y: 0,
          rotateZ: 0,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.03,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 35%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const lines = [
    'Ideas dissolve into light,',
    'reassembling as something new.',
    'Each fragment carries a whisper',
    'of the whole.'
  ]

  return (
    <section ref={sectionRef} className="min-h-[150vh] py-32 px-8 flex flex-col items-center justify-center bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-24">Split Text Scroll Reveal</h2>
      <div className="max-w-5xl space-y-6">
        {lines.map((line, lineIdx) => (
          <p key={lineIdx} className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text)] leading-relaxed">
            {line.split('').map((char, charIdx) => (
              <span
                key={`${lineIdx}-${charIdx}`}
                ref={el => { if (el) charsRef.current[lineIdx * 200 + charIdx] = el }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </p>
        ))}
      </div>
      <div className="h-32" />
      <div className="text-[var(--color-text-muted)] text-sm">Characters tumble in with rotation and stagger</div>
      <div className="h-24" />
    </section>
  )
}
