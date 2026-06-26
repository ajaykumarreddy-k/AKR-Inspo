const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function BasicMotionPath() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        x: 200,
        y: 80,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Basic Motion Path</h2>
      <div className="relative w-72 h-48 border border-[var(--color-border)] rounded-lg overflow-hidden">
        <div ref={ref} className="absolute top-8 left-8 w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg" />
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 288 192">
          <path d="M48 48 L248 128" fill="none" stroke="var(--color-border)" strokeWidth="2" strokeDasharray="6 4" />
        </svg>
      </div>
    </div>
  )
}
`;export{e as default};
