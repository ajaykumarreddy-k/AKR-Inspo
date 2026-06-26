import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PinnedText = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        pin: pinRef.current,
      });

      gsap.to(pinRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        color: 'var(--color-accent)',
        scale: 1.2,
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
      <div
        ref={pinRef}
        className="flex h-screen flex-col items-center justify-center"
      >
        <h2
          className="mb-6 text-7xl font-bold transition-colors"
          style={{ color: 'var(--color-primary)' }}
        >
          Pinned Text
        </h2>
        <p
          className="max-w-2xl text-center text-xl transition-all"
          style={{ color: 'var(--color-text-muted)' }}
        >
          This text stays pinned in the center while the background and
          surrounding content scroll through — watch it transform.
        </p>
      </div>
      <div className="relative z-0">
        {['#1a1a2e', '#16213e', '#0f3460', '#1a1a2e'].map((color, i) => (
          <div
            key={i}
            className="flex h-screen items-center justify-center"
            style={{ background: color }}
          >
            <span className="text-2xl font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
              Background {i + 1}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PinnedText;
