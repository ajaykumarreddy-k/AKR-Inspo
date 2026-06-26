import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function TimelineScrubbing() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const box1Ref = useRef<HTMLDivElement>(null)
  const box2Ref = useRef<HTMLDivElement>(null)
  const box3Ref = useRef<HTMLDivElement>(null)
  const box4Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          pin: true
        }
      })

      tl.fromTo(box1Ref.current, { x: -200, opacity: 0, scale: 0.5 }, { x: 0, opacity: 1, scale: 1, duration: 0.25 })
        .fromTo(box2Ref.current, { y: 200, opacity: 0, rotation: -45 }, { y: 0, opacity: 1, rotation: 0, duration: 0.25 }, '-=0.1')
        .fromTo(box3Ref.current, { scale: 0, opacity: 0, borderRadius: '0%' }, { scale: 1, opacity: 1, borderRadius: '50%', duration: 0.25 }, '-=0.1')
        .fromTo(box4Ref.current, { x: 200, opacity: 0, rotation: 45 }, { x: 0, opacity: 1, rotation: 360, duration: 0.25 }, '-=0.1')
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[200vh] flex flex-col items-center justify-center px-4 bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold mb-6 text-[var(--color-text)]">Timeline Scrubbing</h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-lg">
        A multi-step timeline scrubbed smoothly by scroll position. Each box enters in sequence.
      </p>
      <div className="grid grid-cols-2 gap-6">
        {[{ ref: box1Ref, label: 'Slide In', color: 'from-cyan-500 to-blue-600' },
          { ref: box2Ref, label: 'Drop In', color: 'from-purple-500 to-pink-600' },
          { ref: box3Ref, label: 'Scale Up', color: 'from-emerald-500 to-teal-600' },
          { ref: box4Ref, label: 'Spin In', color: 'from-amber-500 to-orange-600' }].map((item, i) => (
          <div
            key={i}
            ref={item.ref}
            className={`w-44 h-44 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}
          >
            <span className="text-white font-bold text-lg">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
