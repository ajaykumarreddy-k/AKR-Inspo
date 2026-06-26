import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  { title: 'Lightning Fast', desc: 'Blazing performance with sub-millisecond response times across all operations.', icon: '⚡' },
  { title: 'Secure by Default', desc: 'Enterprise-grade encryption and zero-trust architecture built into every layer.', icon: '🛡️' },
  { title: 'Smart Analytics', desc: 'Real-time insights powered by machine learning that adapt to your workflow.', icon: '📊' },
  { title: 'Seamless Sync', desc: 'Instant synchronization across all your devices with offline-first technology.', icon: '🔄' },
  { title: 'Developer API', desc: 'Full-featured REST and GraphQL APIs with SDKs for every major language.', icon: '🔌' },
  { title: 'Global CDN', desc: 'Edge-optimized content delivery spanning 300+ locations worldwide.', icon: '🌍' }
]

export default function ProductFeatureWalkthrough() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])
  const highlightRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          pin: true
        }
      })

      tl.fromTo(badgeRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(3)' })

      featureRefs.current.forEach((ref) => {
        if (!ref) return
        tl.fromTo(ref, { x: -100, opacity: 0, scale: 0.9 }, { x: 0, opacity: 1, scale: 1, duration: 0.2 })
          .to(ref, { borderColor: 'var(--color-primary)', backgroundColor: 'rgba(99,102,241,0.15)', duration: 0.15 })
          .to(ref.querySelector('.feature-icon'), { scale: 1.3, duration: 0.1 })
          .to(ref.querySelector('.feature-icon'), { scale: 1, duration: 0.1 })
          .to(ref, { borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)', duration: 0.2 })
      })

      tl.to(highlightRef.current, { scaleX: 1, transformOrigin: 'left center', duration: 0.2 })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[200vh] flex flex-col items-center justify-center px-4 bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold mb-6 text-[var(--color-text)]">Product Feature Walkthrough</h2>
      <p className="text-[var(--color-text-muted)] mb-4 text-center max-w-lg">
        Features highlighted in sequence as you scroll through the product story.
      </p>
      <div ref={badgeRef} className="mb-10 px-4 py-2 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold">
        ✨ What makes us different
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
        {FEATURES.map((feature, i) => (
          <div
            key={feature.title}
            ref={(el) => { featureRefs.current[i] = el }}
            className="p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
          >
            <div className="feature-icon text-2xl mb-2">{feature.icon}</div>
            <h3 className="text-lg font-bold text-[var(--color-text)] mb-1">{feature.title}</h3>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 w-48 h-1 rounded-full bg-[var(--color-border)] overflow-hidden">
        <div ref={highlightRef} className="h-full w-full rounded-full bg-[var(--color-primary)] origin-left scale-x-0" />
      </div>
    </div>
  )
}
