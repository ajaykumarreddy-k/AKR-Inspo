import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function VariableFontWeight({ markers = false, scrub = 1, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    const txt = textRef.current;
    if (!el || !txt || disabled) return;
    const ctx = gsap.context(() => {
      gsap.to(txt, {
        fontVariationSettings: "'wght' 900",
        duration: 2,
        ease,
        scrollTrigger: { trigger: el, markers, scrub, pin, start, end }
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <h2
        ref={textRef}
        className="text-5xl md:text-7xl font-light transition-all"
        style={{ fontVariationSettings: "'wght' 300" }}
      >
        Variable Weight
      </h2>
      <p className="text-gray-400 mt-4">Scroll to change font weight</p>
      <div className="h-screen" />
    </div>
  );
}
