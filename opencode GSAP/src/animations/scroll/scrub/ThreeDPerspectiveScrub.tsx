import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ThreeDPerspectiveScrub() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
        defaults: { ease: 'none' },
      })

      tl.to(cardRef.current, { rotateX: 75, transformOrigin: '50% 50% -200' })
        .to(innerRef.current, { scale: 0.8, opacity: 0.5 }, 0)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4 bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold mb-4 text-[var(--color-text)]">3D Perspective Scrub</h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        A card tilts in 3D space using perspective and rotateX as you scroll.
      </p>
      <div className="h-[20vh]" />
      <div className="perspective-800">
        <div
          ref={cardRef}
          className="w-72 h-96 rounded-2xl bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-border)] border border-[var(--color-border)] flex items-center justify-center shadow-2xl"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div ref={innerRef} className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white text-2xl font-bold">
              3D
            </div>
            <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">Perspective Card</h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Scroll to tilt in 3D space
            </p>
          </div>
        </div>
      </div>
      <div className="h-[40vh]" />
    </div>
  )
}
