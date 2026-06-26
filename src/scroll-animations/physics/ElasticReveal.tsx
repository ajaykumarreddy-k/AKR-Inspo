import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function ElasticReveal({ markers = false, scrub = false, pin = true, start = 'top 80%', end = '+=200%', duration = 1.2, ease = 'elastic.out(1,0.5)', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;
    const items = el.querySelectorAll('.elastic-item');
    const ctx = gsap.context(() => {
      gsap.from(items, {
        scaleX: 0,
        opacity: 0,
        duration,
        ease,
        stagger: 0.2,
        scrollTrigger: { trigger: el, markers, scrub, pin, start, end }
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-8 gap-6">
      {['Elastic', 'Stretch', 'Reveal'].map((text, i) => (
        <div key={i} className="elastic-item w-64 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold origin-left">
          {text}
        </div>
      ))}
      <div className="h-screen" />
    </div>
  );
}
