import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function ScrollPositionTracker({ markers = false, scrub = 1, pin = true, start = 'top top', end = 'bottom bottom', duration = 1, ease = 'none', disabled = false }: Props) {
  const xRef = useRef<HTMLSpanElement>(null);
  const yRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const xEl = xRef.current;
    const yEl = yRef.current;
    if (!xEl || !yEl || disabled) return;
    const update = () => {
      xEl.textContent = window.scrollX + 'px';
      yEl.textContent = window.scrollY + 'px';
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [disabled]);
  return (
    <div className="fixed bottom-8 right-8 z-50 bg-gray-900/80 text-white px-4 py-2 rounded-lg font-mono text-sm space-y-1">
      <div>X: <span ref={xRef}>0px</span></div>
      <div>Y: <span ref={yRef}>0px</span></div>
      <div className="h-screen" />
    </div>
  );
}
