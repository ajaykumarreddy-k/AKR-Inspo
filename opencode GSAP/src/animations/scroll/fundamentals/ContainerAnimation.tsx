import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ContainerAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(boxRef.current, {
        scrollTrigger: {
          trigger: boxRef.current,
          containerAnimation: undefined,
          scroller: containerRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1
        },
        y: 100,
        opacity: 0,
        scale: 0.6,
        duration: 1,
        ease: 'none'
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-start pt-32 px-4">
      <h2 className="text-3xl font-bold mb-8 text-[var(--color-text)]">9. Container Animation</h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        Animation inside a custom scrolled container rather than the window.
      </p>
      <div
        ref={containerRef}
        className="w-full max-w-lg h-80 overflow-y-auto rounded-2xl border-2 border-[var(--color-border)] bg-[var(--color-surface)] p-4"
      >
        <div className="h-16 flex items-center justify-center text-[var(--color-text-muted)] text-sm">
          Scroll inside this box ↓
        </div>
        <div className="h-32" />
        <div
          ref={boxRef}
          className="w-48 h-48 mx-auto rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center shadow-lg"
        >
          <span className="text-white font-bold text-center text-sm px-4">Inside Container</span>
        </div>
        <div className="h-32" />
      </div>
    </div>
  )
}
