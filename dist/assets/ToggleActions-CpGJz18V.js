const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const toggleModes = [
  { label: 'play', desc: 'Plays forward' },
  { label: 'reverse', desc: 'Reverses on leave' },
  { label: 'pause', desc: 'Pauses at end' },
  { label: 'reset', desc: 'Resets on leave' }
]

export default function ToggleActions() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const boxes = containerRef.current?.querySelectorAll('.toggle-box')
      if (!boxes) return

      boxes.forEach((box, i) => {
        gsap.from(box, {
          scrollTrigger: {
            trigger: box,
            start: 'top 85%',
            end: 'top 35%',
            toggleActions: i === 0 ? 'play none none none'
              : i === 1 ? 'play reverse play reverse'
              : i === 2 ? 'play pause play pause'
              : 'play reset play reset'
          },
          x: -120,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out'
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4">
      <h2 className="text-3xl font-bold mb-8 text-[var(--color-text)]">3. Toggle Actions</h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        Each box uses a different toggle action combination on enter/leave.
      </p>
      <div className="h-[40vh]" />
      <div ref={containerRef} className="flex flex-col gap-6 w-full max-w-md">
        {toggleModes.map((mode) => (
          <div
            key={mode.label}
            className="toggle-box flex items-center gap-4 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
          >
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex-shrink-0" />
            <div>
              <span className="font-mono text-sm text-[var(--color-accent)]">{mode.label}</span>
              <p className="text-xs text-[var(--color-text-muted)]">{mode.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="h-[30vh]" />
    </div>
  )
}
`;export{e as default};
