const e=`import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const scenes = [
  { title: 'The Beginning', color: 'var(--color-primary)' },
  { title: 'The Struggle', color: 'var(--color-accent)' },
  { title: 'The Climax', color: '#e74c3c' },
  { title: 'The Resolution', color: '#2ecc71' },
];

const ScrollStorytelling = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scenesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLDivElement>('.story-scene');

      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
          end: 'bottom top',
          pin: true,
          pinSpacing: false,
        });

        gsap.fromTo(
          panel.querySelector('.story-content'),
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: panel,
              start: 'top 80%',
              end: 'top 30%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ background: 'var(--color-bg)' }}>
      <h2
        className="sticky top-0 z-10 p-8 text-center text-4xl font-bold"
        style={{ background: 'var(--color-bg)', color: 'var(--color-primary)' }}
      >
        Scroll Storytelling
      </h2>
      <div ref={scenesRef}>
        {scenes.map((scene, i) => (
          <div
            key={i}
            className="story-scene flex h-screen items-center justify-center"
            style={{ background: scene.color }}
          >
            <div className="story-content max-w-xl rounded-2xl p-12 text-center" style={{ background: 'rgba(0,0,0,0.4)' }}>
              <span className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
                Chapter {i + 1}
              </span>
              <h3 className="mb-4 text-5xl font-bold" style={{ color: 'var(--color-text)' }}>
                {scene.title}
              </h3>
              <p style={{ color: 'var(--color-text-muted)' }}>
                Each scene pins as you scroll, creating a narrative journey through the page.
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScrollStorytelling;
`;export{e as default};
