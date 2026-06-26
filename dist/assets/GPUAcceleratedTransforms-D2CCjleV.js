const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function GPUAcceleratedTransforms() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const opacityRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        scrollTrigger: {
          trigger: leftRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        x: -120,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        willChange: 'transform'
      })

      gsap.from(rightRef.current, {
        scrollTrigger: {
          trigger: rightRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        scale: 0.6,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)',
        willChange: 'transform'
      })

      gsap.from(opacityRef.current, {
        scrollTrigger: {
          trigger: opacityRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4">
      <h2 className="text-3xl font-bold mb-2 text-[var(--color-text)]">GPUAcceleratedTransforms</h2>
      <p className="text-[var(--color-text-muted)] mb-4 text-center max-w-lg">
        Uses only <code className="text-[var(--color-accent)]">transform</code> and{' '}
        <code className="text-[var(--color-accent)]">opacity</code> — no layout-triggering properties.
      </p>
      <div className="h-[20vh]" />
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl mb-6">
        <div
          ref={leftRef}
          className="flex-1 h-44 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white font-bold shadow-lg"
        >
          translateX
        </div>
        <div
          ref={rightRef}
          className="flex-1 h-44 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text)] font-bold shadow-sm"
        >
          scale
        </div>
      </div>
      <div
        ref={opacityRef}
        className="w-full max-w-2xl h-24 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] shadow-sm"
      >
        opacity-only transition (no layout cost)
      </div>
      <div className="h-[30vh]" />
    </div>
  )
}
`;export{e as default};
