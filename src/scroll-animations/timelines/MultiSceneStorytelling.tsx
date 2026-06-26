import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function MultiSceneStorytelling({ markers = false, scrub = 1, pin = true, start = 'top top', end = '+=400%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
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
      tl.fromTo('.scene-1', { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.8, duration: 0.8, ease })
        .fromTo('.scene-2', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration, ease }, '-=0.8')
        .to('.scene-2', { opacity: 0, x: -200, duration: 0.8, ease }, '+=0.2')
        .fromTo('.scene-3', { opacity: 0, x: 200 }, { opacity: 1, x: 0, duration, ease }, '-=0.8')
        .to('.scene-3', { opacity: 0, y: -100, duration: 0.8, ease }, '+=0.2')
        .fromTo('.scene-4', { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration, ease }, '-=0.8');
      tl.fromTo('.scene-counter span', { opacity: 0.3 }, { opacity: 1, duration: 0.2, stagger: 0.15 }, 0);
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 p-12">
      <div className="scene-counter absolute top-8 flex gap-2">
        {[1, 2, 3, 4].map(i => <span key={i} className="w-2 h-2 rounded-full bg-white/40" />)}
      </div>
      <div className="scene-1 absolute inset-0 flex items-center justify-center">
        <div className="text-center"><div className="text-7xl mb-4">🌄</div><h2 className="text-3xl font-bold text-white">Scene 1: Dawn</h2></div>
      </div>
      <div className="scene-2 absolute inset-0 flex items-center justify-center opacity-0">
        <div className="text-center"><div className="text-7xl mb-4">☀️</div><h2 className="text-3xl font-bold text-white">Scene 2: Noon</h2></div>
      </div>
      <div className="scene-3 absolute inset-0 flex items-center justify-center opacity-0">
        <div className="text-center"><div className="text-7xl mb-4">🌅</div><h2 className="text-3xl font-bold text-white">Scene 3: Dusk</h2></div>
      </div>
      <div className="scene-4 absolute inset-0 flex items-center justify-center opacity-0">
        <div className="text-center"><div className="text-7xl mb-4">🌙</div><h2 className="text-3xl font-bold text-white">Scene 4: Night</h2></div>
      </div>
      <div className="absolute bottom-8 text-white/30 text-xs tracking-wider">Scroll through scenes</div>
    </div>
  );
}
