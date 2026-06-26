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

export default function ScrollSmoother({
  markers = false,
  scrub = false,
  pin = true,
  start = 'top bottom',
  end = 'bottom top',
  duration = 1,
  ease = 'power2.out',
  disabled = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      sectionsRef.current.forEach((section) => {
        if (!section) return;
        gsap.fromTo(section, { opacity: 0, y: 60 }, {
          opacity: 1, y: 0, duration: 0.8, ease,
          scrollTrigger: { trigger: section, start: 'top 85%', end: 'top 35%', markers, toggleActions: 'play none none none' },
        });
      });

      parallaxRefs.current.forEach((parallax) => {
        if (!parallax) return;
        gsap.to(parallax, {
          y: () => parallax.offsetHeight * 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: parallax,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            markers: false,
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  const colors = [
    'from-rose-500 to-pink-600',
    'from-violet-500 to-purple-700',
    'from-emerald-500 to-teal-600',
    'from-amber-500 to-orange-600',
    'from-cyan-500 to-blue-600',
  ];

  return (
    <div ref={containerRef} className="min-h-screen py-32">
      <div className="text-center mb-16 max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">ScrollSmoother Simulation</h2>
        <p className="text-gray-400">
          Parallax layers move at different speeds creating a smooth scrolling illusion
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 space-y-12">
        {colors.map((color, i) => (
          <div
            key={i}
            ref={(el) => { sectionsRef.current[i] = el; }}
            className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div
              ref={(el) => { parallaxRefs.current[i] = el; }}
              className={`absolute inset-0 bg-gradient-to-br ${color} opacity-80`}
            />
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="text-center">
                <span className="text-5xl block mb-4">
                  {['🌊', '⛰️', '🌲', '🔥', '💎'][i]}
                </span>
                <h3 className="text-white text-3xl font-bold">Section {i + 1}</h3>
                <p className="text-white/60 mt-2">Parallax layer moves slower</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
