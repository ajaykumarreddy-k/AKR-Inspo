import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PRODUCTS = [
  { name: 'Quantum Pro', price: '$1,299', tag: 'Flagship' },
  { name: 'Nova Air', price: '$899', tag: 'Lightweight' },
  { name: 'Pulse Mini', price: '$499', tag: 'Compact' },
  { name: 'Vertex Hub', price: '$249', tag: 'Smart Home' },
  { name: 'Aura Buds', price: '$179', tag: 'Audio' },
  { name: 'Chronos Watch', price: '$399', tag: 'Wearable' },
]

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const products = gsap.utils.toArray<HTMLElement>('.product-card')
      const totalWidth = products.reduce((acc, p) => acc + p.offsetWidth, 0)
      const gap = 32
      const totalScroll = totalWidth + gap * (products.length - 1) - window.innerWidth

      gsap.to(containerRef.current, {
        x: () => -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalScroll + window.innerHeight}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[200vh]"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-8">
        <h2
          className="mb-12 text-4xl font-bold"
          style={{ color: 'var(--color-text)' }}
        >
          Product Showcase
        </h2>
        <div
          ref={containerRef}
          className="flex items-center gap-8"
          style={{ willChange: 'transform' }}
        >
          {PRODUCTS.map((product, i) => (
            <div
              key={i}
              className="product-card flex h-80 w-72 flex-shrink-0 flex-col items-center justify-between rounded-2xl border p-6 shadow-xl"
              style={{
                background: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div
                className="self-start rounded-full px-3 py-1 text-xs font-semibold text-white"
                style={{ background: 'var(--color-accent)' }}
              >
                {product.tag}
              </div>
              <div
                className="flex h-32 w-32 items-center justify-center rounded-2xl text-5xl font-bold text-white"
                style={{ background: 'var(--color-primary)' }}
              >
                {product.name.charAt(0)}
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>
                  {product.name}
                </h3>
                <p className="mt-1 text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
