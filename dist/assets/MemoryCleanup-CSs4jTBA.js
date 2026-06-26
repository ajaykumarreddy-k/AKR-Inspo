const e=`import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function MemoryCleanup() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [triggerCount, setTriggerCount] = useState(0)
  const ctxRef = useRef<gsap.Context | null>(null)

  const create = useCallback(() => {
    if (ctxRef.current) {
      ctxRef.current.revert()
    }

    const ctx = gsap.context(() => {
      for (let i = 0; i < 5; i++) {
        const id = \`mem-box-\${i}\`
        const el = document.getElementById(id)
        if (!el) continue
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
          onEnter: () => {
            gsap.to(el, {
              scale: 1.1,
              backgroundColor: 'var(--color-accent)',
              duration: 0.4,
              overwrite: 'auto'
            })
          },
          onLeaveBack: () => {
            gsap.to(el, {
              scale: 1,
              backgroundColor: 'var(--color-surface)',
              duration: 0.4,
              overwrite: 'auto'
            })
          }
        })
      }
    }, sectionRef)

    ctxRef.current = ctx
    setActive(true)
    setTriggerCount((c) => c + 5)
  }, [])

  const destroy = useCallback(() => {
    if (ctxRef.current) {
      ctxRef.current.revert()
      ctxRef.current = null
    }
    setActive(false)
  }, [])

  useEffect(() => {
    return () => destroy()
  }, [destroy])

  return (
    <div ref={sectionRef} className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4">
      <h2 className="text-3xl font-bold mb-2 text-[var(--color-text)]">MemoryCleanup</h2>
      <p className="text-[var(--color-text-muted)] mb-4 text-center max-w-lg">
        Create / destroy triggers to verify cleanup. Tracked: <span className="font-mono text-[var(--color-primary)]">{triggerCount}</span> triggers created.
      </p>

      <div className="flex gap-4 mb-8">
        <button
          onClick={create}
          className="px-6 py-2 rounded-lg bg-[var(--color-primary)] text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-40"
          disabled={active}
        >
          Create
        </button>
        <button
          onClick={destroy}
          className="px-6 py-2 rounded-lg bg-[var(--color-accent)] text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-40"
          disabled={!active}
        >
          Destroy
        </button>
      </div>

      <div className="h-[10vh]" />

      <div className="grid grid-cols-5 gap-3 w-full max-w-2xl">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            id={\`mem-box-\${i}\`}
            className="aspect-square rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] text-xs font-mono transition-colors"
          >
            {i + 1}
          </div>
        ))}
      </div>

      <p className="text-[var(--color-text-muted)] text-xs mt-4">
        State: {active ? 'Active' : 'Cleaned up'} &middot; Context-based cleanup via ctx.revert()
      </p>
      <div className="h-[30vh]" />
    </div>
  )
}
`;export{e as default};
