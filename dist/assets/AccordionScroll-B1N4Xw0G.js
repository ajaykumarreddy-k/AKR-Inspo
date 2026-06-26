const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SECTIONS = [
  { title: 'Discovery', desc: 'Understanding the problem space through research and analysis.' },
  { title: 'Ideation', desc: 'Generating creative solutions through brainstorming and sketching.' },
  { title: 'Prototyping', desc: 'Building rapid iterations to test and validate concepts.' },
  { title: 'Development', desc: 'Engineering the final solution with clean, scalable code.' },
  { title: 'Launch', desc: 'Releasing to production and monitoring performance metrics.' },
]

export default function AccordionScroll() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const accordionRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      accordionRef.current.forEach((el, i) => {
        const content = el.querySelector('.accordion-content') as HTMLElement
        if (!content) return

        gsap.fromTo(content,
          { height: 0, opacity: 0, padding: '0 1.5rem' },
          {
            height: 'auto',
            opacity: 1,
            padding: '1.5rem',
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              end: 'top 30%',
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
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-16">Accordion Scroll</h2>
      <div className="flex flex-col gap-4 w-full max-w-2xl">
        {SECTIONS.map((section, i) => (
          <div
            key={i}
            ref={el => { if (el) accordionRef.current[i] = el }}
            className="rounded-xl border overflow-hidden"
            style={{
              background: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="px-6 py-4 flex items-center gap-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                style={{ background: 'var(--color-primary)' }}
              >
                {i + 1}
              </span>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>{section.title}</h3>
            </div>
            <div className="accordion-content overflow-hidden">
              <p className="leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{section.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="h-48" />
    </div>
  )
}
`;export{e as default};
