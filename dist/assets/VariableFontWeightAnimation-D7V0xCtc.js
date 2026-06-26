const t=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function VariableFontWeightAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !subRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        fontWeight: 100,
        letterSpacing: '0.4em',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })

      gsap.to(subRef.current, {
        fontWeight: 900,
        letterSpacing: '0.02em',
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

  return (
    <section ref={sectionRef} className="min-h-[150vh] py-32 px-8 flex flex-col items-center justify-center bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-24">Variable Font Weight</h2>
      <div className="max-w-5xl text-center space-y-12">
        <div>
          <h3
            ref={textRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight text-[var(--color-primary)]"
            style={{ fontWeight: 900, letterSpacing: '0.02em' }}
          >
            WEIGHTLESS
          </h3>
          <p className="mt-4 text-base text-[var(--color-text-muted)]">
            Scroll down — weight decreases, spacing spreads out
          </p>
        </div>
        <div className="border-t border-[var(--color-border)] pt-12">
          <p
            ref={subRef}
            className="text-xl sm:text-2xl md:text-3xl font-light leading-relaxed text-[var(--color-accent)]"
            style={{ fontWeight: 100, letterSpacing: '0.1em' }}
          >
            From light as air to solid as stone — typography that breathes.
          </p>
          <p className="mt-4 text-base text-[var(--color-text-muted)]">
            Scroll down — weight increases, spacing tightens
          </p>
        </div>
      </div>
      <div className="h-32" />
      <div className="max-w-2xl text-center">
        <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
          Font weight and letter-spacing shift continuously with scroll position,
          creating a dynamic typographic range from bold and tight to light and airy.
        </p>
      </div>
      <div className="h-24" />
    </section>
  )
}
`;export{t as default};
