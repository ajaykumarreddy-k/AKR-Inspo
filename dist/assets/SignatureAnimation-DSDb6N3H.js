const t=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SignatureAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !pathRef.current) return

    const path = pathRef.current
    const length = path.getTotalLength()

    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 20%',
          scrub: 1.5,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      className="min-h-[150vh] py-24 px-8 flex flex-col items-center justify-center bg-[var(--color-bg)]"
    >
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-16">
        Signature Animation
      </h2>
      <svg
        viewBox="0 0 600 250"
        className="w-full max-w-lg h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={pathRef}
          d="M40 180 C60 90 90 40 130 60 C170 80 160 130 180 160 C200 190 220 100 250 80 C280 60 300 130 310 160 C320 190 340 50 370 60 C400 70 390 140 420 150 C450 160 460 60 490 70 C520 80 510 140 530 160 C550 180 560 120 570 100"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M40 180 C35 175 38 168 45 170"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
      <p className="mt-8 text-[var(--color-text-muted)] text-sm">
        Handwritten signature draws naturally on scroll
      </p>
    </div>
  )
}
`;export{t as default};
