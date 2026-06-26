const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrubAnimation() {
  const boxRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, {
        scrollTrigger: {
          trigger: boxRef.current,
          start: 'top 90%',
          end: 'top 10%',
          scrub: 1
        },
        scale: 1.5,
        rotation: 360,
        borderRadius: '50%',
        duration: 1,
        ease: 'none'
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4">
      <h2 className="text-3xl font-bold mb-8 text-[var(--color-text)]">4. Scrub Animation</h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        Progress follows scroll position directly — scrub ties animation to the scrollbar.
      </p>
      <div className="h-[40vh]" />
      <div
        ref={boxRef}
        className="w-48 h-48 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center shadow-lg"
      >
        <span className="text-white font-bold text-center text-sm px-4">
          Scrub Me
        </span>
      </div>
      <div className="h-[30vh]" />
    </div>
  )
}
`;export{e as default};
