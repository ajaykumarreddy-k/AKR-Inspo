import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

const waypoints = [
  { x: 6, y: 80 },
  { x: 16, y: 24 },
  { x: 30, y: 16 },
  { x: 40, y: 50 },
  { x: 50, y: 84 },
  { x: 64, y: 88 },
  { x: 74, y: 50 },
];

export default function FollowMotionPath({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const dot = dotRef.current;
    if (!el || !dot || disabled) return;

    const ctx = gsap.context(() => {
      gsap.set(dot, { left: '6%', top: '80%' });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: scrub || 1,
          markers,
          pin,
        },
      });

      waypoints.forEach((wp) => {
        tl.to(dot, {
          left: `${wp.x}%`,
          top: `${wp.y}%`,
          ease: 'power1.inOut',
        });
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-950 flex flex-col items-center justify-center py-32 px-8">
      <h2 className="text-3xl font-bold text-white mb-2">Follow Motion Path</h2>
      <p className="text-gray-400 mb-12">A dot follows a predefined path as you scroll</p>
      <div className="relative w-full max-w-lg aspect-[5/4]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 6 80 C 12 20, 22 20, 40 50 C 55 75, 62 88, 74 50"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          {waypoints.map((wp, i) => (
            <circle key={i} cx={wp.x} cy={wp.y} r="1.5" fill="rgba(255,255,255,0.3)" />
          ))}
        </svg>
        <div
          ref={dotRef}
          className="absolute w-5 h-5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/50 will-change-transform"
          style={{ top: '80%', left: '6%' }}
        />
      </div>
    </div>
  );
}
