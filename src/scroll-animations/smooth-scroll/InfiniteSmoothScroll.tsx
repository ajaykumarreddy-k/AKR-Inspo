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

const items = [
  { color: 'from-violet-500 to-purple-700', icon: '🌟' },
  { color: 'from-emerald-500 to-teal-600', icon: '⚡' },
  { color: 'from-rose-500 to-pink-600', icon: '💎' },
  { color: 'from-amber-500 to-orange-600', icon: '🔥' },
  { color: 'from-cyan-500 to-blue-600', icon: '🌊' },
];

export default function InfiniteSmoothScroll({
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
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!el || !track || !section || disabled) return;

    const doubled = [...items, ...items, ...items];

    const ctx = gsap.context(() => {
      gsap.to(track, {
        yPercent: -33.33,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: true,
          markers,
        },
      });

      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.from(card, {
          opacity: 0,
          scale: 0.8,
          y: 40,
          duration: 0.6,
          ease,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 35%',
            markers: false,
            toggleActions: 'play none none none',
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  const doubled = [...items, ...items, ...items];

  return (
    <div ref={containerRef} className="min-h-screen py-32">
      <div className="text-center mb-12 max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">Infinite Smooth Scroll</h2>
        <p className="text-gray-400">
          Content cycles continuously as you scroll through the pinned section
        </p>
      </div>

      <div ref={sectionRef} className="overflow-hidden h-[70vh]">
        <div
          ref={trackRef}
          className="flex flex-col gap-4 p-4"
        >
          {doubled.map((item, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              className={`h-32 rounded-xl bg-gradient-to-br ${item.color} shadow-lg flex items-center justify-center shrink-0`}
            >
              <span className="text-4xl">{item.icon}</span>
              <span className="text-white font-bold text-lg ml-4">Item {i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-gray-500 text-sm text-center mt-4 max-w-md mx-auto">
        The track scrolls vertically with scrub, looping through repeated content
      </p>
    </div>
  );
}
