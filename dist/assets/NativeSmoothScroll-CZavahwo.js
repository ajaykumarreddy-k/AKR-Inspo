const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  label: \`Block \${i + 1}\`,
}))

export default function NativeSmoothScroll() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const boxesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const boxes = gsap.utils.toArray<HTMLElement>('.native-box')
      boxes.forEach((box, i) => {
        gsap.fromTo(
          box,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: box,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      className="min-h-[200vh] bg-[var(--color-bg)]"
      style={{ scrollBehavior: 'smooth' }}
    >
      <div className="sticky top-0 pt-8 pb-4 bg-[var(--color-bg)] z-10 text-center">
        <h2 className="text-3xl font-bold text-[var(--color-text)]">
          Native CSS Smooth Scroll
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          CSS <code className="text-[var(--color-primary)]">scroll-behavior: smooth</code> + GSAP reveal
        </p>
      </div>
      <div
        ref={boxesRef}
        className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-32"
      >
        {ITEMS.map((item) => (
          <div
            key={item.id}
            className="native-box h-48 rounded-2xl border flex items-center justify-center shadow-lg"
            style={{
              background: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
            }}
          >
            <span className="text-xl font-bold text-[var(--color-text)]">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
`;export{e as default};
