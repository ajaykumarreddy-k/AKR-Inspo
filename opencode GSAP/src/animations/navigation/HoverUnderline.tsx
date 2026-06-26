import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function HoverUnderline() {
  const linksRef = useRef<HTMLDivElement[]>([])
  const underlinesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const links = linksRef.current
    const underlines = underlinesRef.current
    if (!links.length || !underlines.length) return

    const ctx = gsap.context(() => {
      underlines.forEach((ul) => gsap.set(ul, { scaleX: 0 }))
    })

    links.forEach((link, i) => {
      const enter = () => gsap.to(underlines[i], { scaleX: 1, duration: 0.3, ease: 'power2.out', transformOrigin: 'left center' })
      const leave = () => gsap.to(underlines[i], { scaleX: 0, duration: 0.3, ease: 'power2.in', transformOrigin: 'right center' })
      link.addEventListener('mouseenter', enter)
      link.addEventListener('mouseleave', leave)
    })

    return () => {
      ctx.revert()
      links.forEach((link) => {
        link.removeEventListener('mouseenter', () => {})
        link.removeEventListener('mouseleave', () => {})
      })
    }
  }, [])

  const setLinkRef = (el: HTMLDivElement | null, i: number) => {
    if (el) linksRef.current[i] = el
  }
  const setULRef = (el: HTMLDivElement | null, i: number) => {
    if (el) underlinesRef.current[i] = el
  }

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Hover Underline</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Underline animation on hover</p>
      <div className="flex gap-6">
        {['Home', 'About', 'Work', 'Contact'].map((item, i) => (
          <div key={item} className="relative cursor-pointer">
            <div
              ref={(el) => setLinkRef(el, i)}
              className="text-[var(--color-text)] font-medium"
            >
              {item}
            </div>
            <div
              ref={(el) => setULRef(el, i)}
              className="absolute -bottom-1 left-0 w-full h-[2px] bg-[var(--color-accent)] scale-x-0 origin-left"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
