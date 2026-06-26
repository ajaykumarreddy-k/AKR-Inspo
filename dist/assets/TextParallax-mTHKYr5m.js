const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function TextParallax() {
  const containerRef = useRef<HTMLDivElement>(null)
  const slowTextRef = useRef<HTMLHeadingElement>(null)
  const fastTextRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(slowTextRef.current, {
        y: 60,
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      })
      gsap.to(fastTextRef.current, {
        y: -180,
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      })
      gsap.to(contentRef.current, {
        y: 30,
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4 overflow-hidden bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold mb-4 z-10 text-[var(--color-text)]">Text Parallax</h2>
      <p className="text-[var(--color-text-muted)] mb-12 z-10 text-center max-w-md">
        Text layers drift at independent rates for depth.
      </p>
      <h1
        ref={slowTextRef}
        className="text-7xl md:text-9xl font-black text-[var(--color-primary)]/10 select-none absolute top-48 left-1/2 -translate-x-1/2 whitespace-nowrap"
      >
        DEPTH
      </h1>
      <h1
        ref={fastTextRef}
        className="text-6xl md:text-8xl font-black text-[var(--color-accent)]/15 select-none absolute top-72 left-1/2 -translate-x-1/2 whitespace-nowrap"
      >
        LAYERED
      </h1>
      <div
        ref={contentRef}
        className="z-10 mt-80 max-w-lg text-center"
      >
        <p className="text-lg text-[var(--color-text)] leading-relaxed">
          Text moves at different speeds creating a sense of depth without any images.
        </p>
        <p className="text-[var(--color-text-muted)] mt-4">
          The large headings scroll at different rates relative to this card.
        </p>
      </div>
      <div className="h-[40vh]" />
    </div>
  )
}
`;export{e as default};
