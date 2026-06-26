const e=`import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function SVGHamburger() {
  const svgRef = useRef<SVGSVGElement>(null)
  const line1Ref = useRef<SVGLineElement>(null)
  const line2Ref = useRef<SVGLineElement>(null)
  const line3Ref = useRef<SVGLineElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (open) {
        gsap.to(line1Ref.current, { attr: { x1: 30, y1: 30, x2: 70, y2: 70 }, duration: 0.3, ease: 'power2.out' })
        gsap.to(line2Ref.current, { attr: { x1: 30, y1: 50, x2: 70, y2: 50 }, opacity: 0, duration: 0.2 })
        gsap.to(line3Ref.current, { attr: { x1: 30, y1: 70, x2: 70, y2: 30 }, duration: 0.3, ease: 'power2.out' })
      } else {
        gsap.to(line1Ref.current, { attr: { x1: 30, y1: 30, x2: 70, y2: 30 }, duration: 0.3, ease: 'power2.out' })
        gsap.to(line2Ref.current, { attr: { x1: 30, y1: 50, x2: 70, y2: 50 }, opacity: 1, duration: 0.2 })
        gsap.to(line3Ref.current, { attr: { x1: 30, y1: 70, x2: 70, y2: 70 }, duration: 0.3, ease: 'power2.out' })
      }
    }, svgRef)

    return () => ctx.revert()
  }, [open])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">SVG Hamburger</h2>
      <button onClick={() => setOpen(!open)} className="focus:outline-none">
        <svg ref={svgRef} viewBox="0 0 100 100" className="w-24 h-24 cursor-pointer">
          <line ref={line1Ref} x1="30" y1="30" x2="70" y2="30" stroke="var(--color-primary)" strokeWidth="4" strokeLinecap="round" />
          <line ref={line2Ref} x1="30" y1="50" x2="70" y2="50" stroke="var(--color-primary)" strokeWidth="4" strokeLinecap="round" />
          <line ref={line3Ref} x1="30" y1="70" x2="70" y2="70" stroke="var(--color-primary)" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </button>
      <span className="text-sm text-[var(--color-text-muted)]">Click to toggle</span>
    </div>
  )
}
`;export{e as default};
