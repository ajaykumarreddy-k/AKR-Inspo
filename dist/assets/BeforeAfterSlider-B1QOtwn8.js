const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function BeforeAfterSlider() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const clipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(clipRef.current, {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
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
        7. Before / After Slider
      </h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        Scroll to reveal the "after" image by clipping the "before" layer.
      </p>
      <div className="h-[20vh]" />
      <div
        className="relative w-[32rem] h-[20rem] rounded-2xl overflow-hidden shadow-2xl select-none"
        style={{ border: '2px solid var(--color-border)' }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #2d2d2d, #1a1a1a, #0d0d0d)',
          }}
        >
          <span className="text-white text-xl font-bold opacity-60">BEFORE</span>
        </div>
        <div
          ref={clipRef}
          className="absolute inset-0 overflow-hidden"
          style={{ width: '0%' }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
              width: '32rem',
            }}
          >
            <span className="text-white text-xl font-bold drop-shadow-lg">AFTER</span>
          </div>
        </div>
        <div
          className="absolute top-0 bottom-0 w-1 shadow-lg pointer-events-none"
          style={{
            left: '0%',
            background: 'white',
            boxShadow: '0 0 8px rgba(255,255,255,0.5)',
          }}
          ref={(el) => {
            if (!el || !clipRef.current) return
            const observer = new ResizeObserver(() => {
              el.style.left = clipRef.current?.style.width || '0%'
            })
            observer.observe(clipRef.current)
          }}
        />
      </div>
      <div className="flex gap-8 mt-4 text-sm">
        <span style={{ color: 'var(--color-text-muted)' }}>← Before</span>
        <span style={{ color: 'var(--color-text-muted)' }}>After →</span>
      </div>
      <div className="h-[30vh]" />
    </section>
  )
}
`;export{e as default};
