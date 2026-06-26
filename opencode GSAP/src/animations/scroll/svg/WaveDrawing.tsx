import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function WaveDrawing() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const wavePathsRef = useRef<SVGPathElement[]>([])

  useEffect(() => {
    if (!sectionRef.current || wavePathsRef.current.length === 0) return

    const ctx = gsap.context(() => {
      wavePathsRef.current.forEach((path) => {
        const length = path.getTotalLength()
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const waves = [
    'M40 160 C130 60 220 260 310 160 C400 60 490 260 560 160',
    'M40 200 C130 100 220 300 310 200 C400 100 490 300 560 200',
    'M40 240 C130 140 220 340 310 240 C400 140 490 340 560 240',
  ]

  const colors = [
    'var(--color-primary)',
    'var(--color-accent)',
    'var(--color-border)',
  ]

  return (
    <div
      ref={sectionRef}
      className="min-h-[150vh] py-24 px-8 flex flex-col items-center justify-center bg-[var(--color-bg)]"
    >
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-16">
        Wave Drawing
      </h2>
      <svg
        viewBox="0 0 600 350"
        className="w-full max-w-lg h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {waves.map((d, i) => (
          <path
            key={i}
            ref={(el) => {
              if (el) wavePathsRef.current[i] = el
            }}
            d={d}
            fill="none"
            stroke={colors[i]}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
      <p className="mt-8 text-[var(--color-text-muted)] text-sm">
        Multiple wave patterns draw progressively
      </p>
    </div>
  )
}
