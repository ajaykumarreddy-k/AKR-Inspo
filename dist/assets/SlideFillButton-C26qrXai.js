const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SlideFillButton() {
  const btnRef = useRef<HTMLButtonElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const btn = btnRef.current
    const fill = fillRef.current
    if (!btn || !fill) return

    const ctx = gsap.context(() => {
      gsap.set(fill, { x: '-101%' })
    })

    const enter = () => {
      gsap.to(fill, { x: '0%', duration: 0.4, ease: 'power2.out' })
    }
    const leave = () => {
      gsap.to(fill, { x: '101%', duration: 0.4, ease: 'power2.in' })
    }

    btn.addEventListener('mouseenter', enter)
    btn.addEventListener('mouseleave', leave)
    return () => {
      ctx.revert()
      btn.removeEventListener('mouseenter', enter)
      btn.removeEventListener('mouseleave', leave)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Slide Fill Button</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Button with fill sliding in on hover</p>
      <button
        ref={btnRef}
        className="relative px-6 py-3 rounded-xl border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-semibold cursor-pointer overflow-hidden bg-transparent"
      >
        <div ref={fillRef} className="absolute inset-0 bg-[var(--color-primary)]" />
        <span className="relative z-10 group-hover:text-white transition-colors">Hover Me</span>
      </button>
    </div>
  )
}
`;export{e as default};
