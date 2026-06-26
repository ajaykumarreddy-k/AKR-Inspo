const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function TypewriterEffect() {
  const textRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const text = "Hello, I'm GSAP!"
      const el = textRef.current
      if (!el) return

      el.textContent = ''
      let index = 0

      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'none'
      })

      const typeNext = () => {
        if (index < text.length) {
          el.textContent += text[index]
          index++
          gsap.delayedCall(0.08, typeNext)
        }
      }
      typeNext()
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Typewriter Effect</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Text appearing letter by letter</p>
      <div className="flex items-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-5 py-3">
        <div ref={textRef} className="text-lg font-mono text-[var(--color-text)]" />
        <span ref={cursorRef} className="text-lg font-mono text-[var(--color-accent)] ml-0.5">|</span>
      </div>
    </div>
  )
}
`;export{e as default};
