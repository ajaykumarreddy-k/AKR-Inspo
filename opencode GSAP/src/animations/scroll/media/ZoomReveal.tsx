import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ZoomReveal() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { scale: 0.2, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'top 30%',
            scrub: 1,
          },
        }
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
        3. Zoom Reveal
      </h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        Image zooms from tiny to full size as it scrolls into view.
      </p>
      <div className="h-[20vh]" />
      <div
        ref={imageRef}
        className="w-[32rem] h-[20rem] rounded-2xl shadow-2xl flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary), #667eea)',
          willChange: 'transform',
        }}
      >
        <span className="text-white text-2xl font-bold opacity-60">ZOOM</span>
      </div>
      <div className="h-[30vh]" />
    </section>
  )
}
