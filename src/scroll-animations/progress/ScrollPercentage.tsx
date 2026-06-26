import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function ScrollPercentage({ markers = false, scrub = 1, pin = true, start = 'top top', end = 'bottom bottom', duration = 1, ease = 'none', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    const txt = textRef.current;
    if (!el || !txt || disabled) return;
    const ctx = gsap.context(() => {
      const obj = { pct: 0 };
      gsap.to(obj, {
        pct: 100,
        duration,
        ease,
        onUpdate: () => { txt.textContent = Math.round(obj.pct) + '%'; },
        scrollTrigger: { trigger: document.body, markers, scrub, pin: false, start, end }
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="fixed bottom-8 left-8 z-50 bg-gray-900/80 text-white px-4 py-2 rounded-full text-lg font-mono">
      <span ref={textRef}>0%</span>
    </div>
  );
}
