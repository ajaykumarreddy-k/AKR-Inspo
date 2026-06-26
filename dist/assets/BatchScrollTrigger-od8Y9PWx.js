const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ITEM_COUNT = 24

export default function BatchScrollTrigger() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = containerRef.current?.children
      if (!items) return

      gsap.from(items, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true
        },
        y: 60,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.04,
        ease: 'power2.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const items = Array.from({ length: ITEM_COUNT }, (_, i) => i + 1)

  return (
    <div ref={sectionRef} className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4">
      <h2 className="text-3xl font-bold mb-2 text-[var(--color-text)]">BatchScrollTrigger</h2>
      <p className="text-[var(--color-text-muted)] mb-4 text-center max-w-lg">
        Animates {ITEM_COUNT}+ elements with a single ScrollTrigger using stagger.
      </p>
      <div className="h-[20vh]" />
      <div
        ref={containerRef}
        className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 w-full max-w-4xl"
      >
        {items.map((i) => (
          <div
            key={i}
            className="aspect-square rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] text-sm font-mono shadow-sm"
          >
            {i}
          </div>
        ))}
      </div>
      <div className="h-[30vh]" />
    </div>
  )
}
`;export{e as default};
