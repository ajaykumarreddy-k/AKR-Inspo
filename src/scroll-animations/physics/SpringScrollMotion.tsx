import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function SpringScrollMotion({ markers = false, scrub = false, pin = true, start = 'top 80%', end = '+=200%', duration = 1.2, ease = 'back.out(1.7)', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;
    const boxes = el.querySelectorAll('.spring-box');
    const ctx = gsap.context(() => {
      gsap.from(boxes, {
        scale: 0.3,
        opacity: 0,
        y: 100,
        duration,
        ease,
        stagger: 0.15,
        scrollTrigger: { trigger: el, markers, scrub, pin, start, end }
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-8 gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="spring-box w-48 h-24 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
          Spring {i}
        </div>
      ))}
      <div className="h-screen" />
    </div>
  );
}
