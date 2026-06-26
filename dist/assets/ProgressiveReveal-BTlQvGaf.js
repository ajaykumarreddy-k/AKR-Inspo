const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  { gradient: 'from-[var(--color-primary)] to-blue-900', title: 'Alpha', desc: 'First principles' },
  { gradient: 'from-[var(--color-accent)] to-purple-900', title: 'Beta', desc: 'Iterative testing' },
  { gradient: 'from-emerald-500 to-teal-900', title: 'Gamma', desc: 'Refining the approach' },
  { gradient: 'from-amber-500 to-orange-900', title: 'Delta', desc: 'Scaling up' },
  { gradient: 'from-rose-500 to-pink-900', title: 'Epsilon', desc: 'Polishing details' },
  { gradient: 'from-sky-500 to-indigo-900', title: 'Zeta', desc: 'Final delivery' },
  { gradient: 'from-violet-500 to-fuchsia-900', title: 'Eta', desc: 'Continuous evolution' },
]

export default function ProgressiveReveal() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { x: -80, opacity: 0, scale: 0.9, filter: 'blur(4px)' },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              end: 'top 40%',
              scrub: 1.2,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[150vh] py-24 px-8 flex flex-col items-center bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-16">Progressive Reveal</h2>
      <div className="flex flex-col gap-6 w-full max-w-2xl">
        {CARDS.map((card, i) => (
          <div
            key={i}
            ref={el => { if (el) cardsRef.current[i] = el }}
            className="group h-28 rounded-2xl bg-[var(--color-surface)] border border-white/5 p-6 flex items-center justify-between shadow-2xl relative overflow-hidden"
          >
            <div className={\`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-r \${card.gradient}\`} />
            
            <div className="flex items-center gap-6 relative z-10">
              <div className={\`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg bg-gradient-to-br \${card.gradient}\`}>
                {String.fromCharCode(65 + i)}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-text)] mb-1">{card.title}</h3>
                <p className="text-[var(--color-text-muted)]">{card.desc}</p>
              </div>
            </div>
            
            <div className={\`w-2 h-full absolute right-0 top-0 opacity-50 bg-gradient-to-b \${card.gradient}\`} />
          </div>
        ))}
      </div>
      <div className="h-48" />
    </div>
  )
}
`;export{e as default};
