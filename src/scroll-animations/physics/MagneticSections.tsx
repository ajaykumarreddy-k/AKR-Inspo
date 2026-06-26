import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function MagneticSections({ markers = false, scrub = 1, pin = true, start = 'top top', end = '+=100%', duration = 1, ease = 'power3.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;
    const sections = el.querySelectorAll('.mag-section');
    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        gsap.to(section, {
          scale: 1,
          opacity: 1,
          duration,
          ease,
          scrollTrigger: {
            trigger: section, markers, scrub, pin: true,
            start: 'top center', end: 'bottom center',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="min-h-screen bg-gray-900 p-8">
      {['Section A', 'Section B', 'Section C'].map((label, i) => (
        <div key={i} className="mag-section h-screen flex items-center justify-center text-5xl font-bold text-white border-2 border-purple-500/30 rounded-3xl m-4 bg-gray-800/50 scale-95 opacity-50">
          {label}
        </div>
      ))}
    </div>
  );
}
