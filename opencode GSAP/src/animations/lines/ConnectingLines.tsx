import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ConnectingLines() {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const svg = svgRef.current
    if (!container || !svg) return

    const nodes: HTMLDivElement[] = []
    for (let i = 0; i < 5; i++) {
      const node = document.createElement('div')
      node.className = 'absolute w-4 h-4 rounded-full bg-[var(--color-primary)]'
      node.style.left = `${10 + i * 20}%`
      node.style.top = `${20 + Math.random() * 60}%`
      container.appendChild(node)
      nodes.push(node)
    }

    const ctx = gsap.context(() => {
      nodes.forEach((node) => {
        gsap.to(node, {
          y: -15 + Math.random() * 30,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })
    })

    const drawLines = () => {
      const svgRect = svg.getBoundingClientRect()
      const positions = nodes.map((n) => {
        const rect = n.getBoundingClientRect()
        return { x: rect.left - svgRect.left + 8, y: rect.top - svgRect.top + 8 }
      })

      let html = ''
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          html += `<line x1="${positions[i].x}" y1="${positions[i].y}" x2="${positions[j].x}" y2="${positions[j].y}" stroke="var(--color-border)" stroke-width="1.5" stroke-dasharray="4 4" />`
        }
      }
      svg.innerHTML = html
      requestAnimationFrame(drawLines)
    }

    drawLines()

    return () => {
      ctx.revert()
      nodes.forEach((n) => n.remove())
    }
  }, [])

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center h-64 gap-4 relative overflow-hidden bg-[var(--color-bg)]">
      <h2 className="text-xl font-bold text-[var(--color-text)] z-10">Connecting Lines</h2>
      <p className="text-sm text-[var(--color-text-muted)] z-10">Animated connecting lines between nodes</p>
      <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  )
}
