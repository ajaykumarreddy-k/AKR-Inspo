import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function TextParallax({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const line3Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;
    const ctx = gsap.context(() => {
      const st = {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: scrub || 1,
        markers,
      };
      gsap.fromTo(line1Ref.current, { y: 200, opacity: 0 }, { y: -200, opacity: 1, ease: 'none', scrollTrigger: { ...st } });
      gsap.fromTo(line2Ref.current, { y: 100, opacity: 0 }, { y: -100, opacity: 1, ease: 'none', scrollTrigger: { ...st } });
      gsap.fromTo(line3Ref.current, { y: 50, opacity: 0 }, { y: -50, opacity: 1, ease: 'none', scrollTrigger: { ...st } });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end]);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-gray-950 flex flex-col items-center justify-center">
      <div className="text-center px-8">
        <h2 className="text-3xl font-bold text-white mb-12">Text Parallax</h2>
        <div className="space-y-6">
          <h3 ref={line1Ref} className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 will-change-transform">
            SCROLL WITH US
          </h3>
          <h3 ref={line2Ref} className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-600 will-change-transform">
            FEEL THE DEPTH
          </h3>
          <h3 ref={line3Ref} className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-600 will-change-transform">
            TEXT IN MOTION
          </h3>
        </div>
        <p className="text-gray-500 mt-12 text-sm">Each line moves at a different speed as you scroll.</p>
      </div>
    </div>
  );
}
