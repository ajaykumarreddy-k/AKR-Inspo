import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function SVGCircularProgress({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const circle = circleRef.current;
    const text = textRef.current;
    if (!el || !circle || !text || disabled) return;
    const ctx = gsap.context(() => {
      const radius = 80;
      const circumference = 2 * Math.PI * radius;
      gsap.set(circle, { strokeDasharray: circumference, strokeDashoffset: circumference });
      gsap.to(circle, {
        strokeDashoffset: 0, ease: 'none',
        scrollTrigger: {
          trigger: el, start: 'top 80%', end: 'bottom 20%', scrub: scrub || 1, markers, pin,
          onUpdate: (self) => {
            const pct = Math.round(self.progress * 100);
            text.textContent = `${pct}%`;
          },
        },
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-950 flex flex-col items-center justify-center py-32 px-8">
      <h2 className="text-3xl font-bold text-white mb-2">Circular Progress</h2>
      <p className="text-gray-400 mb-12">A ring that fills on scroll</p>
      <div className="relative w-56 h-56">
        <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
          <circle cx="100" cy="100" r="80" fill="none" stroke="white/10" strokeWidth="8" />
          <circle
            ref={circleRef}
            cx="100" cy="100" r="80"
            fill="none"
            stroke="url(#circGrad)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="circGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
        <span ref={textRef} className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white">
          0%
        </span>
      </div>
    </div>
  );
}
