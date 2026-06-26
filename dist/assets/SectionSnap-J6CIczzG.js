const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SECTIONS = [
  { gradient: 'from-[var(--color-primary)] to-blue-900', label: 'Section One' },
  { gradient: 'from-[var(--color-accent)] to-purple-900', label: 'Section Two' },
  { gradient: 'from-emerald-500 to-teal-900', label: 'Section Three' },
  { gradient: 'from-amber-500 to-orange-900', label: 'Section Four' },
  { gradient: 'from-rose-500 to-pink-900', label: 'Section Five' },
]

export default function SectionSnap() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      panelsRef.current.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: 'top center',
          end: 'bottom center',
          onToggle: self => {
            if (self.isActive) {
              gsap.to(panel, { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' })
            } else {
              gsap.to(panel, { scale: 0.95, opacity: 0.7, duration: 0.3 })
            }
          },
        })
      })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        snap: {
          snapTo: [0, 0.25, 0.5, 0.75, 1],
          duration: 0.6,
          ease: 'power2.inOut',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[150vh] py-24 px-8 flex flex-col items-center bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-16">Section Snap</h2>
      <div className="flex flex-col w-full max-w-5xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        {SECTIONS.map((s, i) => (
          <div
            key={i}
            ref={el => { if (el) panelsRef.current[i] = el }}
            className={\`min-h-[80vh] w-full bg-gradient-to-br p-12 flex flex-col items-center justify-center relative overflow-hidden \${s.gradient}\`}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter relative z-10 drop-shadow-2xl">{s.label}</h3>
            <p className="text-white/70 mt-6 text-xl max-w-lg text-center relative z-10">Snap precisely to full-height sections as you scroll.</p>
          </div>
        ))}
      </div>
      <div className="h-48" />
    </div>
  )
}
`;export{e as default};
