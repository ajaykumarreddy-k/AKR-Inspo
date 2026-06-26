const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  { gradient: 'from-[var(--color-primary)] to-blue-900', title: 'Innovation', desc: 'Pushing boundaries' },
  { gradient: 'from-[var(--color-accent)] to-purple-900', title: 'Creativity', desc: 'Thinking differently' },
  { gradient: 'from-emerald-500 to-teal-900', title: 'Precision', desc: 'Attention to detail' },
  { gradient: 'from-amber-500 to-orange-900', title: 'Velocity', desc: 'Speed of execution' },
  { gradient: 'from-rose-500 to-pink-900', title: 'Impact', desc: 'Measurable results' },
]

export default function ExpandingCards() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { width: '4rem', opacity: 0.4 },
          {
            width: '100%',
            opacity: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              end: 'top 40%',
              scrub: 1.5,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[150vh] py-24 px-8 flex flex-col items-center bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-16">Expanding Cards</h2>
      <div className="flex flex-row gap-4 w-full max-w-5xl h-[400px]">
        {CARDS.map((card, i) => (
          <div
            key={i}
            ref={el => { if (el) cardsRef.current[i] = el }}
            className={\`relative rounded-3xl bg-gradient-to-br flex flex-col justify-end p-8 shadow-2xl overflow-hidden cursor-pointer group \${card.gradient}\`}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            <div className="relative z-10 flex items-center gap-4 min-w-[200px]">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold shrink-0">
                0{i + 1}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white whitespace-nowrap">{card.title}</h3>
                <p className="text-white/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">{card.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="h-48" />
    </div>
  )
}
`;export{e as default};
