import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function GradientTextAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        backgroundPosition: '200% 50%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="min-h-[150vh] py-32 px-8 flex flex-col items-center justify-center bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-24">Gradient Text Animation</h2>
      <div className="max-w-5xl text-center">
        <h3
          ref={textRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight py-8 bg-clip-text text-transparent"
          style={{
            backgroundImage: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-accent) 25%, var(--color-primary) 50%, var(--color-accent) 75%, var(--color-primary) 100%)',
            backgroundSize: '200% 100%',
            backgroundPosition: '0% 50%'
          }}
        >
          Gradient Shift
        </h3>
        <p className="mt-8 text-lg text-[var(--color-text-muted)]">
          The gradient sweeps across the text as you scroll
        </p>
      </div>
      <div className="h-32" />
      <div className="max-w-3xl text-center">
        <p className="text-xl sm:text-2xl text-[var(--color-text-muted)] leading-relaxed">
          Scroll to see the colors drift from primary to accent and back,
          creating a living, breathing typographic experience.
        </p>
      </div>
      <div className="h-24" />
    </section>
  )
}
