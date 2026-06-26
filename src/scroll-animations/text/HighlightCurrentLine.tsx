import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function HighlightCurrentLine({ markers = false, scrub = 1, pin = true, start = 'top top', end = '+=300%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;
    const ctx = gsap.context(() => {
      const lines = el.querySelectorAll('.hl-line');
      lines.forEach((line, i) => {
        gsap.to(line, {
          backgroundColor: 'rgba(250,204,21,0.3)',
          scale: 1.02,
          duration,
          ease,
          scrollTrigger: {
            trigger: line,
            markers, scrub, pin, start: 'top 70%', end: 'bottom 30%', toggleActions: 'play reverse play reverse'
          }
        });
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  const lines = ['Line one: This is the first highlighted line.', 'Line two: Scrolling reveals more text.', 'Line three: Each line lights up in turn.', 'Line four: Keep scrolling to see them all.', 'Line five: The final line of the stanza.'];
  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-xl text-xl md:text-2xl leading-relaxed space-y-6">
        {lines.map((l, i) => (
          <p key={i} className="hl-line px-4 py-2 rounded transition-colors">{l}</p>
        ))}
      </div>
      <div className="h-screen" />
    </div>
  );
}
