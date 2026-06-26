import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function LightboxEntrance({ markers = false, scrub = 1, pin = true, start = 'top top', end = '+=250%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;
    const ctx = gsap.context(() => {
      const backdrop = document.createElement('div');
      backdrop.className = 'lightbox-backdrop';
      backdrop.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.8);backdrop-filter:blur(8px);z-index:40;opacity:0;pointer-events:none;';
      document.body.appendChild(backdrop);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el, pin, start, end, scrub, markers,
        }
      });
      tl.to('.lb-backdrop-overlay', { opacity: 0.8, duration: 0.8, ease })
        .to('.lb-grid-item', { scale: 1, opacity: 1, borderRadius: '0.75rem', duration: 0.5, stagger: 0.1, ease }, '-=0.5')
        .to('.lb-grid-item', { scale: 1.1, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', duration: 0.3, stagger: 0.05, ease }, '+=0.3')
        .to('.lb-grid-item', { scale: 1, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)', duration: 0.3, stagger: 0.05, ease });
      tl.fromTo('.lb-title', { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration, ease }, '-=1');

      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: 'bottom top',
        onToggle: self => {
          gsap.to(backdrop, { opacity: self.isActive ? 1 : 0, duration: 0.3, ease });
        }
      });

      return () => { ctx.revert(); backdrop.remove(); };
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center gap-8 bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 p-12 z-30">
      <h2 className="lb-title text-3xl font-bold text-white opacity-0">Gallery</h2>
      <div className="lb-backdrop-overlay absolute inset-0 bg-black opacity-0 pointer-events-none" />
      <div className="relative z-10 grid grid-cols-3 gap-4">
        {[
          'from-pink-500 to-rose-600', 'from-violet-500 to-purple-600',
          'from-blue-500 to-cyan-600', 'from-emerald-500 to-teal-600',
          'from-amber-500 to-orange-600', 'from-red-500 to-rose-600'
        ].map((grad, i) => (
          <div key={i} className="lb-grid-item w-28 h-28 bg-gradient-to-br ${grad} rounded-3xl shadow-lg opacity-0 scale-75 flex items-center justify-center" style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}>
            <span className="text-white/60 text-sm">{i + 1}</span>
          </div>
        ))}
      </div>
      <div className="absolute bottom-8 text-white/30 text-xs tracking-wider z-10">Lightbox entrance animation</div>
    </div>
  );
}
