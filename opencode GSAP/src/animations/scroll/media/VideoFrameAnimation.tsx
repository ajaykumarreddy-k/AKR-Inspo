import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FRAMES = [
  { bg: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', label: 'Intro' },
  { bg: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)', label: 'Build Up' },
  { bg: 'linear-gradient(135deg, #e65c00, #f9d423)', label: 'Climax' },
  { bg: 'linear-gradient(135deg, #c31432, #240b36)', label: 'Action' },
  { bg: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', label: 'Outro' },
]

const TOTAL = FRAMES.length

export default function VideoFrameAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          const frameIndex = Math.min(Math.floor(progress * TOTAL), TOTAL - 1)

          if (frameRef.current) {
            frameRef.current.style.background = FRAMES[frameIndex].bg
          }
          if (labelRef.current) {
            labelRef.current.textContent = FRAMES[frameIndex].label
          }
          if (barRef.current) {
            barRef.current.style.width = `${(frameIndex + 1) * (100 / TOTAL)}%`
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4"
      style={{ background: 'var(--color-bg)' }}
    >
      <h2 className="text-3xl font-bold mb-4 text-[var(--color-text)]">
        6. Video Frame Animation
      </h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        Simulated video frames — gradient backgrounds change like a video scrubber.
      </p>
      <div className="h-[20vh]" />
      <div className="flex flex-col items-center gap-4">
        <div
          ref={frameRef}
          className="w-[32rem] h-[18rem] rounded-2xl shadow-2xl flex items-center justify-center border-2"
          style={{
            background: FRAMES[0].bg,
            borderColor: 'var(--color-border)',
          }}
        >
          <span className="text-white text-3xl font-bold tracking-widest opacity-80">
            ▶ {FRAMES[0].label}
          </span>
        </div>
        <div
          className="w-[32rem] h-2 rounded-full overflow-hidden"
          style={{ background: 'var(--color-surface)' }}
        >
          <div
            ref={barRef}
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${100 / TOTAL}%`,
              background: 'var(--color-primary)',
            }}
          />
        </div>
        <span
          ref={labelRef}
          className="text-sm font-mono"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {FRAMES[0].label}
        </span>
      </div>
      <div className="h-[30vh]" />
    </section>
  )
}
