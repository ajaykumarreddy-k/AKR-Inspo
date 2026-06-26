import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function RollingHeadlines({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;
    const ctx = gsap.context(() => {
      const headlines = el.querySelectorAll('.headline');
      gsap.fromTo(headlines,
        { rotateX: 90, y: 40, opacity: 0 },
        { rotateX: 0, y: 0, opacity: 1, duration, ease, stagger: 0.3, scrollTrigger: { trigger: el, markers, scrub, pin, start, end } }
      );
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white p-8 overflow-hidden perspective-1000">
      <div className="headline text-3xl md:text-5xl font-bold mb-8">Breaking News: Scroll to Reveal</div>
      <div className="headline text-3xl md:text-5xl font-bold mb-8">Headlines Roll Into View</div>
      <div className="headline text-3xl md:text-5xl font-bold mb-8">GSAP Powers the Animation</div>
      <div className="h-screen" />
    </div>
  );
}
