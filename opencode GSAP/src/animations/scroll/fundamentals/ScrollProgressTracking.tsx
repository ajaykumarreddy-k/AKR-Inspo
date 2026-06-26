import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollProgressTracking() {
  const boxRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: boxRef.current,
        start: 'top 80%',
        end: 'top 20%',
        onUpdate: (self) => {
          setProgress(Math.round(self.progress * 100))
        }
      })

      gsap.from(boxRef.current, {
        scrollTrigger: {
          trigger: boxRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1
        },
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: 'none'
      })

      return () => st.kill()
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4">
      <h2 className="text-3xl font-bold mb-8 text-[var(--color-text)]">13. Scroll Progress</h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        Live scroll progress displayed as a percentage and a progress bar.
      </p>
      <div className="h-[40vh]" />
      <div className="mb-6 w-64 text-center">
        <div className="w-full h-3 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm font-mono text-[var(--color-text-muted)] mt-2 inline-block">
          Progress: <span className="text-[var(--color-accent)] font-bold">{progress}%</span>
        </span>
      </div>
      <div
        ref={boxRef}
        className="w-64 h-64 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center shadow-lg"
      >
        <span className="text-white font-bold text-4xl">{progress}%</span>
      </div>
      <div className="h-[30vh]" />
    </div>
  )
}
