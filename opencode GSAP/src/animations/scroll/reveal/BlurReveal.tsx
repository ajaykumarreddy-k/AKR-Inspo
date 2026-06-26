import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function BlurReveal() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el, i) => {
        gsap.fromTo(el,
          { filter: 'blur(12px)', opacity: 0 },
          {
            filter: 'blur(0px)',
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'top 40%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[120vh] py-24 px-8 flex flex-col items-center bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-16">Blur Reveal</h2>
      <div className="flex flex-col gap-6 w-full max-w-3xl">
        <div
          ref={el => { if (el) itemsRef.current[0] = el }}
          className="h-40 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-2xl text-[var(--color-text)] font-semibold"
        >
          Focus Sharpens
        </div>
        <div
          ref={el => { if (el) itemsRef.current[1] = el }}
          className="h-40 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-2xl text-[var(--color-text)] font-semibold"
        >
          From Blurry to Clear
        </div>
        <div
          ref={el => { if (el) itemsRef.current[2] = el }}
          className="h-40 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-2xl text-[var(--color-text)] font-semibold"
        >
          Like a Lens Focus
        </div>
        <div
          ref={el => { if (el) itemsRef.current[3] = el }}
          className="h-40 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-2xl text-[var(--color-text)] font-semibold"
        >
          Crystal Clear
        </div>
      </div>
      <div className="h-24" />
    </div>
  )
}
