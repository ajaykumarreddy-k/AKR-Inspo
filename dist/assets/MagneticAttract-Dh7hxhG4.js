const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function MagneticAttract() {
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const particles = document.querySelectorAll('.mag-particle')
      particles.forEach((p, i) => {
        gsap.to(p, {
          x: \`random(-60, 60)\`,
          y: \`random(-60, 60)\`,
          duration: \`random(1, 2)\`,
          ease: 'back.out(2)',
          repeat: -1,
          yoyo: true,
          delay: i * 0.1,
        })
      })
      gsap.to('.mag-center', {
        scale: 1.1,
        duration: 1,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 gap-4">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">Magnetic Attract</h2>
      <div ref={containerRef} className="relative w-full h-44 flex items-center justify-center">
        <div className="mag-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-[0_0_30px_rgba(168,85,247,0.5)] flex items-center justify-center text-white text-lg font-bold z-10">
          ⚡
        </div>
        {[...Array(8)].map((_, i) => (
          <div key={i} ref={el => { if (el) particlesRef.current[i] = el }} className="mag-particle absolute w-4 h-4 rounded-full bg-[var(--color-accent)] opacity-70 shadow-[0_0_10px_rgba(34,211,238,0.3)]"
            style={{ transform: \`rotate(\${i * 45}deg) translateX(70px)\` }} />
        ))}
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">Particles attracted to center</p>
    </div>
  )
}
`;export{e as default};
