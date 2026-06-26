import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function AnimatedLogo({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const logo = logoRef.current;
    if (!el || !logo || disabled) return;
    const ctx = gsap.context(() => {
      gsap.from(logo.children, {
        scale: 0, rotation: -180, opacity: 0, stagger: 0.15, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'center center', scrub: scrub || 1, markers, pin },
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-950 flex flex-col items-center justify-center py-32 px-8">
      <h2 className="text-3xl font-bold text-white mb-2">Animated Logo</h2>
      <p className="text-gray-400 mb-12">Logo pieces animate into view on scroll</p>
      <svg viewBox="0 0 300 200" className="w-full max-w-sm" xmlns="http://www.w3.org/2000/svg">
        <g ref={logoRef}>
          <circle cx="80" cy="100" r="40" fill="url(#log1)" opacity="0.9" />
          <rect x="150" y="60" width="80" height="80" rx="16" fill="url(#log2)" opacity="0.9" />
          <polygon points="270,60 300,140 240,140" fill="url(#log3)" opacity="0.9" />
        </g>
        <defs>
          <linearGradient id="log1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#06b6d4" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient>
          <linearGradient id="log2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f472b6" /><stop offset="100%" stopColor="#ec4899" /></linearGradient>
          <linearGradient id="log3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#fbbf24" /><stop offset="100%" stopColor="#f59e0b" /></linearGradient>
        </defs>
      </svg>
    </div>
  );
}
