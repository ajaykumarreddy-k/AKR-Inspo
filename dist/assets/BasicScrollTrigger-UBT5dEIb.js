const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function BasicScrollTrigger() {
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(boxRef.current, {
        scrollTrigger: {
          trigger: boxRef.current,
          start: 'top 80%',
          end: 'top 30%',
          toggleActions: 'play none none none'
        },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4">
      <h2 className="text-3xl font-bold mb-8 text-[var(--color-text)]">1. Basic ScrollTrigger</h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        A simple fade-in and slide-up animation triggered when the box scrolls into view.
      </p>
      <div className="h-[40vh]" />
      <div
        ref={boxRef}
        className="w-64 h-64 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center shadow-lg"
      >
        <span className="text-white font-bold text-xl">Scroll Triggered</span>
      </div>
      <div className="h-[30vh]" />
    </div>
  )
}
`;export{e as default};
