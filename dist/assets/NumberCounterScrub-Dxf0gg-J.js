const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function NumberCounterScrub() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const numRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const obj = { val: 0 }

      gsap.to(obj, {
        val: 100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
        ease: 'none',
        onUpdate: () => {
          if (numRef.current) {
            numRef.current.textContent = Math.round(obj.val).toString()
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4 bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold mb-4 text-[var(--color-text)]">Number Counter Scrub</h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        A number that counts from 0 to 100 smoothly linked to scroll position.
      </p>
      <div className="h-[20vh]" />
      <div className="w-48 h-48 rounded-full bg-[var(--color-surface)] border-4 border-[var(--color-primary)] flex items-center justify-center shadow-lg">
        <span ref={numRef} className="text-6xl font-black text-[var(--color-primary)]">0</span>
      </div>
      <div className="h-[40vh]" />
    </div>
  )
}
`;export{e as default};
