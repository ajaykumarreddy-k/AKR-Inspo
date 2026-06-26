const e=`import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let triggerIdCounter = 0

export default function DynamicTriggerCreation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [boxes, setBoxes] = useState<number[]>([])
  const triggersRef = useRef<ScrollTrigger[]>([])

  const addBox = useCallback(() => {
    setBoxes((prev) => [...prev, Date.now()])
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll('.dynamic-box')
      if (!items) return

      items.forEach((item, i) => {
        const st = ScrollTrigger.create({
          trigger: item,
          start: 'top 85%',
          end: 'top 35%',
          toggleActions: 'play none none none',
          onEnter: () => {
            gsap.to(item, {
              scale: 1,
              opacity: 1,
              x: 0,
              duration: 0.5,
              ease: 'back.out(2)'
            })
          }
        })
        triggersRef.current.push(st)

        gsap.set(item, { scale: 0.3, opacity: 0, x: -100 })
      })
    }, containerRef)

    return () => {
      triggersRef.current.forEach((st) => st.kill())
      triggersRef.current = []
      ctx.revert()
    }
  }, [boxes])

  return (
    <div className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4">
      <h2 className="text-3xl font-bold mb-8 text-[var(--color-text)]">16. Dynamic Triggers</h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        Click the button to dynamically create new boxes — each gets its own ScrollTrigger.
      </p>
      <div className="h-[30vh]" />
      <button
        onClick={addBox}
        className="mb-8 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white font-bold shadow-lg hover:opacity-90 transition-opacity"
      >
        + Add Box
      </button>
      <div ref={containerRef} className="flex flex-col gap-4 w-full max-w-md">
        {boxes.map((id) => (
          <div
            key={id}
            className="dynamic-box h-20 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center shadow-md"
          >
            <span className="text-white font-bold">Box #{id.toString().slice(-4)}</span>
          </div>
        ))}
      </div>
      <div className="h-[30vh]" />
    </div>
  )
}
`;export{e as default};
