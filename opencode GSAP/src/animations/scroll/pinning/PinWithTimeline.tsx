import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PinWithTimeline = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: pinRef.current,
        },
        defaults: { ease: 'none' },
      });

      tl.to(boxRef.current, { x: 200, rotation: 90 })
        .to(boxRef.current, { scale: 1.5, backgroundColor: 'var(--color-accent)' })
        .to(boxRef.current, { x: -200, borderRadius: '50%' })
        .to(boxRef.current, { x: 0, rotation: 360, scale: 1, borderRadius: '1rem', backgroundColor: 'var(--color-primary)' });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[400vh]"
      style={{ background: 'var(--color-bg)' }}
    >
      <div
        ref={pinRef}
        className="flex h-screen flex-col items-center justify-center"
      >
        <h2
          className="mb-12 text-4xl font-bold"
          style={{ color: 'var(--color-primary)' }}
        >
          Pin With Timeline
        </h2>
        <div
          ref={boxRef}
          className="flex h-40 w-40 items-center justify-center rounded-2xl text-xl font-bold transition-colors"
          style={{
            background: 'var(--color-primary)',
            color: 'var(--color-bg)',
          }}
        >
          Animate
        </div>
        <p className="mt-12 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Scroll to drive the timeline animations
        </p>
      </div>
    </section>
  );
};

export default PinWithTimeline;
