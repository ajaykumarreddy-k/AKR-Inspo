import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function SectionProgress({ markers = false, scrub = 1, pin = true, start = 'top top', end = 'bottom bottom', duration = 1, ease = 'none', disabled = false }: Props) {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const bar = barRef.current;
    if (!bar || disabled) return;
    const sections = document.querySelectorAll('.section-progress');
    if (!sections.length) return;
    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        gsap.to(bar, {
          scaleX: 1,
          duration,
          ease,
          scrollTrigger: {
            trigger: section, markers, scrub, pin: false,
            start: 'top center', end: 'bottom center',
            toggleActions: 'play reverse play reverse'
          }
        });
      });
    }, bar);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 w-2 h-48 bg-gray-700 rounded-full">
      <div ref={barRef} className="w-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-full origin-bottom scale-y-0" style={{ height: '100%' }} />
    </div>
  );
}
