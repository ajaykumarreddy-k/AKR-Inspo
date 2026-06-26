const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function AccordionNav() {
  const sectionsRef = useRef<{ header: HTMLDivElement; content: HTMLDivElement; open: boolean }[]>([])

  useEffect(() => {
    const sections = sectionsRef.current
    if (!sections.length) return

    const ctx = gsap.context(() => {
      sections.forEach((s) => {
        gsap.set(s.content, { height: 0, opacity: 0, padding: '0 16px' })
      })
    })

    sections.forEach((s, i) => {
      s.header.addEventListener('click', () => {
        const isOpen = s.open
        sections.forEach((sec, j) => {
          if (j === i) return
          if (sec.open) {
            gsap.to(sec.content, { height: 0, opacity: 0, padding: '0 16px', duration: 0.3, ease: 'power2.in' })
            sec.open = false
          }
        })
        if (isOpen) {
          gsap.to(s.content, { height: 0, opacity: 0, padding: '0 16px', duration: 0.3, ease: 'power2.in' })
        } else {
          gsap.to(s.content, { height: 'auto', opacity: 1, padding: '12px 16px', duration: 0.3, ease: 'power2.out' })
        }
        s.open = !isOpen
      })
    })

    return () => ctx.revert()
  }, [])

  const setSectionRef = (el: HTMLDivElement | null, i: number, type: 'header' | 'content') => {
    if (!el) return
    if (!sectionsRef.current[i]) sectionsRef.current[i] = { header: el, content: el, open: false }
    if (type === 'header') sectionsRef.current[i].header = el
    else sectionsRef.current[i].content = el
  }

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Accordion Nav</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Accordion-style navigation</p>
      <div className="w-48 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden">
        {[
          { title: 'Section 1', desc: 'Content for section 1' },
          { title: 'Section 2', desc: 'Content for section 2' },
          { title: 'Section 3', desc: 'Content for section 3' },
        ].map((sec, i) => (
          <div key={sec.title}>
            <div
              ref={(el) => setSectionRef(el, i, 'header')}
              className="px-4 py-3 text-sm font-medium text-[var(--color-text)] border-b border-[var(--color-border)] cursor-pointer hover:bg-[var(--color-surface-2)]"
            >
              {sec.title}
            </div>
            <div
              ref={(el) => setSectionRef(el, i, 'content')}
              className="overflow-hidden text-sm text-[var(--color-text-muted)]"
            >
              {sec.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
`;export{e as default};
