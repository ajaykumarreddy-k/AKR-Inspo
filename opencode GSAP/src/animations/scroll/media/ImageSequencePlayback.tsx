import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FRAME_COLORS = [
  'linear-gradient(135deg, #667eea, #764ba2)',
  'linear-gradient(135deg, #f093fb, #f5576c)',
  'linear-gradient(135deg, #4facfe, #00f2fe)',
  'linear-gradient(135deg, #43e97b, #38f9d7)',
  'linear-gradient(135deg, #fa709a, #fee140)',
  'linear-gradient(135deg, #a18cd1, #fbc2eb)',
  'linear-gradient(135deg, #fccb90, #d57eeb)',
  'linear-gradient(135deg, #e0c3fc, #8ec5fc)',
]

const TOTAL_FRAMES = FRAME_COLORS.length

export default function ImageSequencePlayback() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const index = Math.min(
            Math.floor(self.progress * TOTAL_FRAMES),
            TOTAL_FRAMES - 1
          )
          if (frameRef.current) {
            frameRef.current.style.background = FRAME_COLORS[index]
          }
          if (labelRef.current) {
            labelRef.current.textContent = `Frame ${index + 1} / ${TOTAL_FRAMES}`
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
        2. Image Sequence Playback
      </h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        Simulated image sequence — gradient frames change as you scroll.
      </p>
      <div className="h-[20vh]" />
      <div className="flex flex-col items-center gap-4">
        <div
          ref={frameRef}
          className="w-[28rem] h-[18rem] rounded-2xl shadow-2xl border-2 transition-none"
          style={{
            background: FRAME_COLORS[0],
            borderColor: 'var(--color-border)',
          }}
        />
        <span
          ref={labelRef}
          className="text-sm font-mono px-4 py-2 rounded-full"
          style={{
            color: 'var(--color-text-muted)',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          Frame 1 / {TOTAL_FRAMES}
        </span>
      </div>
      <div className="h-[30vh]" />
    </section>
  )
}
