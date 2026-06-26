import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ConnectingDots() {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const dotsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const container = containerRef.current
    const svg = svgRef.current
    const dots = dotsRef.current
    if (!container || !svg || !dots.length) return

    const ctx = gsap.context(() => {
      dots.forEach((dot) => {
        gsap.to(dot, {
          y: -10 + Math.random() * 20,
          x: -8 + Math.random() * 16,
          duration: 1.5 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })
    })

    const drawLines = () => {
      const svgRect = svg.getBoundingClientRect()
      const positions = dots.map((dot) => {
        const rect = dot.getBoundingClientRect()
        return { x: rect.left - svgRect.left + rect.width / 2, y: rect.top - svgRect.top + rect.height / 2 }
      })

      let html = ''
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const dx = positions[j].x - positions[i].x
          const dy = positions[j].y - positions[i].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            html += `<line x1="${positions[i].x}" y1="${positions[i].y}" x2="${positions[j].x}" y2="${positions[j].y}" stroke="var(--color-border)" stroke-width="1" />`
          }
        }
      }
      svg.innerHTML = html
      requestAnimationFrame(drawLines)
    }

    drawLines()

    return () => ctx.revert()
  }, [])

  const setDotRef = (el: HTMLDivElement | null, i: number) => {
    if (el) dotsRef.current[i] = el
  }

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center h-64 gap-4 relative overflow-hidden">
      <h2 className="text-xl font-bold text-[var(--color-text)] z-10">Connecting Dots</h2>
      <p className="text-sm text-[var(--color-text-muted)] z-10">Dots with connecting lines</p>
      <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          ref={(el) => setDotRef(el, i)}
          className="absolute w-3 h-3 rounded-full bg-[var(--color-primary)]"
          style={{ top: `${20 + Math.random() * 60}%`, left: `${15 + Math.random() * 70}%` }}
        />
      ))}
    </div>
  )
}
