import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function LineReveal() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      linesRef.current.forEach((el, i) => {
        gsap.fromTo(el,
          { width: '0%', opacity: 0 },
          {
            width: '100%',
            opacity: 1,
            duration: 1,
            ease: 'power4.out',
            delay: i * 0.2,
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
    'This is the first line of text that reveals with animation.',
    'Here comes the second line, appearing right after.',
    'The third line slides in with perfect timing.',
    'Fourth line continues the rhythmic reveal pattern.',
    'Fifth line keeps the momentum going smoothly.',
    'And finally the sixth line completes the set.'
  ]

  return (
    <div ref={sectionRef} className="min-h-[120vh] py-24 px-8 flex flex-col items-center bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-16">Line Reveal</h2>
      <div className="max-w-3xl flex flex-col gap-2">
        {lines.map((line, i) => (
          <div key={i} className="overflow-hidden">
            <div
              ref={el => { if (el) linesRef.current[i] = el }}
              className="overflow-hidden whitespace-nowrap text-xl sm:text-2xl text-[var(--color-text)] font-medium"
            >
              {line}
            </div>
          </div>
        ))}
      </div>
      <div className="h-24" />
    </div>
  )
}
