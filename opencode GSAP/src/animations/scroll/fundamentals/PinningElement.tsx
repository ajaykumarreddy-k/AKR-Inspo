import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PinningElement() {
  const pinRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top top',
        end: 'bottom 20%',
        pin: true,
        pinSpacing: true,
        markers: false
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4">
      <h2 className="text-3xl font-bold mb-8 text-[var(--color-text)]">5. Pinning Element</h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        This panel stays pinned (fixed) in place while the rest of the page scrolls.
      </p>
      <div className="h-[40vh]" />
      <div
        ref={pinRef}
        className="w-72 h-72 rounded-2xl bg-gradient-to-br from-[var(--color-warning)] to-[var(--color-danger)] flex items-center justify-center shadow-lg"
      >
        <div className="text-center text-white">
          <svg className="w-12 h-12 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <span className="font-bold text-lg">Pinned</span>
          <p className="text-sm opacity-80 mt-1">Stays in place</p>
        </div>
      </div>
      <div className="h-[30vh]" />
    </div>
  )
}
