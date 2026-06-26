import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function CrossfadeImages({ markers = false, scrub = 1, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el, pin, start, end, scrub, markers,
        }
      });
      tl.to('.image-a', { opacity: 0, duration: 1.2, ease })
        .to('.image-b', { opacity: 1, duration: 1.2, ease }, '-=1.2')
        .to('.fade-label-a', { opacity: 0, duration: 0.6, ease }, 0)
        .to('.fade-label-b', { opacity: 1, duration: 0.6, ease }, '-=0.6');
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-neutral-800 to-gray-900 p-12">
      <div className="relative w-80 h-80 rounded-3xl overflow-hidden shadow-2xl">
        <div className="image-a absolute inset-0 bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-2">🌅</div>
            <span className="fade-label-a text-white/80 text-lg font-bold">Sunrise</span>
          </div>
        </div>
        <div className="image-b absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center opacity-0">
          <div className="text-center">
            <div className="text-6xl mb-2">🌙</div>
            <span className="fade-label-b text-white/80 text-lg font-bold opacity-0">Nightfall</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 text-white/30 text-xs tracking-wider">Crossfade between images</div>
    </div>
  );
}
