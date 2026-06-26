const e=`import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function MagneticSections() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pullZoneRef = useRef<HTMLDivElement>(null)
  const [velocity, setVelocity] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pullZoneRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          setVelocity(Math.round(self.getVelocity()))
        }
      })

      gsap.fromTo(pullZoneRef.current,
        { scale: 0.8, opacity: 0.4 },
        {
          scale: 1, opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: pullZoneRef.current,
            start: 'top 80%',
            end: 'center center',
            scrub: 1.5
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const magnetStrength = Math.min(Math.abs(velocity) / 30, 1)

  return (
    <div ref={sectionRef} className="min-h-[150vh] py-24 px-8 flex flex-col items-center bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">Magnetic Sections</h2>
      <p className="text-[var(--color-text-muted)] mb-16 text-center max-w-md">
        Sections respond to scroll velocity — the faster you scroll, the stronger the magnetic pull.
      </p>
      <div className="h-[20vh]" />
      <div className="mb-6 text-center">
        <span className="text-sm font-mono text-[var(--color-text-muted)]">
          Velocity: <span className="text-[var(--color-accent)] text-2xl font-bold">{velocity}</span> px/s
        </span>
      </div>
      <div
        ref={pullZoneRef}
        className="w-full max-w-3xl h-80 rounded-3xl bg-gradient-to-br from-[var(--color-primary)]/40 to-[var(--color-accent)]/40 border border-[var(--color-border)] flex flex-col items-center justify-center gap-4 shadow-2xl transition-all duration-300"
        style={{
          transform: \`scale(\${1 + magnetStrength * 0.05})\`,
          filter: \`brightness(\${1 + magnetStrength * 0.15})\`
        }}
      >
        <div className="text-5xl" style={{ transform: \`rotate(\${magnetStrength * 8}deg)\` }}>🧲</div>
        <p className="text-[var(--color-text)] text-xl font-semibold">
          Magnetic Pull: {(magnetStrength * 100).toFixed(0)}%
        </p>
        <p className="text-[var(--color-text-muted)] text-sm">Scroll faster for more attraction</p>
      </div>
      <div className="h-[40vh]" />
    </div>
  )
}
`;export{e as default};
