import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function DropdownAnimate() {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])
  const openRef = useRef(false)

  useEffect(() => {
    const trigger = triggerRef.current
    const dropdown = dropdownRef.current
    const items = itemsRef.current
    if (!trigger || !dropdown || !items.length) return

    const ctx = gsap.context(() => {
      gsap.set(dropdown, { opacity: 0, y: -8, scale: 0.95, display: 'none' })
      gsap.set(items, { opacity: 0, x: -10 })
    })

    const toggle = () => {
      if (openRef.current) {
        gsap.to(items, { opacity: 0, x: -10, duration: 0.15, stagger: 0.02 })
        gsap.to(dropdown, { opacity: 0, y: -8, scale: 0.95, duration: 0.2, ease: 'power2.in', onComplete: () => { gsap.set(dropdown, { display: 'none' }) } })
      } else {
        gsap.set(dropdown, { display: 'block' })
        gsap.to(dropdown, { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'power2.out' })
        gsap.to(items, { opacity: 1, x: 0, duration: 0.2, stagger: 0.05, delay: 0.1 })
      }
      openRef.current = !openRef.current
    }

    trigger.addEventListener('click', toggle)
    return () => {
      ctx.revert()
      trigger.removeEventListener('click', toggle)
    }
  }, [])

  const setItemRef = (el: HTMLDivElement | null, i: number) => {
    if (el) itemsRef.current[i] = el
  }

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Dropdown Animate</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Animated dropdown menu</p>
      <div className="relative">
        <button
          ref={triggerRef}
          className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium cursor-pointer"
        >
          Dropdown
        </button>
        <div
          ref={dropdownRef}
          className="absolute top-full mt-2 w-36 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-2 shadow-xl"
        >
          {['Profile', 'Settings', 'Logout'].map((item, i) => (
            <div
              key={item}
              ref={(el) => setItemRef(el, i)}
              className="px-3 py-2 rounded-lg text-sm text-[var(--color-text)] hover:bg-[var(--color-surface-2)] cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
