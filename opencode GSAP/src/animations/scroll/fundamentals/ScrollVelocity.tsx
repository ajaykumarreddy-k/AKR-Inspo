import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollVelocity() {
  const boxRef = useRef<HTMLDivElement>(null)
  const [velocity, setVelocity] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: boxRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          setVelocity(Math.round(self.getVelocity()))
        }
      })

      gsap.from(boxRef.current, {
        scrollTrigger: {
          trigger: boxRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1
        },
        scale: 0.3,
        opacity: 0.2,
        duration: 1,
        ease: 'none'
      })

      return () => st.kill()
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4">
      <h2 className="text-3xl font-bold mb-8 text-[var(--color-text)]">11. Scroll Velocity</h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        Tracks and displays scroll velocity — the speed at which you are scrolling.
      </p>
      <div className="h-[40vh]" />
      <div className="mb-6 text-center">
        <span className="text-sm font-mono text-[var(--color-text-muted)]">
          Velocity: <span className="text-[var(--color-accent)] text-2xl font-bold">{velocity}</span> px/s
        </span>
      </div>
      <div
        ref={boxRef}
        className="w-64 h-64 rounded-2xl bg-gradient-to-br from-[var(--color-warning)] to-[var(--color-danger)] flex items-center justify-center shadow-lg"
      >
        <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      </div>
      <div className="h-[30vh]" />
    </div>
  )
}
