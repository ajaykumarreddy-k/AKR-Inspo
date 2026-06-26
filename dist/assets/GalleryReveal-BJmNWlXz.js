const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function GalleryReveal() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'top 40%',
            toggleActions: 'play none none reverse'
          }
        })
        tl.fromTo(el.querySelector('.curtain'),
          { width: '100%' },
          { width: '0%', duration: 0.8, ease: 'power3.inOut' }
        )
        tl.fromTo(el.querySelector('.gallery-content'),
          { scale: 1.2, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const items = [
    { gradient: 'from-[var(--color-primary)] to-blue-800', label: 'Gallery Item 1' },
    { gradient: 'from-[var(--color-accent)] to-purple-800', label: 'Gallery Item 2' },
    { gradient: 'from-emerald-600 to-teal-800', label: 'Gallery Item 3' },
    { gradient: 'from-amber-600 to-orange-800', label: 'Gallery Item 4' },
    { gradient: 'from-rose-600 to-pink-800', label: 'Gallery Item 5' },
    { gradient: 'from-sky-600 to-indigo-800', label: 'Gallery Item 6' },
  ]

  return (
    <div ref={sectionRef} className="min-h-[120vh] py-24 px-8 flex flex-col items-center bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-16">Gallery Reveal</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {items.map((item, i) => (
          <div
            key={i}
            ref={el => { if (el) itemsRef.current[i] = el }}
            className="relative h-56 rounded-xl overflow-hidden"
          >
            <div className={\`gallery-content absolute inset-0 bg-gradient-to-br \${item.gradient} flex items-center justify-center text-white text-lg font-bold\`}>
              {item.label}
            </div>
            <div className="curtain absolute inset-0 bg-[var(--color-bg)] z-10" />
          </div>
        ))}
      </div>
      <div className="h-24" />
    </div>
  )
}
`;export{e as default};
