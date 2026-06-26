import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  markers?: boolean;
  scrub?: number | boolean;
  pin?: boolean;
  start?: string;
  end?: string;
  duration?: number;
  ease?: string;
  disabled?: boolean;
}

const layers = [
  { label: 'Layer 1', color: 'from-violet-600 to-purple-800', icon: '★' },
  { label: 'Layer 2', color: 'from-blue-500 to-cyan-700', icon: '◆' },
  { label: 'Layer 3', color: 'from-emerald-400 to-teal-600', icon: '●' },
  { label: 'Layer 4', color: 'from-amber-400 to-orange-600', icon: '▲' },
];

export default function LayeredPin({
  markers = false,
  scrub = false,
  pin = true,
  start = 'top top',
  end = '+=200%',
  duration = 1,
  ease = 'power2.out',
  disabled = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top top',
        end: `+=${layers.length * 100}%`,
        pin: true,
        markers,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: `+=${layers.length * 100}%`,
          scrub: 1,
          markers: false,
        },
      });

      layersRef.current.forEach((layer, i) => {
        if (i === 0) {
          gsap.set(layer, { opacity: 1, scale: 1 });
          return;
        }
        tl.fromTo(
          layer,
          { opacity: 0, scale: 0.5, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          i * 0.3
        );
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="relative bg-gray-950">
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-2">Layered Pin</h2>
          <p className="text-gray-400">Elements reveal layer by layer on scroll</p>
        </div>
      </div>

      <div
        ref={pinRef}
        className="relative h-screen flex items-center justify-center"
      >
        <div className="relative w-72 h-72 md:w-96 md:h-96">
          {layers.map((layer, i) => (
            <div
              key={i}
              ref={(el) => { layersRef.current[i] = el!; }}
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${layer.color} shadow-2xl flex items-center justify-center flex-col gap-3 ${
                i === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
              style={{ transform: `translate(${i * 8}px, ${i * 8}px)` }}
            >
              <span className="text-6xl">{layer.icon}</span>
              <span className="text-white/80 text-lg font-semibold">{layer.label}</span>
              <span className="text-white/40 text-sm">Layer {i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-screen" />
    </div>
  );
}
