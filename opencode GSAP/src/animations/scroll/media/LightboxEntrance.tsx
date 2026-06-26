import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function LightboxEntrance() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      })

      tl.to(thumbRef.current, {
        scale: 4,
        borderRadius: '0px',
        ease: 'power1.inOut',
      })
      .to(
        overlayRef.current,
        { opacity: 1, ease: 'power1.inOut' },
        0
      )
      .to(
        labelRef.current,
        { opacity: 1, y: 0, ease: 'power1.inOut' },
        0
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4"
      style={{ background: 'var(--color-bg)' }}
    >
      <h2 className="text-3xl font-bold mb-4 text-[var(--color-text)]">
        8. Lightbox Entrance
      </h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        A thumbnail expands to fullscreen as you scroll, simulating a lightbox open.
      </p>
      <div className="h-[15vh]" />
      <div className="relative flex items-center justify-center">
        <div
          ref={overlayRef}
          className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
          style={{
            background: 'rgba(0,0,0,0.85)',
            boxShadow: '0 0 80px rgba(0,0,0,0.6)',
          }}
        />
        <div
          ref={thumbRef}
          className="relative z-10 w-24 h-24 rounded-2xl shadow-2xl flex items-center justify-center cursor-pointer overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
            willChange: 'transform, border-radius',
          }}
        >
          <span className="text-white text-2xl font-bold drop-shadow-lg">+</span>
        </div>
        <span
          ref={labelRef}
          className="absolute -bottom-12 text-sm font-medium opacity-0 translate-y-4"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Scroll to expand
        </span>
      </div>
      <div className="h-[30vh]" />
    </section>
  )
}
