import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ClipPathReveal() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el, i) => {
        gsap.fromTo(el,
          { clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)' },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
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
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-16">Clip Path Reveal</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
        <div
          ref={el => { if (el) itemsRef.current[0] = el }}
          className="h-64 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-purple-600 flex items-center justify-center text-white text-2xl font-bold"
        >
          Clip Reveal
        </div>
        <div
          ref={el => { if (el) itemsRef.current[1] = el }}
          className="h-64 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-pink-600 flex items-center justify-center text-white text-2xl font-bold"
        >
          Clip Reveal
        </div>
        <div
          ref={el => { if (el) itemsRef.current[2] = el }}
          className="h-64 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold"
        >
          Clip Reveal
        </div>
        <div
          ref={el => { if (el) itemsRef.current[3] = el }}
          className="h-64 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-2xl font-bold"
        >
          Clip Reveal
        </div>
      </div>
      <div className="h-24" />
    </div>
  )
}
