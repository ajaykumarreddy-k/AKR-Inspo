import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sections = ['Section A', 'Section B', 'Section C', 'Section D'];

const colors = [
  'var(--color-primary)',
  'var(--color-accent)',
  '#e74c3c',
  '#2ecc71',
];

const MultiSectionPin = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLDivElement>('.multi-panel');

      panels.forEach((panel) => {
        ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
          end: '+=100%',
          pin: true,
          pinSpacing: false,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ background: 'var(--color-bg)' }} className="w-full">
      <h2
        className="sticky top-0 z-10 p-8 text-center text-4xl font-bold w-full"
        style={{
          background: 'var(--color-bg)',
          color: 'var(--color-primary)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        Multi-Section Pin
      </h2>
      {sections.map((label, i) => (
        <div
          key={i}
          className="multi-panel flex h-screen w-full items-center justify-center"
          style={{ background: colors[i] }}
        >
          <div className="text-center">
            <span
              className="mb-4 inline-block rounded-full px-6 py-2 text-sm font-semibold uppercase tracking-widest"
              style={{ background: 'rgba(0,0,0,0.3)', color: 'var(--color-text)' }}
            >
              Panel {i + 1}
            </span>
            <h3 className="text-6xl font-bold" style={{ color: 'var(--color-text)' }}>
              {label}
            </h3>
          </div>
        </div>
      ))}
      <div
        className="flex h-screen w-full items-center justify-center"
        style={{ background: 'var(--color-surface)' }}
      >
        <p className="text-xl" style={{ color: 'var(--color-text-muted)' }}>
          The end — scroll back up.
        </p>
      </div>
    </section>
  );
};

export default MultiSectionPin;
