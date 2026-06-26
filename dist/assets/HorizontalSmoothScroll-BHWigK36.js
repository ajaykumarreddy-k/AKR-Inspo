const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  { label: 'Frame 1', color: 'var(--color-primary)' },
  { label: 'Frame 2', color: 'var(--color-accent)' },
  { label: 'Frame 3', color: '#e74c3c' },
  { label: 'Frame 4', color: '#2ecc71' },
  { label: 'Frame 5', color: '#f39c12' },
  { label: 'Frame 6', color: '#9b59b6' },
]

export default function HorizontalSmoothScroll() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>('.h-scroll-slide')
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
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      })

      slides.forEach((slide, i) => {
        gsap.fromTo(
          slide,
          { opacity: 0.3, scale: 0.85 },
          {
            opacity: 1,
            scale: 1,
            ease: 'power1.inOut',
            scrollTrigger: {
              trigger: slide,
              containerAnimation: gsap.getTweensOf(trackRef.current)[0],
              start: 'left center',
              end: 'right center',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[200vh] bg-[var(--color-bg)]"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-center">
          <h2 className="text-3xl font-bold text-[var(--color-text)]">
            Horizontal Smooth Scroll
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Smooth horizontal track with GSAP scrub
          </p>
        </div>
        <div
          ref={trackRef}
          className="flex items-center gap-8 px-8 will-change-transform"
        >
          {ITEMS.map((item, i) => (
            <div
              key={i}
              className="h-scroll-slide flex-shrink-0 w-[28rem] h-80 rounded-3xl border shadow-2xl flex flex-col items-center justify-center"
              style={{
                background: 'var(--color-surface)',
                borderColor: item.color,
              }}
            >
              <div
                className="w-20 h-20 rounded-full mb-4"
                style={{ background: item.color }}
              />
              <span
                className="text-2xl font-bold"
                style={{ color: item.color }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
`;export{e as default};
