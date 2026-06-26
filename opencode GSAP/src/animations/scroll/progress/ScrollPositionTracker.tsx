import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MARKERS = [
  { label: 'Start', offset: 0 },
  { label: '1/4', offset: 25 },
  { label: '1/2', offset: 50 },
  { label: '3/4', offset: 75 },
  { label: 'End', offset: 100 },
]

export default function ScrollPositionTracker() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollPx, setScrollPx] = useState(0)
  const [scrollPct, setScrollPct] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const totalScroll = self.end - self.start
          const currentScroll = self.progress * totalScroll
          setScrollPx(Math.round(currentScroll))
          setScrollPct(Math.round(self.progress * 100))
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
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-center" style={{ color: 'var(--color-primary)' }}>
            Scroll Position Tracker
          </h1>
          <p className="text-lg mb-8 text-center" style={{ color: 'var(--color-text-muted)' }}>
            Tracks and displays current scroll position in pixels
          </p>

          <div
            className="rounded-2xl p-6 border text-center"
            style={{
              background: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="flex items-center justify-center gap-8 mb-4">
              <div>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--color-text-muted)' }}>
                  Position
                </p>
                <span className="text-3xl font-bold font-mono" style={{ color: 'var(--color-accent)' }}>
                  {scrollPx}
                </span>
                <span className="text-sm ml-1" style={{ color: 'var(--color-text-muted)' }}>
                  px
                </span>
              </div>
              <div className="w-px h-10" style={{ background: 'var(--color-border)' }} />
              <div>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--color-text-muted)' }}>
                  Progress
                </p>
                <span className="text-3xl font-bold font-mono" style={{ color: 'var(--color-primary)' }}>
                  {scrollPct}%
                </span>
              </div>
            </div>

            <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
              <div
                className="h-full rounded-full transition-all duration-75"
                style={{
                  width: `${scrollPct}%`,
                  background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
                }}
              />
            </div>

            <div className="flex justify-between mt-2">
              {MARKERS.map((m) => (
                <span
                  key={m.label}
                  className="text-[10px] font-mono"
                  style={{
                    color: scrollPct >= m.offset ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  }}
                >
                  {m.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center pt-72 pb-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="rounded-xl p-6 border"
              style={{
                background: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)',
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>
                  Block {i + 1}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
                  {(i + 1) * 16}%
                </span>
              </div>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                Scroll position tracker displays exact pixel offset and percentage progress within
                this container.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
