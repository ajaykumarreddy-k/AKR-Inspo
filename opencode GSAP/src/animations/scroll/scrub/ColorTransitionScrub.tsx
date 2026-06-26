import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const colors = [
  '#ef4444', '#f97316', '#eab308', '#22c55e',
  '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899',
]

export default function ColorTransitionScrub() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
        backgroundColor: colors[colors.length - 1],
        ease: 'none',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4 bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold mb-4 text-[var(--color-text)]">Color Transition Scrub</h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        The box background cycles through colors smoothly on scroll.
      </p>
      <div className="h-[20vh]" />
      <div
        ref={boxRef}
        className="w-64 h-64 rounded-2xl flex items-center justify-center shadow-2xl"
        style={{ backgroundColor: colors[0] }}
      >
        <span className="text-white font-bold text-xl">Scroll to change color</span>
      </div>
      <div className="h-[40vh]" />
    </div>
  )
}
