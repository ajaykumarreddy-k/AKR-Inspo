const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function WordReveal() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const wordsRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      wordsRef.current.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power3.out',
            delay: i * 0.12,
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

  const words = 'Words animate in sequence with a smooth stagger effect'.split(' ')

  return (
    <div ref={sectionRef} className="min-h-[120vh] py-24 px-8 flex flex-col items-center justify-center bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-16">Word Reveal</h2>
      <div className="max-w-4xl flex flex-wrap gap-x-3 gap-y-2 justify-center">
        {words.map((word, i) => (
          <span
            key={i}
            ref={el => { if (el) wordsRef.current[i] = el }}
            className="inline-block text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-text)]"
          >
            {word}
          </span>
        ))}
      </div>
      <div className="h-24" />
    </div>
  )
}
`;export{e as default};
