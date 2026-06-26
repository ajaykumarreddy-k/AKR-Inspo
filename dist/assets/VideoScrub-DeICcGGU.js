const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { label: 'Intro', bg: 'from-red-600 to-red-800' },
  { label: 'Build Up', bg: 'from-orange-500 to-yellow-600' },
  { label: 'Climax', bg: 'from-yellow-400 to-amber-600' },
  { label: 'Action', bg: 'from-green-500 to-emerald-700' },
  { label: 'Resolution', bg: 'from-blue-500 to-indigo-700' },
  { label: 'Finale', bg: 'from-violet-500 to-purple-800' },
]

export default function VideoScrub() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLHeadingElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(progressRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
        scale: 1,
        borderRadius: '50%',
        ease: 'none',
      })

      gsap.to(barRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
        width: '100%',
        ease: 'none',
      })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress
          const idx = Math.min(Math.floor(p * steps.length), steps.length - 1)
          if (labelRef.current) {
            labelRef.current.textContent = steps[idx].label
          }
          if (progressRef.current) {
            progressRef.current.className = \`w-72 h-72 rounded-2xl bg-gradient-to-br \${steps[idx].bg} flex items-center justify-center shadow-2xl transition-all duration-200\`
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4 bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold mb-4 text-[var(--color-text)]">Video Scrub</h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        Simulated video playback — content "frames" change with scroll progress.
      </p>
      <div className="h-[15vh]" />
      <div className="flex flex-col items-center gap-6">
        <div
          ref={progressRef}
          className="w-72 h-72 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-2xl"
        >
          <h3 ref={labelRef} className="text-white text-4xl font-black">Intro</h3>
        </div>
        <div className="w-72 h-2 rounded-full bg-[var(--color-surface)] overflow-hidden">
          <div ref={barRef} className="h-full w-0 rounded-full bg-[var(--color-primary)]" />
        </div>
      </div>
      <div className="h-[40vh]" />
    </div>
  )
}
`;export{e as default};
