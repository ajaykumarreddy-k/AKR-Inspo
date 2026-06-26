import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MILESTONES = [
  { year: '2018', title: 'Founded', desc: 'Company incorporation' },
  { year: '2019', title: 'Seed Round', desc: 'Raised $2M in funding' },
  { year: '2020', title: 'Launch', desc: 'First product released' },
  { year: '2021', title: 'Series A', desc: 'Raised $15M, 50 employees' },
  { year: '2022', title: 'Expansion', desc: 'Opened 3 international offices' },
  { year: '2023', title: 'Series B', desc: 'Raised $50M, unicorn status' },
  { year: '2024', title: 'IPO', desc: 'Public listing achieved' },
]

export default function TimelineProgress() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeMilestone, setActiveMilestone] = useState(-1)

  useEffect(() => {
    const ctx = gsap.context(() => {
      MILESTONES.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: `${10 + i * 12}%`,
          end: `${10 + (i + 1) * 12}%`,
          onToggle: (self) => {
            if (self.isActive) setActiveMilestone(i)
          },
        })
      })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          if (trackRef.current) {
            trackRef.current.style.width = `${self.progress * 100}%`
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      className="min-h-[200vh] relative"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="sticky top-0 z-40 w-full pt-8 pb-4 px-4" style={{ background: 'var(--color-bg)' }}>
        <h1 className="text-4xl font-bold mb-2 text-center" style={{ color: 'var(--color-primary)' }}>
          Timeline Progress
        </h1>
        <p className="text-lg mb-8 text-center" style={{ color: 'var(--color-text-muted)' }}>
          Horizontal timeline fills as you reach milestones
        </p>

        <div className="relative w-full max-w-4xl mx-auto">
          <div className="absolute top-4 left-0 right-0 h-1 rounded-full" style={{ background: 'var(--color-border)' }}>
            <div
              ref={trackRef}
              className="h-full rounded-full transition-all duration-150"
              style={{
                width: '0%',
                background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
              }}
            />
          </div>
          <div className="flex justify-between relative">
            {MILESTONES.map((m, i) => (
              <div key={m.year} className="flex flex-col items-center pt-10" style={{ width: `${100 / MILESTONES.length}%` }}>
                <div
                  className="w-5 h-5 rounded-full border-2 transition-all duration-300 relative z-10"
                  style={{
                    background: i <= activeMilestone ? 'var(--color-primary)' : 'var(--color-surface)',
                    borderColor: i <= activeMilestone ? 'var(--color-primary)' : 'var(--color-border)',
                    boxShadow: i <= activeMilestone ? '0 0 10px var(--color-primary)' : 'none',
                  }}
                >
                  {i === activeMilestone && (
                    <span className="absolute -top-1 -left-1 w-7 h-7 rounded-full animate-ping opacity-30" style={{ background: 'var(--color-primary)' }} />
                  )}
                </div>
                <p className="text-xs font-bold mt-2" style={{ color: i <= activeMilestone ? 'var(--color-text)' : 'var(--color-text-muted)' }}>
                  {m.year}
                </p>
                <p className="text-[10px] leading-tight text-center mt-0.5 max-w-[80px]" style={{ color: 'var(--color-text-muted)' }}>
                  {m.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center pt-72 pb-12 px-4">
        {MILESTONES.map((m, i) => (
          <div
            key={m.year}
            className="rounded-xl p-6 mb-8 w-full max-w-lg border transition-all duration-300"
            style={{
              background: i <= activeMilestone ? 'var(--color-surface)' : 'var(--color-surface)',
              borderColor: i <= activeMilestone ? 'var(--color-primary)' : 'var(--color-border)',
              opacity: i <= activeMilestone ? 1 : 0.5,
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                style={{
                  background: i <= activeMilestone ? 'var(--color-primary)' : 'var(--color-border)',
                  color: i <= activeMilestone ? '#fff' : 'var(--color-text-muted)',
                }}
              >
                {m.year.slice(2)}
              </span>
              <div>
                <h3 className="font-bold" style={{ color: 'var(--color-text)' }}>
                  {m.title}
                </h3>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {m.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
