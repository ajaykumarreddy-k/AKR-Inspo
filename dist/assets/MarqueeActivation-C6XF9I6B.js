const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function MarqueeActivation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const marqueeText = '✦ Infinite Scroll — Text in Motion ✦ Infinite Scroll — Text in Motion ✦ '

  return (
    <section ref={sectionRef} className="min-h-[150vh] py-32 flex flex-col items-center justify-center bg-[var(--color-bg)] overflow-hidden">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-24 px-8">Marquee Activation</h2>
      <div className="w-full overflow-hidden border-y border-[var(--color-border)] py-8 bg-[var(--color-surface)]">
        <div ref={trackRef} className="flex whitespace-nowrap" style={{ width: '200%' }}>
          <span className="text-5xl sm:text-6xl md:text-7xl font-bold text-[var(--color-primary)] px-4">
            {marqueeText}
          </span>
          <span className="text-5xl sm:text-6xl md:text-7xl font-bold text-[var(--color-primary)] px-4">
            {marqueeText}
          </span>
        </div>
      </div>
      <p className="mt-12 text-lg text-[var(--color-text-muted)] px-8">
        The marquee scrolls as you move through the viewport — scrubbed in both directions.
      </p>
      <div className="h-24" />
    </section>
  )
}
`;export{e as default};
