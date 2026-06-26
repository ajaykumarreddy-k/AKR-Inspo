const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function RepeatAnimation() {
  const boxRef = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let count = 0
    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, {
        x: 150,
        duration: 1,
        ease: 'power2.inOut',
        repeat: 5,
        yoyo: true,
        onRepeat: () => {
          count++
          if (countRef.current) countRef.current.textContent = \`\${count}/5\`
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Repeat &amp; Yoyo</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Animation repeats with yoyo (reverse)</p>
      <div className="relative w-72 h-20 flex items-center">
        <div
          ref={boxRef}
          className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg flex items-center justify-center text-white font-bold"
        >
          R
        </div>
      </div>
      <span className="text-xs text-[var(--color-text-muted)]">Repeat: <span ref={countRef}>0/5</span></span>
    </div>
  )
}
`;export{e as default};
