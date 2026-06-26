const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PANELS = [
  { gradient: 'from-[var(--color-primary)] to-blue-900', title: 'Balance', desc: 'Harmony in design' },
  { gradient: 'from-[var(--color-accent)] to-purple-900', title: 'Motion', desc: 'Fluid interactions' },
  { gradient: 'from-emerald-500 to-teal-900', title: 'Depth', desc: 'Layered experiences' },
  { gradient: 'from-amber-500 to-orange-900', title: 'Rhythm', desc: 'Paced storytelling' },
  { gradient: 'from-rose-500 to-pink-900', title: 'Flow', desc: 'Seamless transitions' },
]

export default function FloatingPanels() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      panelsRef.current.forEach((panel, i) => {
        const direction = i % 2 === 0 ? 1 : -1

        gsap.fromTo(panel,
          { y: 0 },
          {
            y: direction * 40,
            ease: 'sine.inOut',
            scrollTrigger: {
              trigger: panel,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        )

        gsap.fromTo(panel,
          { boxShadow: '0 4px 20px rgba(0,0,0,0.3)' },
          {
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            ease: 'sine.inOut',
            scrollTrigger: {
              trigger: panel,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 1,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[150vh] py-24 px-8 flex flex-col items-center bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-16">Floating Panels</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {PANELS.map((panel, i) => (
          <div
            key={i}
            ref={el => { if (el) panelsRef.current[i] = el }}
            className={\`h-56 rounded-2xl bg-gradient-to-br p-6 flex flex-col justify-between shadow-xl border border-white/10 \${panel.gradient}\`}
          >
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white text-xl">&#x25CE;</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{panel.title}</h3>
              <p className="text-white/80">{panel.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="h-48" />
    </div>
  )
}
`;export{e as default};
