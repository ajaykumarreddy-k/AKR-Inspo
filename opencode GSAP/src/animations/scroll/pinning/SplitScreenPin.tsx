import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SplitScreenPin = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        pin: leftRef.current,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[250vh]"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="flex">
        <div
          ref={leftRef}
          className="flex h-screen w-1/2 items-center justify-center"
          style={{
            background: 'linear-gradient(180deg, var(--color-primary), var(--color-accent))',
          }}
        >
          <div className="text-center">
            <h2 className="mb-4 text-5xl font-bold" style={{ color: 'var(--color-text)' }}>
              Pinned Side
            </h2>
            <p className="max-w-sm px-4" style={{ color: 'var(--color-text-muted)' }}>
              This side stays in place while the right side scrolls.
            </p>
          </div>
        </div>
        <div className="w-1/2">
          {['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'].map((step, i) => (
            <div
              key={i}
              className="flex h-screen items-center justify-center"
              style={{
                background: i % 2 === 0 ? 'var(--color-surface)' : 'var(--color-bg)',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              <div className="text-center">
                <span
                  className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold"
                  style={{ background: 'var(--color-primary)', color: 'var(--color-bg)' }}
                >
                  {i + 1}
                </span>
                <h3 className="mt-3 text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                  {step}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SplitScreenPin;
