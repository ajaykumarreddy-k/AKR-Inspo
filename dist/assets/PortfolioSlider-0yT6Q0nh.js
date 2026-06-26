const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  { title: 'Nebula Dashboard', category: 'Web App', color: 'var(--color-primary)' },
  { title: 'Eco Track', category: 'Mobile', color: 'var(--color-accent)' },
  { title: 'Pixel Studio', category: 'Branding', color: '#e74c3c' },
  { title: 'Cloud Sync', category: 'SaaS', color: '#2ecc71' },
  { title: 'Lumina UI', category: 'Design System', color: '#f39c12' },
  { title: 'Helix Engine', category: 'Backend', color: '#9b59b6' },
  { title: 'Wave FM', category: 'Audio', color: '#1abc9c' },
  { title: 'Orbit CMS', category: 'Full Stack', color: '#e67e22' },
]

export default function PortfolioSlider() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>('.portfolio-slide')
      const totalWidth = slides.reduce((acc, s) => acc + s.offsetWidth, 0)
      const gap = 32
      const scrollDistance = totalWidth + gap * (slides.length - 1) - window.innerWidth

      gsap.to(trackRef.current, {
        x: () => -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => \`+=\${scrollDistance + window.innerHeight}\`,
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
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-8">
        <h2
          className="mb-12 text-4xl font-bold"
          style={{ color: 'var(--color-text)' }}
        >
          Portfolio
        </h2>
        <div
          ref={trackRef}
          className="flex items-center gap-8"
          style={{ willChange: 'transform' }}
        >
          {PROJECTS.map((project, i) => (
            <div
              key={i}
              className="portfolio-slide group relative flex h-96 w-80 flex-shrink-0 flex-col justify-end overflow-hidden rounded-2xl border shadow-xl"
              style={{
                background: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div
                className="absolute inset-0 opacity-20 transition-opacity group-hover:opacity-40"
                style={{ background: project.color }}
              />
              <div className="relative z-10 p-6">
                <span
                  className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{ background: project.color }}
                >
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
`;export{e as default};
