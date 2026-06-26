import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SplitTextReveal() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      lineRef.current.forEach((el, i) => {
        gsap.fromTo(el,
          { y: '100%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              end: 'top 50%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const lines = [
    'This text splits into',
    'individual lines that',
    'reveal one after another',
    'as you scroll down',
    'creating a smooth',
    'cinematic experience'
  ]

  return (
    <div ref={sectionRef} className="min-h-[120vh] py-24 px-8 flex flex-col items-center justify-center bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-16">Split Text Reveal</h2>
      <div className="max-w-3xl overflow-hidden">
        {lines.map((line, i) => (
          <div key={i} className="overflow-hidden">
            <span
              ref={el => { if (el) lineRef.current[i] = el }}
              className="inline-block text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-text)] leading-tight"
            >
              {line}
            </span>
          </div>
        ))}
      </div>
      <div className="h-24" />
    </div>
  )
}
