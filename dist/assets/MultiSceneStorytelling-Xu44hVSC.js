const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SCENES = [
  { id: 'dawn', title: 'Dawn', desc: 'First light breaks over the horizon, painting the sky in hues of gold and crimson.', gradient: 'from-indigo-900 via-purple-800 to-rose-600' },
  { id: 'day', title: 'Day', desc: 'The sun climbs high, casting sharp shadows across a world full of motion and life.', gradient: 'from-sky-500 via-blue-500 to-cyan-400' },
  { id: 'dusk', title: 'Dusk', desc: 'Colors deepen as the sun retreats, leaving behind a tapestry of amber and violet.', gradient: 'from-orange-600 via-rose-500 to-purple-800' },
  { id: 'night', title: 'Night', desc: 'Stars emerge one by one, the moon rises, and the world settles into quiet reflection.', gradient: 'from-slate-900 via-blue-950 to-indigo-950' }
]

export default function MultiSceneStorytelling() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([])
  const textRefs = useRef<(HTMLDivElement | null)[]>([])
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sceneTLs: gsap.core.Timeline[] = []

      SCENES.forEach((_, i) => {
        const scene = sceneRefs.current[i]
        const text = textRefs.current[i]
        if (!scene || !text) return

        const inner = gsap.timeline()
        inner.fromTo(scene, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.4 })
          .fromTo(text, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3 })
          .to(scene, { borderColor: 'var(--color-accent)', boxShadow: '0 0 40px var(--color-accent)', duration: 0.3 })

        if (i > 0) {
          const prevScene = sceneRefs.current[i - 1]
          if (prevScene) {
            inner.to(prevScene, { opacity: 0.15, scale: 0.9, borderColor: 'var(--color-border)', boxShadow: 'none', duration: 0.3 }, '-=0.1')
          }
        }

        sceneTLs.push(inner)
      })

      const masterTL = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          pin: true
        }
      })

      sceneTLs.forEach((tl) => masterTL.add(tl))

      masterTL.to(counterRef.current, { innerText: '4', duration: 0.3 }, '+=0.1')
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[200vh] flex flex-col items-center justify-center px-4 bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold mb-6 text-[var(--color-text)]">Multi-Scene Storytelling</h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-lg">
        A narrative journey through four distinct scenes, each with its own timeline driven by scroll.
      </p>
      <div ref={counterRef} className="mb-8 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] text-sm font-mono">
        Scene 1 of {SCENES.length}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
        {SCENES.map((scene, i) => (
          <div
            key={scene.id}
            ref={(el) => { sceneRefs.current[i] = el }}
            className={\`p-6 pt-16 rounded-2xl bg-gradient-to-br \${scene.gradient} border-2 border-[var(--color-border)] shadow-lg min-h-[180px] relative overflow-hidden\`}
          >
            <div className="absolute top-3 left-4 text-white/60 text-xs font-mono">{String(i + 1).padStart(2, '0')}</div>
            <div ref={(el) => { textRefs.current[i] = el }}>
              <h3 className="text-2xl font-bold text-white mb-2">{scene.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">{scene.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
`;export{e as default};
