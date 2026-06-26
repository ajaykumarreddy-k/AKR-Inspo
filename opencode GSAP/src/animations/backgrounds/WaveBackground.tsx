import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function WaveBackground() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll('path')
    if (!paths?.length) return

    const ctx = gsap.context(() => {
      paths.forEach((path, i) => {
        gsap.to(path, {
          duration: 3 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          attr: { d: `M0,50 Q${25 + Math.random() * 50},${20 + Math.random() * 30} 100,50` },
          delay: i * 0.3,
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative flex flex-col items-center justify-center h-64 overflow-hidden bg-[var(--color-bg)]">
      <h2 className="text-xl font-bold text-[var(--color-text)] z-10 mb-2">Wave Background</h2>
      <p className="text-sm text-[var(--color-text-muted)] z-10">Animated wave background</p>
      <svg ref={svgRef} className="absolute bottom-0 w-full h-24" viewBox="0 0 100 50" preserveAspectRatio="none">
        <path d="M0,50 Q25,20 50,50 Q75,80 100,50" fill="none" stroke="var(--color-primary)" strokeWidth="2" opacity="0.5" />
        <path d="M0,50 Q25,30 50,50 Q75,70 100,50" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.3" />
      </svg>
    </div>
  )
}
