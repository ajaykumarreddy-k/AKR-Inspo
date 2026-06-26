import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function useIntersectionObserver(
  el: React.RefObject<HTMLDivElement | null>,
  callback: () => void
) {
  useEffect(() => {
    const node = el.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      callback()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback()
            observer.unobserve(node)
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [el, callback])
}

export default function IntersectionObserverFallback() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const ioBoxRef = useRef<HTMLDivElement>(null)
  const stBoxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(stBoxRef.current, {
        scrollTrigger: {
          trigger: stBoxRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        x: 200,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useIntersectionObserver(ioBoxRef, () => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ioBoxRef.current,
        { x: -200, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          onComplete: () => ctx.revert()
        }
      )
    }, sectionRef)
  })

  return (
    <div ref={sectionRef} className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4">
      <h2 className="text-3xl font-bold mb-2 text-[var(--color-text)]">IntersectionObserverFallback</h2>
      <p className="text-[var(--color-text-muted)] mb-4 text-center max-w-lg">
        Left box uses IntersectionObserver; right box uses ScrollTrigger.
      </p>
      <div className="h-[20vh]" />
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
        <div
          ref={ioBoxRef}
          className="flex-1 h-48 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text)] font-semibold shadow-sm"
        >
          IntersectionObserver
        </div>
        <div
          ref={stBoxRef}
          className="flex-1 h-48 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text)] font-semibold shadow-sm"
        >
          ScrollTrigger
        </div>
      </div>
      <p className="text-[var(--color-text-muted)] text-xs mt-4">
        IO uses no scroll listener — lighter for non-critical animations
      </p>
      <div className="h-[30vh]" />
    </div>
  )
}
