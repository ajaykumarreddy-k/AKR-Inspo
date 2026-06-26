const t=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function LineChartAnimated() {
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const path = pathRef.current
    if (!path) return

    const length = path.getTotalLength()

    const ctx = gsap.context(() => {
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.inOut',
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Line Chart</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Animated line chart</p>
      <svg className="w-48 h-24" viewBox="0 0 100 50" preserveAspectRatio="none">
        <path
          ref={pathRef}
          d="M0,45 L10,35 L20,40 L30,20 L40,25 L50,10 L60,15 L70,5 L80,20 L90,15 L100,10"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M0,45 L10,35 L20,40 L30,20 L40,25 L50,10 L60,15 L70,5 L80,20 L90,15 L100,10 L100,50 L0,50 Z"
          fill="url(#line-gradient)"
          opacity="0.15"
        />
        <defs>
          <linearGradient id="line-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
`;export{t as default};
