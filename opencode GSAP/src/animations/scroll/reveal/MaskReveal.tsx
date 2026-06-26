import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function MaskReveal() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el, i) => {
        gsap.fromTo(el,
          { WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 50%, black 50%, black 100%)', maskImage: 'linear-gradient(to right, transparent 0%, transparent 50%, black 50%, black 100%)', WebkitMaskSize: '200% 100%', maskSize: '200% 100%', WebkitMaskPosition: '100% 0%', maskPosition: '100% 0%' },
          {
            WebkitMaskPosition: '0% 0%',
            maskPosition: '0% 0%',
            duration: 1.2,
            ease: 'power3.inOut',
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
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-16">Mask Reveal</h2>
      <div className="flex flex-col gap-8 w-full max-w-4xl">
        <div
          ref={el => { if (el) itemsRef.current[0] = el }}
          className="h-48 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white text-2xl font-bold"
        >
          Mask Slide Reveal
        </div>
        <div
          ref={el => { if (el) itemsRef.current[1] = el }}
          className="h-48 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold"
        >
          Gradient Mask Effect
        </div>
        <div
          ref={el => { if (el) itemsRef.current[2] = el }}
          className="h-48 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 flex items-center justify-center text-white text-2xl font-bold"
        >
          Dramatic Reveal
        </div>
      </div>
      <div className="h-24" />
    </div>
  )
}
