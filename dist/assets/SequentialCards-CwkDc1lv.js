const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SequentialCards() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((el, i) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.15,
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

  const cards = [
    { gradient: 'from-[var(--color-primary)] to-blue-900', title: 'Card One', desc: 'First in sequence' },
    { gradient: 'from-[var(--color-accent)] to-purple-900', title: 'Card Two', desc: 'Follows the first' },
    { gradient: 'from-emerald-500 to-teal-900', title: 'Card Three', desc: 'Third to appear' },
    { gradient: 'from-amber-500 to-orange-900', title: 'Card Four', desc: 'Fourth in line' },
    { gradient: 'from-rose-500 to-pink-900', title: 'Card Five', desc: 'Fifth sequential card' },
    { gradient: 'from-sky-500 to-indigo-900', title: 'Card Six', desc: 'Last but not least' },
  ]

  return (
    <div ref={sectionRef} className="min-h-[120vh] py-24 px-8 flex flex-col items-center bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-16">Sequential Cards</h2>
      <div className="flex flex-col gap-6 w-full max-w-2xl">
        {cards.map((card, i) => (
          <div
            key={i}
            ref={el => { if (el) cardsRef.current[i] = el }}
            className={\`h-24 rounded-xl bg-gradient-to-r \${card.gradient} p-6 flex items-center justify-between shadow-lg\`}
          >
            <h3 className="text-xl font-bold text-white">{card.title}</h3>
            <p className="text-white/80">{card.desc}</p>
          </div>
        ))}
      </div>
      <div className="h-24" />
    </div>
  )
}
`;export{e as default};
