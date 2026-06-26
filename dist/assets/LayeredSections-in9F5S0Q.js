const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LAYERS = [
  { gradient: 'from-[var(--color-primary)]/80 to-blue-900/80', title: 'Background', depth: 0.2 },
  { gradient: 'from-[var(--color-accent)]/80 to-purple-900/80', title: 'Midground', depth: 0.5 },
  { gradient: 'from-emerald-500/80 to-teal-900/80', title: 'Foreground', depth: 0.8 },
  { gradient: 'from-amber-500/80 to-orange-900/80', title: 'Overlay', depth: 1.0 },
  { gradient: 'from-rose-500/80 to-pink-900/80', title: 'Top Layer', depth: 1.2 },
]

export default function LayeredSections() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const layersRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      layersRef.current.forEach((layer, i) => {
        const depth = LAYERS[i].depth

        gsap.fromTo(layer,
          { y: 0, scale: 0.9, opacity: 0.4 },
          {
            y: -80 * depth,
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5 * depth,
            },
          }
        )

        gsap.fromTo(layer,
          { borderRadius: '2rem' },
          {
            borderRadius: '0.5rem',
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: layer,
              start: 'top 90%',
              end: 'top 30%',
              scrub: 1,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[150vh] py-24 px-8 flex flex-col items-center bg-[var(--color-bg)] relative overflow-hidden">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-16 z-10">Layered Sections</h2>
      <div className="relative w-full max-w-3xl h-[500px]">
        {LAYERS.map((layer, i) => (
          <div
            key={i}
            ref={el => { if (el) layersRef.current[i] = el }}
            className={\`absolute inset-0 rounded-2xl bg-gradient-to-br p-8 flex items-center justify-center shadow-xl border border-white/10 \${layer.gradient}\`}
            style={{
              zIndex: i,
              transform: \`translateY(\${i * 12}px) scale(\${1 - i * 0.02})\`,
            }}
          >
            <div className="text-center">
              <span
                className="inline-block px-4 py-1 rounded-full text-sm font-bold mb-3"
                style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}
              >
                Layer {i + 1}
              </span>
              <h3 className="text-2xl font-bold text-white">{layer.title}</h3>
              <p className="text-white/70 mt-2">Depth multiplier: {layer.depth}x</p>
            </div>
          </div>
        ))}
      </div>
      <div className="h-48" />
    </div>
  )
}
`;export{e as default};
