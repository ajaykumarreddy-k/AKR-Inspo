import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function MasonryReveal() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el, i) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'back.out(1.7)',
            delay: i * 0.08,
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              end: 'top 50%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const items = [
    { h: 'h-48', gradient: 'from-[var(--color-primary)] to-blue-700' },
    { h: 'h-64', gradient: 'from-[var(--color-accent)] to-purple-700' },
    { h: 'h-40', gradient: 'from-emerald-500 to-teal-600' },
    { h: 'h-56', gradient: 'from-amber-500 to-orange-600' },
    { h: 'h-72', gradient: 'from-rose-500 to-pink-600' },
    { h: 'h-48', gradient: 'from-sky-500 to-indigo-600' },
    { h: 'h-56', gradient: 'from-lime-500 to-green-600' },
    { h: 'h-40', gradient: 'from-cyan-500 to-blue-600' },
  ]

  return (
    <div ref={sectionRef} className="min-h-[120vh] py-24 px-8 flex flex-col items-center bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-16">Masonry Reveal</h2>
      <div className="columns-2 sm:columns-3 gap-4 w-full max-w-5xl">
        {items.map((item, i) => (
          <div
            key={i}
            ref={el => { if (el) itemsRef.current[i] = el }}
            className={`${item.h} mb-4 break-inside-avoid rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white text-lg font-bold shadow-lg`}
          >
            Item {i + 1}
          </div>
        ))}
      </div>
      <div className="h-24" />
    </div>
  )
}
