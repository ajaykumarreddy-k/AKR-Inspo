import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function LazyInitialization() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = triggerRef.current
      if (!el) return

      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          setInitialized(true)
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!initialized) return

    const ctx = gsap.context(() => {
      gsap.from(boxRef.current, {
        scrollTrigger: {
          trigger: boxRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        scale: 0,
        opacity: 0,
        rotation: -15,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [initialized])

  return (
    <div ref={sectionRef} className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4">
      <h2 className="text-3xl font-bold mb-2 text-[var(--color-text)]">LazyInitialization</h2>
      <p className="text-[var(--color-text-muted)] mb-4 text-center max-w-lg">
        ScrollTrigger is created lazily — only after an observer trigger fires.
      </p>
      <div className="h-[20vh]" />
      <div
        ref={triggerRef}
        className="w-full max-w-md p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-center mb-12"
      >
        <p className="text-[var(--color-text)] font-semibold">Observer Trigger (enter once)</p>
        <p className="text-[var(--color-text-muted)] text-sm mt-1">
          {initialized ? 'Animation initialized!' : 'Scroll down to lazily create...'}
        </p>
      </div>
      <div
        ref={boxRef}
        className="w-48 h-48 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center shadow-lg"
      >
        <span className="text-white font-bold text-lg">
          {initialized ? 'Lazy Active' : 'Waiting...'}
        </span>
      </div>
      <div className="h-[30vh]" />
    </div>
  )
}
