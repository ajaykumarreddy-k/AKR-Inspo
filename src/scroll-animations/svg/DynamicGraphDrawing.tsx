import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

const data = [
  { label: 'Jan', value: 30 },
  { label: 'Feb', value: 55 },
  { label: 'Mar', value: 40 },
  { label: 'Apr', value: 80 },
  { label: 'May', value: 65 },
  { label: 'Jun', value: 95 },
  { label: 'Jul', value: 70 },
  { label: 'Aug', value: 100 },
];

export default function DynamicGraphDrawing({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const line = lineRef.current;
    if (!el || disabled) return;
    const ctx = gsap.context(() => {
      barsRef.current.forEach((bar) => {
        if (!bar) return;
        gsap.from(bar, {
          scaleY: 0, transformOrigin: 'bottom', ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 20%', scrub: scrub || 1, markers, pin },
        });
      });
      if (line) {
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(line, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 20%', scrub: scrub || 1 } });
      }
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end]);

  const maxVal = Math.max(...data.map((d) => d.value));

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-950 flex flex-col items-center justify-center py-32 px-8">
      <h2 className="text-3xl font-bold text-white mb-2">Dynamic Graph Drawing</h2>
      <p className="text-gray-400 mb-12">Bar graph that draws its data on scroll</p>
      <div className="w-full max-w-2xl">
        <div className="flex items-end gap-3 h-64 mb-4">
          {data.map((d, i) => {
            const h = (d.value / maxVal) * 100;
            return (
              <div key={d.label} className="flex-1 flex flex-col items-center gap-2">
                <div
                  ref={(el) => { barsRef.current[i] = el; }}
                  className="w-full rounded-t-md bg-gradient-to-t from-cyan-500 to-blue-600 will-change-transform"
                  style={{ height: `${h}%`, minHeight: '4px' }}
                />
              </div>
            );
          })}
        </div>
        <svg viewBox="0 0 800 200" className="w-full" xmlns="http://www.w3.org/2000/svg">
          <path
            ref={lineRef}
            d={data.map((d, i) => {
              const x = (i / (data.length - 1)) * 750 + 25;
              const y = 180 - (d.value / maxVal) * 160;
              return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
            }).join(' ')}
            fill="none"
            stroke="url(#graphGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * 750 + 25;
            const y = 180 - (d.value / maxVal) * 160;
            return <circle key={i} cx={x} cy={y} r="5" fill="#8b5cf6" />;
          })}
          <defs>
            <linearGradient id="graphGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="flex justify-between mt-2 px-1">
          {data.map((d) => (
            <span key={d.label} className="text-gray-500 text-xs">{d.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
