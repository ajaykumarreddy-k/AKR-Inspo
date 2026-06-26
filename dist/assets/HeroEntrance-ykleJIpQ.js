const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroEntrance() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const decorationsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse'
        }
      })

      tl.fromTo(bgRef.current,
        { scale: 1.3, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' }
      )
      tl.fromTo(titleRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power4.out' },
        '-=0.6'
      )
      tl.fromTo(subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )
      tl.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.2'
      )
      decorationsRef.current.forEach((el, i) => {
        tl.fromTo(el,
          { scale: 0, opacity: 0, rotation: -30 },
          { scale: 1, opacity: 0.15, rotation: 0, duration: 0.8, ease: 'back.out(2)' },
          '-=0.8'
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[120vh] py-24 px-8 flex flex-col items-center justify-center bg-[var(--color-bg)] relative overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/20 via-transparent to-[var(--color-accent)]/20"
      />
      <div
        ref={el => { if (el) decorationsRef.current[0] = el }}
        className="absolute top-20 left-20 w-64 h-64 rounded-full border-2 border-[var(--color-primary)] opacity-0"
      />
      <div
        ref={el => { if (el) decorationsRef.current[1] = el }}
        className="absolute bottom-20 right-20 w-96 h-96 rounded-full border-2 border-[var(--color-accent)] opacity-0"
      />
      <div
        ref={el => { if (el) decorationsRef.current[2] = el }}
        className="absolute top-1/2 right-32 w-32 h-32 rounded-full bg-[var(--color-primary)]/10 opacity-0"
      />

      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-16 z-10">Hero Entrance</h2>

      <div className="relative z-10 text-center max-w-4xl">
        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl md:text-7xl font-black text-[var(--color-text)] mb-6 leading-tight"
        >
          Welcome to the{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
            Future
          </span>
        </h1>
        <p
          ref={subtitleRef}
          className="text-xl sm:text-2xl text-[var(--color-text-muted)] mb-10 max-w-2xl mx-auto"
        >
          Experience scroll-driven animations that bring your content to life with GSAP and ScrollTrigger
        </p>
        <div ref={ctaRef}>
          <button className="px-8 py-4 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-shadow cursor-pointer">
            Get Started
          </button>
        </div>
      </div>
      <div className="h-24" />
    </div>
  )
}
`;export{e as default};
