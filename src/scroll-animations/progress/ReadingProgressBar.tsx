import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function ReadingProgressBar({ markers = false, scrub = 1, pin = true, start = 'top top', end = 'bottom bottom', duration = 1, ease = 'none', disabled = false }: Props) {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const bar = barRef.current;
    if (!bar || disabled) return;
    const ctx = gsap.context(() => {
      gsap.to(bar, {
        scaleX: 1,
        duration,
        ease,
        scrollTrigger: { trigger: document.body, markers, scrub, pin: false, start, end }
      });
    }, bar);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div ref={barRef} className="h-full bg-gradient-to-r from-purple-500 to-pink-500 origin-left scale-x-0" />
    </div>
  );
}
