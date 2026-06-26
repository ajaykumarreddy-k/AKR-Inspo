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

const frames = [
  { bg: 'from-rose-500 to-pink-700', label: 'Frame 1', icon: '🌅' },
  { bg: 'from-amber-400 to-orange-600', label: 'Frame 2', icon: '🌄' },
  { bg: 'from-yellow-400 to-lime-500', label: 'Frame 3', icon: '🌳' },
  { bg: 'from-emerald-400 to-teal-600', label: 'Frame 4', icon: '🌊' },
  { bg: 'from-cyan-400 to-blue-600', label: 'Frame 5', icon: '🌌' },
  { bg: 'from-violet-500 to-purple-700', label: 'Frame 6', icon: '🌠' },
];

export default function ImageSequenceScrub({
  markers = false,
  scrub = 1,
  pin = false,
  start = 'top 80%',
  end = 'bottom 20%',
  duration = 1,
  ease = 'power2.out',
  disabled = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLHeadingElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          end,
          scrub,
          markers,
        },
      });

      frames.forEach((frame, i) => {
        if (i === 0) return;
        tl.call(
          () => {
            if (cardRef.current) {
              cardRef.current.className = `w-full h-full rounded-2xl bg-gradient-to-br ${frame.bg} flex items-center justify-center flex-col gap-4 transition-all duration-300`;
            }
            if (labelRef.current) labelRef.current.textContent = frame.label;
            if (iconRef.current) iconRef.current.textContent = frame.icon;
          },
          [],
          i / frames.length
        );
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="flex flex-col items-center min-h-screen py-32 px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-2">Image Sequence Scrub</h2>
        <p className="text-gray-400">Scrolling through a gallery of frames like a film strip</p>
      </div>

      <div className="w-full max-w-md mx-auto">
        <div className="aspect-[4/3] rounded-2xl shadow-2xl overflow-hidden">
          <div
            ref={cardRef}
            className={`w-full h-full rounded-2xl bg-gradient-to-br ${frames[0].bg} flex items-center justify-center flex-col gap-4`}
          >
            <div ref={iconRef} className="text-7xl">{frames[0].icon}</div>
            <h3 ref={labelRef} className="text-2xl font-bold text-white">{frames[0].label}</h3>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {frames.map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-white/20"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
