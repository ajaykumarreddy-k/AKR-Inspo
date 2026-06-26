const e=`import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const items = ['A', 'B', 'C', 'D', 'E'];

const ProgressivePin = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLDivElement>('.progressive-item');

      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
            gsap.to(panel, {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              overwrite: 'auto',
            });
          },
          onLeave: () => {
            gsap.to(panel, {
              scale: 0.8,
              opacity: 0.3,
              duration: 0.5,
              overwrite: 'auto',
            });
          },
          onEnterBack: () => {
            gsap.to(panel, {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              overwrite: 'auto',
            });
          },
          onLeaveBack: () => {
            gsap.to(panel, {
              scale: 0.8,
              opacity: 0.3,
              duration: 0.5,
              overwrite: 'auto',
            });
          },
        });
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        pin: true,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[300vh]"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="flex h-screen flex-col items-center justify-center">
        <h2
          className="mb-12 text-4xl font-bold"
          style={{ color: 'var(--color-primary)' }}
        >
          Progressive Pin
        </h2>
        <div className="flex gap-4">
          {items.map((label, i) => (
            <div
              key={i}
              className="progressive-item flex h-32 w-32 items-center justify-center rounded-2xl text-3xl font-bold opacity-30"
              style={{
                background: 'var(--color-surface)',
                border: '2px solid var(--color-border)',
                color: 'var(--color-text)',
                transform: 'scale(0.8)',
              }}
            >
              {label}
            </div>
          ))}
        </div>
        <p className="mt-12 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Each element pins progressively as you scroll
        </p>
      </div>
    </section>
  );
};

export default ProgressivePin;
`;export{e as default};
