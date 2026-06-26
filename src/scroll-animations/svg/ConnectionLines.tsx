import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

const nodes = [
  { id: 1, cx: 50, cy: 50, label: 'A' },
  { id: 2, cx: 350, cy: 40, label: 'B' },
  { id: 3, cx: 200, cy: 160, label: 'C' },
  { id: 4, cx: 60, cy: 180, label: 'D' },
  { id: 5, cx: 340, cy: 190, label: 'E' },
];

const connections = [
  [0, 1], [0, 2], [1, 2], [1, 4], [2, 3], [2, 4], [3, 0],
];

export default function ConnectionLines({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;
    const ctx = gsap.context(() => {
      lineRefs.current.forEach((line) => {
        if (!line) return;
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(line, {
          strokeDashoffset: 0, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 20%', scrub: scrub || 1, markers, pin },
        });
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-950 flex flex-col items-center justify-center py-32 px-8">
      <h2 className="text-3xl font-bold text-white mb-2">Connection Lines</h2>
      <p className="text-gray-400 mb-12">Lines connecting nodes that draw on scroll</p>
      <svg viewBox="0 0 400 230" className="w-full max-w-lg" xmlns="http://www.w3.org/2000/svg">
        {connections.map(([i, j], idx) => {
          const from = nodes[i];
          const to = nodes[j];
          return (
            <line
              key={idx}
              ref={(el) => { lineRefs.current[idx] = el; }}
              x1={from.cx}
              y1={from.cy}
              x2={to.cx}
              y2={to.cy}
              stroke="url(#connGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          );
        })}
        {nodes.map((n) => (
          <g key={n.id}>
            <circle cx={n.cx} cy={n.cy} r="10" fill="#1f2937" stroke="#8b5cf6" strokeWidth="2" />
            <text x={n.cx} y={n.cy + 4} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{n.label}</text>
          </g>
        ))}
        <defs>
          <linearGradient id="connGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
