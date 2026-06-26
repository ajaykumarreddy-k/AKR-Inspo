const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const pinData = [
  { color: 'from-[var(--color-primary)] to-[var(--color-accent)]', label: 'Section A' },
  { color: 'from-[var(--color-warning)] to-[var(--color-danger)]', label: 'Section B' },
  { color: 'from-[var(--color-success)] to-[var(--color-primary)]', label: 'Section C' }
]

export default function PinSpacing() {
  const sectionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = sectionsRef.current?.querySelectorAll('.pin-section')
      if (!sections) return

      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: '+=200',
          pin: true,
          pinSpacing: true,
          markers: false
        })
      })
    }, sectionsRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-[250vh] flex flex-col items-center justify-start pt-32 px-4">
      <h2 className="text-3xl font-bold mb-8 text-[var(--color-text)]">6. Pin Spacing</h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        Multiple pinned sections stacked — each pins in sequence with automatic spacing.
      </p>
      <div className="h-[20vh]" />
      <div ref={sectionsRef} className="w-full max-w-lg">
        {pinData.map((p) => (
          <div
            key={p.label}
            className={\`pin-section w-full h-64 rounded-2xl bg-gradient-to-br \${p.color} flex items-center justify-center shadow-lg mb-4\`}
          >
            <span className="text-white font-bold text-2xl">{p.label}</span>
          </div>
        ))}
      </div>
      <div className="h-[30vh]" />
    </div>
  )
}
`;export{e as default};
