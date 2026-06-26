const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  { title: 'Design', desc: 'Clean and modern UI/UX design principles for digital products.' },
  { title: 'Develop', desc: 'Robust front-end and back-end solutions using cutting-edge tech.' },
  { title: 'Deploy', desc: 'Seamless CI/CD pipelines and cloud infrastructure management.' },
  { title: 'Scale', desc: 'Performance optimization and scalable architecture patterns.' },
  { title: 'Maintain', desc: 'Ongoing support, monitoring, and iterative improvements.' },
]

export default function HorizontalCards() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.hcard')
      const cardWidth = cards[0]?.offsetWidth ?? 320
      const gap = 24
      const totalScroll = cards.length * (cardWidth + gap) - window.innerWidth

      gsap.to(containerRef.current, {
        x: () => -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => \`+=\${totalScroll + window.innerHeight}\`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[200vh]"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <h2
          className="absolute left-8 top-8 z-10 text-4xl font-bold"
          style={{ color: 'var(--color-text)' }}
        >
          Horizontal Cards
        </h2>
        <div
          ref={containerRef}
          className="flex h-full items-center gap-6 px-8 pt-20"
          style={{ willChange: 'transform' }}
        >
          {CARDS.map((card, i) => (
            <div
              key={i}
              className="hcard flex h-72 w-80 flex-shrink-0 flex-col items-center justify-center rounded-2xl border p-8 text-center shadow-lg"
              style={{
                background: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div
                className="mb-4 flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold text-white"
                style={{ background: 'var(--color-primary)' }}
              >
                {i + 1}
              </div>
              <h3 className="mb-2 text-xl font-semibold" style={{ color: 'var(--color-text)' }}>
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
`;export{e as default};
