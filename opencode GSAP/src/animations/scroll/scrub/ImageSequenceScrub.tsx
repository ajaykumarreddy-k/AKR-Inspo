import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const frames = [
  { label: '1', bg: 'from-red-500 to-orange-500' },
  { label: '2', bg: 'from-orange-500 to-yellow-500' },
  { label: '3', bg: 'from-yellow-500 to-green-500' },
  { label: '4', bg: 'from-green-500 to-teal-500' },
  { label: '5', bg: 'from-teal-500 to-cyan-500' },
  { label: '6', bg: 'from-cyan-500 to-blue-500' },
  { label: '7', bg: 'from-blue-500 to-indigo-500' },
  { label: '8', bg: 'from-indigo-500 to-violet-500' },
  { label: '9', bg: 'from-violet-500 to-purple-500' },
  { label: '10', bg: 'from-purple-500 to-pink-500' },
  { label: '11', bg: 'from-pink-500 to-rose-500' },
  { label: '12', bg: 'from-rose-500 to-red-500' },
]

export default function ImageSequenceScrub() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const displayRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const idx = Math.min(Math.floor(self.progress * frames.length), frames.length - 1)
          const frame = frames[idx]
          if (displayRef.current) {
            displayRef.current.className = `w-72 h-72 rounded-2xl bg-gradient-to-br ${frame.bg} flex items-center justify-center shadow-2xl transition-none`
          }
          if (labelRef.current) {
            labelRef.current.textContent = frame.label
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4 bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold mb-4 text-[var(--color-text)]">Image Sequence Scrub</h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        Simulated image sequence — colored frames change as you scroll.
      </p>
      <div className="h-[15vh]" />
      <div
        ref={displayRef}
        className="w-72 h-72 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-2xl"
      >
        <span ref={labelRef} className="text-white text-6xl font-black">1</span>
      </div>
      <div className="h-[40vh]" />
    </div>
  )
}
