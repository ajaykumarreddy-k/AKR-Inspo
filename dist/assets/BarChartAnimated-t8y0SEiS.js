const t=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function BarChartAnimated() {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.bar', {
        scaleY: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        transformOrigin: 'bottom center',
      })
    }, chartRef)

    return () => ctx.revert()
  }, [])

  const data = [40, 70, 55, 90, 65, 80]

  return (
    <div ref={chartRef} className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Bar Chart</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Animated bar chart</p>
      <div className="flex items-end gap-2 h-32">
        {data.map((val, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className="bar w-8 bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-accent)] rounded-t-md"
              style={{ height: \`\${val}%\` }}
            />
            <span className="text-xs text-[var(--color-text-muted)]">{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
`;export{t as default};
