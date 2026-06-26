import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function StartEndMarkers() {
  const boxRef = useRef<HTMLDivElement>(null)
  const startRef = useRef<HTMLDivElement>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(boxRef.current, {
        scrollTrigger: {
          trigger: boxRef.current,
          start: 'top 80%',
          end: 'top 20%',
          markers: false,
          toggleActions: 'play none none none'
        },
        scale: 0.3,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4">
      <h2 className="text-3xl font-bold mb-8 text-[var(--color-text)]">2. Start / End Markers</h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        Green and red markers show where the animation starts and ends during scroll.
      </p>
      <div className="h-[40vh]" />
      <div className="relative">
        <div
          ref={startRef}
          className="absolute -top-6 left-0 right-0 text-center text-xs text-[var(--color-success)] font-mono"
        >
          START MARKER
        </div>
        <div
          ref={boxRef}
          className="w-64 h-64 rounded-2xl bg-gradient-to-br from-[var(--color-success)] to-[var(--color-primary)] flex items-center justify-center shadow-lg"
        >
          <span className="text-white font-bold text-xl">Markers Visible</span>
        </div>
        <div
          ref={endRef}
          className="absolute -bottom-6 left-0 right-0 text-center text-xs text-[var(--color-danger)] font-mono"
        >
          END MARKER
        </div>
      </div>
      <div className="h-[30vh]" />
    </div>
  )
}
