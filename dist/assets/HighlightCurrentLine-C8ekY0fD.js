const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HighlightCurrentLine() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      linesRef.current.forEach((el) => {
        gsap.fromTo(el,
          { color: 'var(--color-text-muted)', scale: 0.95 },
          {
            color: 'var(--color-text)',
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 70%',
              end: 'top 30%',
              scrub: 1,
              toggleActions: 'play none none reverse'
            }
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const lines = [
    'The first line awakens as you scroll toward it,',
    'brightening from a muted whisper into full voice.',
    'Then the second line catches the light,',
    'each word sharpening as it enters the stage.',
    'The third line waits its turn patiently,',
    'knowing its moment arrives with each pixel scrolled.',
    'By the fourth, a rhythm emerges —',
    'a conversation between text and motion.',
    'The fifth line arrives with quiet confidence,',
    'proof that timing is everything in storytelling.',
    'And the sixth seals the thought,',
    'leaving an echo that lingers after the scroll stops.'
  ]

  return (
    <section ref={sectionRef} className="min-h-[150vh] py-32 px-8 flex flex-col items-center justify-center bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-24">Highlight Current Line</h2>
      <div className="max-w-3xl space-y-3">
        {lines.map((line, i) => (
          <p key={i} className="text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed">
            <span
              ref={el => { if (el) linesRef.current[i] = el }}
              className="transition-colors duration-300"
            >
              {line}
            </span>
          </p>
        ))}
      </div>
      <p className="mt-12 text-base text-[var(--color-text-muted)]">
        Each line highlights as it enters the viewport
      </p>
      <div className="h-24" />
    </section>
  )
}
`;export{e as default};
