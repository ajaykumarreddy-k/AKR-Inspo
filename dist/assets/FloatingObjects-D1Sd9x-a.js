const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FloatingObjects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const floatersRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      floatersRef.current.forEach((el, i) => {
        const delay = i * 0.3
        const xRange = 60 + i * 20
        const yRange = 40 + i * 15
        const duration = 3 + i * 0.5

        gsap.to(el, {
          y: yRange,
          x: xRange,
          rotation: i % 2 === 0 ? 15 : -15,
          duration: duration,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: delay
        })

        gsap.fromTo(el,
          { opacity: 0, scale: 0 },
          {
            opacity: 1, scale: 1,
            duration: 1.2,
            ease: 'elastic.out(1, 0.4)',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              end: 'top 60%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[150vh] py-24 px-8 flex flex-col items-center bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">Floating Objects</h2>
      <p className="text-[var(--color-text-muted)] mb-16 text-center max-w-md">
        Objects that float and bob with natural motion, linked to scroll for entry reveal.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-5xl">
        {[
          { color: 'from-sky-500/40 to-indigo-500/40', shape: 'rounded-full', label: 'Float' },
          { color: 'from-pink-500/40 to-rose-500/40', shape: 'rounded-2xl', label: 'Bob' },
          { color: 'from-emerald-500/40 to-cyan-500/40', shape: 'rounded-[30%_70%_50%_50%_/50%_40%_60%_50%]', label: 'Drift' },
          { color: 'from-violet-500/40 to-purple-500/40', shape: 'rounded-3xl', label: 'Glide' },
          { color: 'from-amber-500/40 to-orange-500/40', shape: 'rounded-full', label: 'Hover' },
          { color: 'from-teal-500/40 to-lime-500/40', shape: 'rounded-[40%_60%_30%_70%_/60%_30%_70%_40%]', label: 'Sway' }
        ].map((item, i) => (
          <div
            key={i}
            ref={el => { if (el) floatersRef.current[i] = el }}
            className={\`h-48 \${item.shape} bg-gradient-to-br \${item.color} border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text)] text-lg font-semibold shadow-xl backdrop-blur-sm\`}
          >
            {item.label}
          </div>
        ))}
      </div>
      <div className="h-32" />
    </div>
  )
}
`;export{e as default};
