import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function StrokeDrawing() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        webkitTextStrokeWidth: '0px',
        color: 'var(--color-text)',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="min-h-[150vh] py-32 px-8 flex flex-col items-center justify-center bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-24">Stroke Drawing</h2>
      <div className="max-w-5xl text-center">
        <h3
          ref={textRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight py-8"
          style={{
            WebkitTextStrokeColor: 'var(--color-accent)',
            WebkitTextStrokeWidth: '3px',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            transition: 'color 0.2s'
          }}
        >
          STROKE
        </h3>
        <p className="mt-8 text-lg text-[var(--color-text-muted)]">
          The outline fills in with color as you scroll — stroke to solid
        </p>
      </div>
      <div className="h-32" />
      <div className="max-w-3xl text-center space-y-6">
        <p className="text-xl text-[var(--color-text-muted)] leading-relaxed">
          A dramatic transition from outlined wireframe to fully painted typography.
          The stroke recedes and the fill emerges — like ink bleeding into paper.
        </p>
        <p className="text-2xl font-bold text-[var(--color-accent)]">Scroll up to reverse the effect</p>
      </div>
      <div className="h-24" />
    </section>
  )
}
