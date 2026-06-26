const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const panels = ['Panel 1', 'Panel 2', 'Panel 3', 'Panel 4']
const colors = [
  'from-[var(--color-primary)] to-[var(--color-accent)]',
  'from-[var(--color-warning)] to-[var(--color-danger)]',
  'from-[var(--color-success)] to-[var(--color-primary)]',
  'from-[var(--color-accent)] to-[var(--color-warning)]'
]

export default function HorizontalContainers() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        x: () => -(trackRef.current!.scrollWidth - sectionRef.current!.offsetWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => \`+=\${trackRef.current!.scrollWidth}\`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-[200vh] flex flex-col items-center justify-start pt-32 px-4">
      <h2 className="text-3xl font-bold mb-8 text-[var(--color-text)]">15. Horizontal Scroll</h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        Panels scroll horizontally while the section stays pinned.
      </p>
      <div className="h-[20vh]" />
      <div ref={sectionRef} className="w-full max-w-3xl overflow-hidden rounded-2xl">
        <div ref={trackRef} className="flex gap-4">
          {panels.map((panel, i) => (
            <div
              key={panel}
              className={\`min-w-[300px] h-64 rounded-2xl bg-gradient-to-br \${colors[i]} flex items-center justify-center shadow-lg\`}
            >
              <span className="text-white font-bold text-2xl">{panel}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[30vh]" />
    </div>
  )
}
`;export{e as default};
