import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CONTENT = [
  { title: 'Item Alpha', color: 'var(--color-primary)' },
  { title: 'Item Bravo', color: 'var(--color-accent)' },
  { title: 'Item Charlie', color: '#e74c3c' },
  { title: 'Item Delta', color: '#2ecc71' },
  { title: 'Item Echo', color: '#f39c12' },
]

const BATCH = [...CONTENT, ...CONTENT]

export default function InfiniteSmoothScroll() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [items, setItems] = useState(BATCH)

  const loadMore = useCallback(() => {
    setItems((prev) => [...prev, ...CONTENT])
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sentinel = sentinelRef.current
      if (!sentinel) return

      ScrollTrigger.create({
        trigger: sentinel,
        scroller: containerRef.current,
        start: 'top 90%',
        onEnter: loadMore,
      })

      const cards = gsap.utils.toArray<HTMLElement>('.infinite-card')
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              scroller: containerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [items, loadMore])

  return (
    <div ref={sectionRef} className="min-h-screen bg-[var(--color-bg)] p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[var(--color-text)]">
          Infinite Smooth Scroll
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          Infinite content loading — scroll to the bottom for more
        </p>
      </div>
      <div
        ref={containerRef}
        className="mx-auto max-w-xl h-[70vh] overflow-y-auto rounded-2xl border p-4 space-y-4"
        style={{
          background: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
        }}
      >
        {items.map((item, i) => (
          <div
            key={`${item.title}-${i}`}
            className="infinite-card h-24 rounded-xl border flex items-center justify-between px-6 shadow-md"
            style={{
              background: 'var(--color-bg)',
              borderColor: item.color,
            }}
          >
            <span className="text-lg font-semibold text-[var(--color-text)]">
              {item.title}
            </span>
            <span
              className="text-xs font-mono text-[var(--color-text-muted)]"
            >
              #{i + 1}
            </span>
            <div
              className="w-8 h-8 rounded-full"
              style={{ background: item.color }}
            />
          </div>
        ))}
        <div ref={sentinelRef} className="h-4" />
      </div>
    </div>
  )
}
