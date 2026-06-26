import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function LazyLoadedScrollTrigger() {
  const boxRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  const initScrollTrigger = useCallback(() => {
    gsap.registerPlugin(ScrollTrigger)
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return

    const ctx = gsap.context(() => {
      gsap.from(boxRef.current, {
        scrollTrigger: {
          trigger: boxRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none none'
        },
        y: 80,
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: 'power2.out'
      })
    })

    return () => ctx.revert()
  }, [loaded])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loaded) {
          initScrollTrigger()
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (boxRef.current) {
      observer.observe(boxRef.current)
    }

    return () => observer.disconnect()
  }, [loaded, initScrollTrigger])

  return (
    <div className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4">
      <h2 className="text-3xl font-bold mb-8 text-[var(--color-text)]">18. Lazy Loaded Trigger</h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        ScrollTrigger is only registered and initialized when the box enters the viewport via IntersectionObserver.
      </p>
      <div className="h-[40vh]" />
      <div
        ref={boxRef}
        className="w-64 h-64 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center shadow-lg"
      >
        <span className="text-white font-bold text-center text-sm px-4">
          {loaded ? 'GSAP Loaded ✓' : 'Waiting...'}
        </span>
      </div>
      <div className="h-[30vh]" />
    </div>
  )
}
