import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function DestroyRecreateTriggers() {
  const boxRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(true)
  const triggerRef = useRef<ScrollTrigger | null>(null)

  const destroyTrigger = useCallback(() => {
    if (triggerRef.current) {
      triggerRef.current.kill()
      triggerRef.current = null
    }
    gsap.set(boxRef.current, { scale: 0.5, opacity: 0.3 })
    setActive(false)
  }, [])

  const createTrigger = useCallback(() => {
    if (triggerRef.current) return

    triggerRef.current = ScrollTrigger.create({
      trigger: boxRef.current,
      start: 'top 80%',
      end: 'top 20%',
      scrub: 1,
      onUpdate: (self) => {
        gsap.to(boxRef.current, {
          scale: 0.5 + self.progress * 0.5,
          opacity: 0.3 + self.progress * 0.7,
          duration: 0.1,
          overwrite: 'auto'
        })
      }
    })
    setActive(true)
  }, [])

  useEffect(() => {
    createTrigger()
    return () => {
      if (triggerRef.current) {
        triggerRef.current.kill()
        triggerRef.current = null
      }
    }
  }, [createTrigger])

  return (
    <div className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4">
      <h2 className="text-3xl font-bold mb-8 text-[var(--color-text)]">17. Destroy / Recreate</h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        Toggle the trigger on and off, destroying and recreating the ScrollTrigger instance.
      </p>
      <div className="h-[40vh]" />
      <div className="flex gap-4 mb-8">
        <button
          onClick={destroyTrigger}
          disabled={!active}
          className={`px-6 py-3 rounded-xl font-bold shadow-lg transition-all ${
            active
              ? 'bg-[var(--color-danger)] text-white hover:opacity-90'
              : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] cursor-not-allowed'
          }`}
        >
          Destroy
        </button>
        <button
          onClick={createTrigger}
          disabled={active}
          className={`px-6 py-3 rounded-xl font-bold shadow-lg transition-all ${
            !active
              ? 'bg-[var(--color-success)] text-white hover:opacity-90'
              : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] cursor-not-allowed'
          }`}
        >
          Recreate
        </button>
      </div>
      <div
        ref={boxRef}
        className="w-64 h-64 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center shadow-lg"
      >
        <span className="text-white font-bold text-center text-sm px-4">
          {active ? 'Trigger Active' : 'Trigger Removed'}
        </span>
      </div>
      <div className="h-[30vh]" />
    </div>
  )
}
