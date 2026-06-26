import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function BackgroundParallax({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;
    const ctx = gsap.context(() => {
      const st = {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: scrub || 1.2,
        markers,
      };
      gsap.fromTo(bgRef.current, { y: '-25%' }, { y: '25%', ease: 'none', scrollTrigger: { ...st } });
      gsap.fromTo(textRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, scrollTrigger: { trigger: el, start: 'top 70%', end: 'center center', scrub: scrub || 1 } });
      gsap.fromTo(cardRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, scrollTrigger: { trigger: el, start: 'top 60%', end: 'center 30%', scrub: scrub || 1 } });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end]);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 will-change-transform">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.1)_0%,_transparent_50%)]" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-8">
        <div ref={textRef} className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">Background Parallax</h2>
          <p className="text-xl text-white/60 max-w-lg">The background moves slower than the foreground content, creating depth.</p>
        </div>
        <div ref={cardRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          {['Immersive', 'Dynamic', 'Engaging'].map((label) => (
            <div key={label} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center">
              <div className="w-12 h-12 rounded-full bg-white/10 mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-xl font-bold">{label[0]}</span>
              </div>
              <h3 className="text-lg font-semibold text-white">{label}</h3>
              <p className="text-white/50 text-sm mt-2">Content stays sharp while the background drifts softly.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
