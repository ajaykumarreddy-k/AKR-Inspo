import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ProgressiveBlur() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { filter: 'blur(20px)', opacity: 0.3 },
        {
          filter: 'blur(0px)',
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1.2,
          },
        }
      )
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
        4. Progressive Blur
      </h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        Image transitions from blurry to crystal clear as you scroll.
      </p>
      <div className="h-[20vh]" />
      <div className="relative w-[36rem] h-[24rem] rounded-2xl shadow-2xl overflow-hidden">
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop"
          alt="Abstract blur transition"
          className="w-full h-full object-cover scale-110"
          style={{ willChange: 'filter, opacity' }}
        />
      </div>
      <div className="h-[30vh]" />
    </section>
  )
}
