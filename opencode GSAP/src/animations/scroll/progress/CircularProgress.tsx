import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CircularProgress() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<SVGCircleElement>(null)
  const textRef = useRef<SVGTextElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !ringRef.current || !textRef.current) return

    const ring = ringRef.current
    const radius = Number(ring.getAttribute('r'))
    const circumference = 2 * Math.PI * radius

    gsap.set(ring, {
      strokeDasharray: circumference,
      strokeDashoffset: circumference,
    })

    const ctx = gsap.context(() => {
      gsap.to(ring, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: (self) => {
            const pct = Math.round(self.progress * 100)
            if (textRef.current) {
              textRef.current.textContent = `${pct}%`
            }
          },
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const cx = 200
  const cy = 200
  const r = 140

  return (
    <div
      ref={sectionRef}
      className="min-h-[200vh] flex flex-col items-center justify-start pt-32 px-8"
      style={{ background: 'var(--color-bg)' }}
    >
      <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
        Circular Progress
      </h1>
      <p className="text-lg mb-12" style={{ color: 'var(--color-text-muted)' }}>
        SVG ring fills based on scroll position
      </p>

      <div
        className="rounded-2xl p-8 border"
        style={{
          background: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
        }}
      >
        <svg
          viewBox="0 0 400 400"
          className="w-full max-w-xs h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="14"
            opacity="0.3"
          />
          <circle
            ref={ringRef}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="14"
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
          />
          <circle
            cx={cx}
            cy={cy}
            r={r - 24}
            fill="var(--color-bg)"
            stroke="var(--color-border)"
            strokeWidth="1"
          />
          <text
            ref={textRef}
            x={cx}
            y={cy - 8}
            textAnchor="middle"
            fill="var(--color-text)"
            fontSize="56"
            fontWeight="bold"
            fontFamily="monospace"
          >
            0%
          </text>
          <text
            x={cx}
            y={cy + 36}
            textAnchor="middle"
            fill="var(--color-text-muted)"
            fontSize="16"
            fontFamily="sans-serif"
          >
            scrolled
          </text>
        </svg>
      </div>

      <div className="flex flex-col gap-6 w-full max-w-md mt-12">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="rounded-xl p-6 border"
            style={{
              background: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text)',
            }}
          >
            <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--color-accent)' }}>
              Chapter {i + 1}
            </h3>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Scroll through each chapter to fill the circular ring.
            </p>
          </div>
        ))}
      </div>

      <div className="h-screen" />
    </div>
  )
}
