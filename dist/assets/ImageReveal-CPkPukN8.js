const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ImageReveal() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement[]>([])
  const overlayRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      containerRef.current.forEach((_, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current[i],
            start: 'top 85%',
            end: 'top 40%',
            toggleActions: 'play none none reverse'
          }
        })
        tl.to(overlayRef.current[i], {
          width: '0%',
          duration: 0.8,
          ease: 'power3.inOut'
        })
        tl.fromTo(containerRef.current[i].querySelector('.image-content'),
          { scale: 1.1 },
          { scale: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const items = [
    { gradient: 'from-[var(--color-primary)] to-blue-800', label: 'Mountain Vista' },
    { gradient: 'from-[var(--color-accent)] to-purple-800', label: 'Ocean Sunset' },
    { gradient: 'from-emerald-600 to-teal-800', label: 'Forest Path' },
  ]

  return (
    <div ref={sectionRef} className="min-h-[120vh] py-24 px-8 flex flex-col items-center bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-16">Image Reveal</h2>
      <div className="flex flex-col gap-10 w-full max-w-4xl">
        {items.map((item, i) => (
          <div
            key={i}
            ref={el => { if (el) containerRef.current[i] = el }}
            className="relative h-64 rounded-xl overflow-hidden"
          >
            <div className={\`image-content absolute inset-0 bg-gradient-to-r \${item.gradient} flex items-center justify-center\`}>
              <span className="text-white text-2xl font-bold">{item.label}</span>
              <svg className="absolute bottom-4 right-4 w-10 h-10 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
            </div>
            <div
              ref={el => { if (el) overlayRef.current[i] = el }}
              className="absolute inset-0 bg-[var(--color-bg)] z-10"
            />
          </div>
        ))}
      </div>
      <div className="h-24" />
    </div>
  )
}
`;export{e as default};
