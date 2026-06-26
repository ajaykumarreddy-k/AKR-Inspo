const t=`import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollDirectionDetection() {
  const boxRef = useRef<HTMLDivElement>(null)
  const [direction, setDirection] = useState<'none' | 'up' | 'down'>('none')
  const lastY = useRef(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: boxRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const dir = self.direction
          setDirection(dir === 1 ? 'down' : dir === -1 ? 'up' : 'none')
        }
      })

      gsap.from(boxRef.current, {
        scrollTrigger: {
          trigger: boxRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1
        },
        y: 100,
        rotation: 15,
        opacity: 0.3,
        duration: 1,
        ease: 'none'
      })

      return () => st.kill()
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4">
      <h2 className="text-3xl font-bold mb-8 text-[var(--color-text)]">12. Scroll Direction</h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-md">
        Detects whether you are scrolling up or down and displays it live.
      </p>
      <div className="h-[40vh]" />
      <div className="mb-6 text-center">
        <span className="text-sm font-mono text-[var(--color-text-muted)]">
          Direction:{' '}
          <span
            className={\`text-2xl font-bold \${
              direction === 'down'
                ? 'text-[var(--color-success)]'
                : direction === 'up'
                ? 'text-[var(--color-danger)]'
                : 'text-[var(--color-text-muted)]'
            }\`}
          >
            {direction === 'down' ? '↓ DOWN' : direction === 'up' ? '↑ UP' : '—'}
          </span>
        </span>
      </div>
      <div
        ref={boxRef}
        className="w-64 h-64 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center shadow-lg"
      >
        <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18" />
        </svg>
      </div>
      <div className="h-[30vh]" />
    </div>
  )
}
`;export{t as default};
