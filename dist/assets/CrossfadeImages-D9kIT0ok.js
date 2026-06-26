const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const IMAGES = [
  { label: 'Sunrise', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  { label: 'Ocean', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
  { label: 'Forest', gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
  { label: 'Sunset', gradient: 'linear-gradient(135deg, #fa709a, #fee140)' },
  { label: 'Night', gradient: 'linear-gradient(135deg, #a18cd1, #fbc2eb)' },
]

export default function CrossfadeImages() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const layersRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const layers = layersRef.current
      const total = layers.length

      layers.forEach((layer, i) => {
        if (i === 0) return
        gsap.set(layer, { opacity: 0 })
      })

      layers.forEach((layer, i) => {
        gsap.to(layer, {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: \`\${(i / total) * 100}%\`,
            end: \`\${((i + 1) / total) * 100}%\`,
            scrub: 1,
          },
        })
        gsap.to(layer, {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: \`\${((i + 1) / total) * 100}%\`,
            end: \`\${((i + 2) / total) * 100}%\`,
            scrub: 1,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4"
      style={{ background: 'var(--color-bg)' }}
    >
      <h2 className="text-3xl font-bold mb-4 text-[var(--color-text)]">
        5. Crossfade Images
      </h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        Multiple gradient images crossfade between each other as you scroll.
      </p>
      <div className="h-[20vh]" />
      <div
        ref={containerRef}
        className="relative w-[32rem] h-[20rem] rounded-2xl shadow-2xl overflow-hidden"
        style={{ border: '1px solid var(--color-border)' }}
      >
        {IMAGES.map((img, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) layersRef.current[i] = el
            }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: img.gradient }}
          >
            <span className="text-white text-2xl font-bold drop-shadow-lg">
              {img.label}
            </span>
          </div>
        ))}
      </div>
      <div className="h-[30vh]" />
    </section>
  )
}
`;export{e as default};
