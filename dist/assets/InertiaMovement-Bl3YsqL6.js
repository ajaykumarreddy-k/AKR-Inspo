const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function InertiaMovement() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const heavyRef = useRef<HTMLDivElement>(null)
  const lightRef = useRef<HTMLDivElement>(null)
  const fluidRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(heavyRef.current, {
        x: 200,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: heavyRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 3
        }
      })

      gsap.to(lightRef.current, {
        x: -200,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: lightRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8
        }
      })

      gsap.to(fluidRef.current, {
        y: -120,
        rotation: 360,
        ease: 'none',
        scrollTrigger: {
          trigger: fluidRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      })

      gsap.fromTo(heavyRef.current,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1, scale: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: heavyRef.current,
            start: 'top 85%',
            end: 'top 40%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[150vh] py-24 px-8 flex flex-col items-center bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">Inertia Movement</h2>
      <p className="text-[var(--color-text-muted)] mb-16 text-center max-w-md">
        Elements with different weight feel — heavy, light, and fluid motion on scroll.
      </p>
      <div className="h-[20vh]" />
      <div className="flex flex-col gap-16 w-full max-w-5xl">
        <div
          ref={heavyRef}
          className="relative h-28 rounded-2xl bg-gradient-to-r from-purple-600/50 to-pink-600/50 border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text)] text-lg font-semibold shadow-xl"
        >
          Heavy — Slow to respond, high inertia
        </div>
        <div
          ref={lightRef}
          className="relative h-24 rounded-2xl bg-gradient-to-r from-emerald-600/50 to-teal-600/50 border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text)] text-lg font-semibold shadow-xl"
        >
          Light — Quick to respond, low inertia
        </div>
        <div
          ref={fluidRef}
          className="relative h-28 rounded-2xl bg-gradient-to-r from-amber-600/50 to-orange-600/50 border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text)] text-lg font-semibold shadow-xl"
        >
          Fluid — Continuous rotation with weight
        </div>
      </div>
      <div className="h-[30vh]" />
    </div>
  )
}
`;export{e as default};
