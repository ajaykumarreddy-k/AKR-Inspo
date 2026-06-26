const n=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  'React', 'TypeScript', 'GSAP', 'Tailwind', 'Node.js',
  'Next.js', 'GraphQL', 'Docker', 'AWS', 'Figma',
]

export default function InfiniteHorizontalLoop() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      if (!track) return

      const items = gsap.utils.toArray<HTMLElement>('.loop-item')
      const itemWidth = items[0]?.offsetWidth ?? 160
      const gap = 24
      const singleSetWidth = items.length * (itemWidth + gap)

      track.innerHTML = ''
      for (let i = 0; i < 24; i++) {
        const clone = items[i % items.length].cloneNode(true) as HTMLElement
        clone.classList.add('loop-item')
        track.appendChild(clone)
      }

      const allItems = gsap.utils.toArray<HTMLElement>('.loop-item', track)
      const totalWidth = allItems.length * (itemWidth + gap)

      track.style.width = \`\${totalWidth}px\`

      gsap.to(track, {
        x: () => -(totalWidth - window.innerWidth) / 2,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: \`+=\${window.innerHeight * 2}\`,
          pin: true,
          scrub: 1,
        },
      })

      gsap.to(track, {
        x: \`-=\${singleSetWidth}\`,
        ease: 'none',
        duration: 20,
        repeat: -1,
        modifiers: {
          x: (x) => {
            const parsed = parseFloat(x)
            const resetPoint = -Math.floor(parsed / singleSetWidth) * singleSetWidth
            return parsed <= -singleSetWidth * 3
              ? \`\${parsed + singleSetWidth}px\`
              : \`\${parsed}px\`
          },
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[200vh] overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <h2
          className="mb-12 px-8 text-4xl font-bold"
          style={{ color: 'var(--color-text)' }}
        >
          Infinite Loop
        </h2>
        <div ref={wrapperRef} className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6 px-8"
            style={{ willChange: 'transform' }}
          >
            {ITEMS.map((item, i) => (
              <div
                key={i}
                className="loop-item flex h-32 w-40 flex-shrink-0 items-center justify-center rounded-2xl border text-lg font-semibold shadow-lg"
                style={{
                  background: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text)',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
`;export{n as default};
