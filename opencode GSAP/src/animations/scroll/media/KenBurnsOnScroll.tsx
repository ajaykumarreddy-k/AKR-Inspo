import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function KenBurnsOnScroll() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        scale: 1.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4 overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      <h2 className="text-3xl font-bold mb-4 text-[var(--color-text)] relative z-10">
        1. Ken Burns On Scroll
      </h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md relative z-10">
        A simulated Ken Burns effect — the gradient image zooms and pans as you scroll.
      </p>
      <div className="h-[20vh]" />
      <div
        ref={imageRef}
        className="w-[32rem] h-[24rem] rounded-2xl shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent), #ff6b6b)',
          willChange: 'transform',
        }}
      />
      <div className="h-[30vh]" />
    </section>
  )
}
