const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function MenuReveal() {
  const menuRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])
  const btnRef = useRef<HTMLButtonElement>(null)
  const openRef = useRef(false)

  useEffect(() => {
    const menu = menuRef.current
    const items = itemsRef.current
    const btn = btnRef.current
    if (!menu || !items.length || !btn) return

    const ctx = gsap.context(() => {
      gsap.set(menu, { x: '100%' })
      gsap.set(items, { x: 40, opacity: 0 })
    })

    const toggle = () => {
      if (openRef.current) {
        gsap.to(items, { x: 40, opacity: 0, duration: 0.2, ease: 'power2.in', stagger: 0.03 })
        gsap.to(menu, { x: '100%', duration: 0.4, ease: 'power3.in' })
      } else {
        gsap.to(menu, { x: '0%', duration: 0.4, ease: 'power3.out' })
        gsap.to(items, { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out', stagger: 0.07, delay: 0.2 })
      }
      openRef.current = !openRef.current
    }

    btn.addEventListener('click', toggle)
    return () => {
      ctx.revert()
      btn.removeEventListener('click', toggle)
    }
  }, [])

  const setItemRef = (el: HTMLDivElement | null, i: number) => {
    if (el) itemsRef.current[i] = el
  }

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4 relative overflow-hidden">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Menu Reveal</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Menu reveal/slide animation</p>
      <button
        ref={btnRef}
        className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium cursor-pointer z-10"
      >
        Toggle Menu
      </button>
      <div
        ref={menuRef}
        className="absolute right-0 top-0 w-40 h-64 bg-[var(--color-surface)] border-l border-[var(--color-border)] p-4 flex flex-col gap-3"
      >
        {['Home', 'About', 'Services', 'Contact'].map((item, i) => (
          <div
            key={item}
            ref={(el) => setItemRef(el, i)}
            className="text-[var(--color-text)] text-sm font-medium cursor-pointer hover:text-[var(--color-primary)]"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
`;export{e as default};
