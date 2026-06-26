import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function TimelineProgress({ markers = false, scrub = 1, pin = true, start = 'top top', end = 'bottom bottom', duration = 1, ease = 'none', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    const fill = fillRef.current;
    if (!el || !fill || disabled) return;
    const ctx = gsap.context(() => {
      gsap.to(fill, {
        scaleY: 1,
        duration,
        ease,
        scrollTrigger: { trigger: document.body, markers, scrub, pin: false, start, end }
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="fixed left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-6">
      <div className="relative w-1 h-64 bg-gray-700 rounded-full">
        <div ref={fillRef} className="absolute bottom-0 w-full bg-gradient-to-t from-purple-500 to-cyan-400 rounded-full origin-bottom scale-y-0" style={{ height: '100%' }} />
      </div>
      {['Start', 'Milestone 1', 'Milestone 2', 'Finish'].map((label, i) => (
        <span key={i} className="text-xs text-gray-400 ml-4">{label}</span>
      ))}
      <div className="h-screen" />
    </div>
  );
}
