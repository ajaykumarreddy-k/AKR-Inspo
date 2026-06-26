const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function HeroFadeIn() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' })
      gsap.from(subtitleRef.current, { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 })
      gsap.from(ctaRef.current, { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.4 })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center h-64 gap-4 bg-[var(--color-bg)]">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Hero Fade In</h2>
      <h1 ref={titleRef} className="text-3xl font-bold text-[var(--color-text)]">Welcome</h1>
      <p ref={subtitleRef} className="text-sm text-[var(--color-text-muted)]">A great tagline goes here</p>
      <button ref={ctaRef} className="px-6 py-2 rounded-xl bg-[var(--color-primary)] text-white font-medium cursor-pointer">
        Get Started
      </button>
    </div>
  )
}
`;export{e as default};
