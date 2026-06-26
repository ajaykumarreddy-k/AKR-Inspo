const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STORIES = [
  { title: 'The Beginning', color: '#6366f1', text: 'Every journey starts with a single step into the unknown.' },
  { title: 'The Conflict', color: '#ec4899', text: 'Obstacles arise, testing resolve and revealing true strength.' },
  { title: 'The Discovery', color: '#14b8a6', text: 'Hidden paths emerge, offering new perspectives and hope.' },
  { title: 'The Resolution', color: '#f59e0b', text: 'Challenges overcome, wisdom gained, the story finds its close.' }
]

export default function InteractiveStorySections() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          pin: true
        }
      })

      cardRefs.current.forEach((card, i) => {
        if (!card) return
        const content = contentRefs.current[i]
        tl.fromTo(card, { x: i % 2 === 0 ? -300 : 300, opacity: 0, rotationY: 40 }, { x: 0, opacity: 1, rotationY: 0, duration: 0.4, ease: 'power3.out' })
          .to(card, { scale: 1.08, duration: 0.15, boxShadow: '0 20px 60px rgba(0,0,0,0.5)' })
          .to(card, { scale: 1, duration: 0.1 })
        if (content) {
          tl.fromTo(content, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.2 })
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[200vh] flex flex-col items-center justify-center px-4 bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold mb-6 text-[var(--color-text)]">Interactive Story Sections</h2>
      <p className="text-[var(--color-text-muted)] mb-12 text-center max-w-lg">
        Each story chapter triggers a part of the timeline as it scrolls into focus.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
        {STORIES.map((story, i) => (
          <div
            key={story.title}
            ref={(el) => { cardRefs.current[i] = el }}
            className="p-6 rounded-2xl border border-[var(--color-border)] shadow-lg"
            style={{ backgroundColor: \`\${story.color}22\`, borderColor: \`\${story.color}55\` }}
          >
            <div className="w-3 h-3 rounded-full mb-3" style={{ backgroundColor: story.color }} />
            <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">{story.title}</h3>
            <div ref={(el) => { contentRefs.current[i] = el }}>
              <p className="text-[var(--color-text-muted)] leading-relaxed">{story.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
`;export{e as default};
