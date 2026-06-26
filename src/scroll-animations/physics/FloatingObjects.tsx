import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function FloatingObjects({ markers = false, scrub = 0.5, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'sine.inOut', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;
    const floats = el.querySelectorAll('.float-object');
    const ctx = gsap.context(() => {
      floats.forEach((obj, i) => {
        const delay = i * 0.2;
        gsap.to(obj, {
          y: -30 + (i * 10),
          rotation: i * 10,
          duration: 2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay,
          scrollTrigger: { trigger: el, markers, scrub, pin, start, end }
        });
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-sky-900 to-indigo-950 p-8 overflow-hidden">
      {['✦', '●', '■', '▲'].map((shape, i) => (
        <div key={i} className="float-object absolute text-white text-5xl opacity-60" style={{ left: `${20 + i * 20}%`, top: '40%' }}>
          {shape}
        </div>
      ))}
      <p className="text-white text-2xl relative z-10">Floating Objects</p>
      <div className="h-screen" />
    </div>
  );
}
