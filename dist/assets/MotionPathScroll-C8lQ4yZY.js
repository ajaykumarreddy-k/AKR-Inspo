const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function MotionPathScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try { gsap.registerPlugin(ScrollTrigger) } catch { /* empty */ }

    const ctx = gsap.context(() => {
      gsap.to(dotRef.current, {
        motionPath: {
          path: [
            { x: 20, y: 20 },
            { x: 230, y: 20 },
            { x: 230, y: 130 },
            { x: 20, y: 130 },
          ],
          curviness: 0.5,
        },
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Motion Path Scroll</h2>
      <div ref={containerRef} className="relative w-72 h-48 border border-[var(--color-border)] rounded-lg overflow-y-auto">
        <div ref={triggerRef} className="h-96">
          <div className="sticky top-0 h-48">
            <div ref={dotRef} className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg" />
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 288 192">
              <path d="M20 20 L250 20 L250 150 L20 150 Z" fill="none" stroke="var(--color-border)" strokeWidth="2" strokeDasharray="6 4" />
            </svg>
          </div>
        </div>
      </div>
      <span className="text-sm text-[var(--color-text-muted)]">Scroll to animate</span>
    </div>
  )
}
`;export{e as default};
