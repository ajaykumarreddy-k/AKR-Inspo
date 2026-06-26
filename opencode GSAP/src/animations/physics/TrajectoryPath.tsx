import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function TrajectoryPath() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, delay: 0.5 })
      tl.to('.traj-dot', {
        motionPath: {
          path: [
            { x: 0, y: 0 },
            { x: 50, y: -80 },
            { x: 100, y: -60 },
            { x: 150, y: -20 },
            { x: 200, y: 0 },
          ],
          curviness: 1.2,
        },
        duration: 1.5,
        ease: 'power1.inOut',
      })
      tl.to('.traj-dot', {
        opacity: 0,
        duration: 0.3,
      }, '>-0.3')
      tl.set('.traj-dot', { opacity: 1, x: 0, y: 0 })
    })

    const canvas = document.getElementById('traj-canvas') as HTMLCanvasElement
    if (!canvas) return () => ctx.revert()
    const ctx2 = canvas.getContext('2d')
    if (!ctx2) return () => ctx.revert()

    let animId: number
    const drawPath = () => {
      ctx2.clearRect(0, 0, canvas.width, canvas.height)
      ctx2.strokeStyle = 'var(--color-accent)'
      ctx2.lineWidth = 2
      ctx2.setLineDash([4, 4])
      ctx2.beginPath()
      ctx2.moveTo(20, 130)
      ctx2.quadraticCurveTo(70, 20, 120, 60)
      ctx2.quadraticCurveTo(170, 100, 230, 130)
      ctx2.stroke()
      animId = requestAnimationFrame(drawPath)
    }
    drawPath()

    return () => {
      ctx.revert()
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Trajectory Path</h2>
      <div ref={containerRef} className="relative w-full h-44">
        <canvas id="traj-canvas" width="260" height="140" className="absolute inset-0 w-full h-full" />
        <div className="traj-dot absolute w-4 h-4 rounded-full bg-[var(--color-accent)] shadow-[0_0_10px_rgba(34,211,238,0.6)] top-[130px] left-[10px]" />
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Trajectory prediction path</p>
    </div>
  )
}
