import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function CharacterCascade({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;
    const ctx = gsap.context(() => {
      const chars = el.querySelectorAll('.char');
      gsap.from(chars, {
        y: -80,
        opacity: 0,
        scale: 0.5,
        duration,
        ease,
        stagger: 0.04,
        scrollTrigger: { trigger: el, markers, scrub, pin, start, end }
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  const text = 'Cascade';
  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen bg-indigo-950 text-white p-8">
      <h2 className="text-5xl md:text-7xl font-bold">
        {text.split('').map((c, i) => (
          <span key={i} className="char inline-block">{c === ' ' ? '\u00A0' : c}</span>
        ))}
      </h2>
      <div className="h-screen" />
    </div>
  );
}
