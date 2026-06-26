import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

const cards = [
  { id: 1, title: 'Depth', gradient: 'from-rose-500 to-pink-600' },
  { id: 2, title: 'Perspective', gradient: 'from-blue-500 to-cyan-600' },
  { id: 3, title: 'Motion', gradient: 'from-amber-500 to-orange-600' },
  { id: 4, title: 'Dimension', gradient: 'from-emerald-500 to-teal-600' },
];

export default function PerspectiveParallax({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const direction = i % 2 === 0 ? 1 : -1;
        gsap.fromTo(card, { rotationY: -30 * direction, z: -200, opacity: 0 }, {
          rotationY: 0, z: 0, opacity: 1, ease: 'none',
          scrollTrigger: {
            trigger: card, start: 'top 90%', end: 'top 40%', scrub: scrub || 1.2, markers,
          },
        });
        gsap.to(card, {
          y: -50 * direction, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: scrub || 1 },
        });
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-950 flex flex-col items-center justify-center py-32 px-8">
      <div className="text-center mb-20">
        <h2 className="text-4xl font-bold text-white mb-2">3D Perspective Parallax</h2>
        <p className="text-gray-400">Cards rotate and shift in 3D space as you scroll</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full perspective-[1000px]">
        {cards.map((c, i) => (
          <div
            key={c.id}
            ref={(el) => { cardRefs.current[i] = el; }}
            className={`h-64 rounded-3xl bg-gradient-to-br ${c.gradient} p-8 flex items-center justify-center shadow-2xl will-change-transform`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <h3 className="text-4xl font-black text-white">{c.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
