import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function SplitTextScrollReveal({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;
    const ctx = gsap.context(() => {
      const words = el.querySelectorAll('.word');
      gsap.from(words, {
        y: 60,
        opacity: 0,
        rotateX: 90,
        duration,
        ease,
        stagger: 0.15,
        scrollTrigger: { trigger: el, markers, scrub, pin, start, end }
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <h2 className="text-4xl md:text-6xl font-bold leading-tight">
        {'Animation Split Text'.split(' ').map((w, i) => (
          <span key={i} className="word inline-block mr-[0.3em]">{w}</span>
        ))}
      </h2>
      <div className="h-screen" />
    </div>
  );
}
