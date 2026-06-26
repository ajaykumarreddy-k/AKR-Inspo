import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function CircularProgress({ markers = false, scrub = 1, pin = true, start = 'top top', end = 'bottom bottom', duration = 1, ease = 'none', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    const circle = circleRef.current;
    if (!el || !circle || disabled) return;
    const length = 502.65;
    const ctx = gsap.context(() => {
      gsap.set(circle, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(circle, {
        strokeDashoffset: 0,
        duration,
        ease,
        scrollTrigger: { trigger: document.body, markers, scrub, pin: false, start, end }
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="fixed bottom-8 right-8 z-50 w-20 h-20">
      <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
        <circle cx="100" cy="100" r="80" fill="none" stroke="#374151" strokeWidth="12" />
        <circle ref={circleRef} cx="100" cy="100" r="80" fill="none" stroke="#8b5cf6" strokeWidth="12" strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-white text-xs">Scroll</div>
      <div className="h-screen" />
    </div>
  );
}
