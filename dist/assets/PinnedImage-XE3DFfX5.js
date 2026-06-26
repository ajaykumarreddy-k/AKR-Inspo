const e=`import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PinnedImage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        pin: imageRef.current,
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
        ref={imageRef}
        className="flex h-screen w-full items-center justify-center overflow-hidden"
      >
        <div
          className="flex h-[60vh] w-[60vh] items-center justify-center rounded-3xl text-8xl font-bold"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
            color: 'var(--color-bg)',
            boxShadow: '0 0 80px rgba(100, 108, 255, 0.3)',
          }}
        >
          IMG
        </div>
      </div>
      <div className="relative z-0">
        {['Section One', 'Section Two', 'Section Three', 'Section Four'].map(
          (label, i) => (
            <div
              key={i}
              className="flex h-screen items-center justify-center"
              style={{
                background: i % 2 === 0 ? 'var(--color-surface)' : 'var(--color-bg)',
              }}
            >
              <div className="max-w-md text-center">
                <h3
                  className="mb-4 text-3xl font-bold"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {label}
                </h3>
                <p style={{ color: 'var(--color-text-muted)' }}>
                  Text scrolls over the pinned image element, creating a parallax-like
                  overlay effect.
                </p>
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
};

export default PinnedImage;
`;export{e as default};
