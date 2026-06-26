const e=`import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function MouseScrollHybrid() {
  const containerRef = useRef<HTMLDivElement>(null)
  const layer1Ref = useRef<HTMLDivElement>(null)
  const layer2Ref = useRef<HTMLDivElement>(null)
  const layer3Ref = useRef<HTMLDivElement>(null)

  const handleMouse = useCallback((e: MouseEvent) => {
    const { innerWidth, innerHeight } = window
    const x = (e.clientX / innerWidth - 0.5) * 2
    const y = (e.clientY / innerHeight - 0.5) * 2

    if (layer1Ref.current) {
      gsap.to(layer1Ref.current, { x: x * 30, y: y * 30, duration: 1.2, ease: 'power2.out', overwrite: 'auto' })
    }
    if (layer2Ref.current) {
      gsap.to(layer2Ref.current, { x: x * -20, y: y * -20, duration: 1, ease: 'power2.out', overwrite: 'auto' })
    }
    if (layer3Ref.current) {
      gsap.to(layer3Ref.current, { x: x * 15, y: y * 15, duration: 0.8, ease: 'power2.out', overwrite: 'auto' })
    }
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [handleMouse])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(layer1Ref.current, {
        y: 150,
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      })
      gsap.to(layer2Ref.current, {
        y: 60,
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      })
      gsap.to(layer3Ref.current, {
        y: -40,
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4 overflow-hidden bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold mb-4 z-10 text-[var(--color-text)]">Mouse + Scroll Hybrid</h2>
      <p className="text-[var(--color-text-muted)] mb-12 z-10 text-center max-w-md">
        Layers respond to both mouse movement and scroll position.
      </p>
      <div
        ref={layer1Ref}
        className="absolute top-48 left-[15%] w-64 h-64 rounded-3xl bg-gradient-to-br from-violet-600/30 to-fuchsia-600/30 border border-[var(--color-border)]"
      />
      <div
        ref={layer2Ref}
        className="absolute top-64 right-[20%] w-52 h-52 rounded-full bg-gradient-to-br from-sky-600/25 to-indigo-600/25 border border-[var(--color-border)]"
      />
      <div
        ref={layer3Ref}
        className="absolute bottom-48 left-[30%] w-72 h-40 rounded-2xl bg-gradient-to-r from-rose-600/20 to-amber-600/20 border border-[var(--color-border)]"
      />
      <div className="h-[70vh]" />
    </div>
  )
}
`;export{e as default};
