const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CircularProgress() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<SVGCircleElement>(null)
  const textRef = useRef<SVGTextElement>(null)
  const subTextRef = useRef<SVGTextElement>(null)

  useEffect(() => {
    if (
      !sectionRef.current ||
      !ringRef.current ||
      !textRef.current ||
      !subTextRef.current
    )
      return

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
          scrub: 1.5,
          onUpdate: (self) => {
            const pct = Math.round(self.progress * 100)
            if (textRef.current) {
              textRef.current.textContent = \`\${pct}%\`
            }
          },
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const cx = 300
  const cy = 250
  const r = 160

  return (
    <div
      ref={sectionRef}
      className="min-h-[150vh] py-24 px-8 flex flex-col items-center justify-center bg-[var(--color-bg)]"
    >
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-16">
        Circular Progress
      </h2>
      <svg
        viewBox="0 0 600 500"
        className="w-full max-w-sm h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="12"
          opacity="0.3"
        />
        <circle
          ref={ringRef}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="12"
          strokeLinecap="round"
          transform={\`rotate(-90 \${cx} \${cy})\`}
        />
        <circle
          cx={cx}
          cy={cy}
          r={r - 30}
          fill="var(--color-surface)"
          stroke="var(--color-border)"
          strokeWidth="1"
          opacity="0.5"
        />
        <text
          ref={textRef}
          x={cx}
          y={cy - 10}
          textAnchor="middle"
          fill="var(--color-text)"
          fontSize="52"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          0%
        </text>
        <text
          ref={subTextRef}
          x={cx}
          y={cy + 40}
          textAnchor="middle"
          fill="var(--color-text-muted)"
          fontSize="18"
          fontFamily="sans-serif"
        >
          scroll progress
        </text>
      </svg>
      <p className="mt-8 text-[var(--color-text-muted)] text-sm">
        Ring fills clockwise showing scroll percentage
      </p>
    </div>
  )
}
`;export{e as default};
