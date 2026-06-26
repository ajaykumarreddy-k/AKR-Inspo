import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function InteractiveStorySections({ markers = false, scrub = 1, pin = true, start = 'top top', end = '+=350%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
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
      tl.fromTo('.chapter-1', { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration, ease })
        .to('.chapter-1-text', { opacity: 1, y: 0, duration: 0.8, ease }, '-=0.5')
        .to('.chapter-1', { opacity: 0, y: -100, duration: 0.5, ease }, '+=0.2')
        .fromTo('.chapter-2', { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration, ease })
        .to('.chapter-2-text', { opacity: 1, y: 0, duration: 0.8, ease }, '-=0.5')
        .to('.chapter-2', { opacity: 0, y: -100, duration: 0.5, ease }, '+=0.2')
        .fromTo('.chapter-3', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration, ease })
        .to('.chapter-3-text', { opacity: 1, y: 0, duration: 0.8, ease }, '-=0.5');
      tl.fromTo('.chapter-indicator span', { opacity: 0.3 }, { opacity: 1, duration: 0.3, stagger: 0.2, ease }, 0);
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-stone-900 via-zinc-800 to-stone-900 p-12">
      <div className="chapter-indicator absolute top-8 flex gap-3">
        <span className="w-3 h-3 rounded-full bg-amber-400" />
        <span className="w-3 h-3 rounded-full bg-amber-400" />
        <span className="w-3 h-3 rounded-full bg-amber-400" />
      </div>
      <div className="chapter-1 absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white mb-4">Chapter I</h2>
          <p className="chapter-1-text text-white/50 text-lg opacity-0 translate-y-4">The Beginning</p>
        </div>
      </div>
      <div className="chapter-2 absolute inset-0 flex items-center justify-center opacity-0">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white mb-4">Chapter II</h2>
          <p className="chapter-2-text text-white/50 text-lg opacity-0 translate-y-4">The Discovery</p>
        </div>
      </div>
      <div className="chapter-3 absolute inset-0 flex items-center justify-center opacity-0">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white mb-4">Chapter III</h2>
          <p className="chapter-3-text text-white/50 text-lg opacity-0 translate-y-4">The Resolution</p>
        </div>
      </div>
      <div className="absolute bottom-8 text-white/30 text-xs tracking-wider">Scroll to reveal each chapter</div>
    </div>
  );
}
