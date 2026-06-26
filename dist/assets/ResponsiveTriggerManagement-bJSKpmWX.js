const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ResponsiveTriggerManagement() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const desktopRef = useRef<HTMLDivElement>(null)
  const mobileRef = useRef<HTMLDivElement>(null)
  const sharedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 769px)', () => {
        gsap.from(desktopRef.current, {
          scrollTrigger: {
            trigger: desktopRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
            toggleActions: 'play none none none'
          },
          xPercent: 100,
          rotation: 15,
          opacity: 0,
          duration: 1
        })

        gsap.from(sharedRef.current, {
          scrollTrigger: {
            trigger: sharedRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          scale: 0.5,
          opacity: 0,
          duration: 0.8,
          ease: 'back.out(1.7)'
        })

        return () => {
          ScrollTrigger.getById('desktop-trigger')?.kill()
        }
      })

      mm.add('(max-width: 768px)', () => {
        gsap.from(mobileRef.current, {
          scrollTrigger: {
            trigger: mobileRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 40,
          opacity: 0,
          duration: 0.5
        })

        gsap.from(sharedRef.current, {
          scrollTrigger: {
            trigger: sharedRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          duration: 0.4
        })

        ScrollTrigger.refresh()
      })

      return () => mm.revert()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4">
      <h2 className="text-3xl font-bold mb-2 text-[var(--color-text)]">ResponsiveTriggerManagement</h2>
      <p className="text-[var(--color-text-muted)] mb-4 text-center max-w-lg">
        Separate triggers for desktop (scrub + rotation) and mobile (simple fade).
      </p>
      <div className="h-[20vh]" />
      <div className="flex flex-col gap-6 w-full max-w-2xl">
        <div
          ref={desktopRef}
          className="hidden sm:flex h-32 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] items-center justify-center text-white font-bold shadow-lg"
        >
          Desktop Only — Scrub + Rotation
        </div>
        <div
          ref={mobileRef}
          className="flex sm:hidden h-32 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] items-center justify-center text-[var(--color-text)] font-bold shadow-sm"
        >
          Mobile Only — Simple Fade
        </div>
        <div
          ref={sharedRef}
          className="h-32 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] font-bold shadow-sm"
        >
          Shared Element (adapts per breakpoint)
        </div>
      </div>
      <div className="h-[30vh]" />
    </div>
  )
}
`;export{e as default};
