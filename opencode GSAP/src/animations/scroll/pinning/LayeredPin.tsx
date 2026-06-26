import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const layers = [
  { label: 'Layer 1 — Background', color: '#1a1a2e', z: 0 },
  { label: 'Layer 2 — Midground', color: '#16213e', z: 1 },
  { label: 'Layer 3 — Foreground', color: '#0f3460', z: 2 },
  { label: 'Layer 4 — UI Overlay', color: 'var(--color-accent)', z: 3 },
];

const LayeredPin = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLDivElement>('.layer-panel');

      panels.forEach((panel, i) => {
        if (i === 0) {
          ScrollTrigger.create({
            trigger: panel,
            start: 'top top',
            end: `+=${(panels.length - 1) * 100}%`,
            pin: true,
          });
        }
      });

      gsap.fromTo(
        '.layer-panel:not(:first-child)',
        { yPercent: 100 },
        {
          yPercent: 0,
          stagger: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${(panels.length - 1) * 100}%`,
            scrub: 1,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[400vh]"
      style={{ background: 'var(--color-bg)' }}
    >
      <div ref={layersRef} className="relative h-screen">
        {layers.map((layer, i) => (
          <div
            key={i}
            className={`layer-panel absolute inset-0 flex items-center justify-center ${
              i === 0 ? 'static h-screen' : 'h-screen'
            }`}
            style={{
              background: layer.color,
              zIndex: layer.z,
            }}
          >
            <div className="text-center">
              <span
                className="mb-3 inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest"
                style={{ background: 'rgba(0,0,0,0.4)', color: 'var(--color-text-muted)' }}
              >
                {i + 1} of {layers.length}
              </span>
              <h3
                className="text-5xl font-bold"
                style={{ color: i === layers.length - 1 ? 'var(--color-bg)' : 'var(--color-text)' }}
              >
                {layer.label}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LayeredPin;
