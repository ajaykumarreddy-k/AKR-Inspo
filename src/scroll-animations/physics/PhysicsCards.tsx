import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function PhysicsCards({ markers = false, scrub = 0.5, pin = true, start = 'top 90%', end = '+=200%', duration = 1.2, ease = 'power4.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;
    const cards = el.querySelectorAll('.physics-card');
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.from(card, {
          x: i % 2 === 0 ? -300 : 300,
          rotation: i % 2 === 0 ? -30 : 30,
          opacity: 0,
          duration,
          ease,
          scrollTrigger: { trigger: card, markers, scrub, pin, start, end }
        });
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-8 gap-8">
      {['Card One', 'Card Two', 'Card Three', 'Card Four'].map((label, i) => (
        <div key={i} className="physics-card w-72 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-2xl">
          {label}
        </div>
      ))}
      <div className="h-screen" />
    </div>
  );
}
