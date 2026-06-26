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
  { label: 'Neon Genesis', color: 'from-cyan-400 to-blue-500' },
  { label: 'Ghost Signal', color: 'from-fuchsia-400 to-purple-500' },
  { label: 'Solar Drift', color: 'from-amber-400 to-orange-500' },
  { label: 'Quantum Leap', color: 'from-emerald-400 to-teal-500' },
  { label: 'Void Walker', color: 'from-violet-400 to-indigo-500' },
  { label: 'Star Forge', color: 'from-rose-400 to-pink-500' },
  { label: 'Phase Shift', color: 'from-sky-400 to-cyan-500' },
  { label: 'Gravity Well', color: 'from-lime-400 to-green-500' },
];

export default function ContainerAnimation({
  markers = false,
  scrub = false,
  pin = false,
  start = 'top 80%',
  end = 'bottom 20%',
  duration = 1,
  ease = 'power2.out',
  disabled = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    const scrollContainer = scrollContainerRef.current;
    const inner = innerRef.current;
    if (!el || !scrollContainer || !inner || disabled) return;

    const ctx = gsap.context(() => {
      const containerST = ScrollTrigger.create({
        trigger: scrollContainer,
        start: 'top 10%',
        end: () => `+=${inner.offsetWidth - scrollContainer.offsetWidth}`,
        pin: true,
        markers,
        id: 'container-scroll',
        onRefresh: (self) => {
          if (self) {
            self.vars.end = `+=${inner.offsetWidth - scrollContainer.offsetWidth}`;
          }
        },
      });

      gsap.to(inner, {
        x: () => -(inner.offsetWidth - scrollContainer.offsetWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: scrollContainer,
          start: 'top 10%',
          end: () => `+=${inner.offsetWidth - scrollContainer.offsetWidth}`,
          pin: true,
          markers: false,
          scrub: 1,
          id: 'container-scrub',
        },
      });

      itemRefs.current.forEach((item, i) => {
        if (!item) return;

        gsap.fromTo(
          item,
          { opacity: 0, y: 40, scale: 0.8, rotation: -5 },
          {
            opacity: 1, y: 0, scale: 1, rotation: 0,
            duration: 0.6,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: item,
              containerAnimation: undefined,
              start: 'left 90%',
              end: 'left 10%',
              horizontal: true,
              markers: false,
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen py-32">
      <div className="text-center mb-16 max-w-xl">
        <h2 className="text-3xl font-bold text-white mb-2">Container Animation</h2>
        <p className="text-gray-400">
          Horizontal scroll inside a scrollable container using ScrollTrigger pinning
        </p>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4">
        <div
          ref={scrollContainerRef}
          className="relative overflow-hidden rounded-2xl border border-gray-700 bg-gray-900"
          style={{ height: '420px' }}
        >
          <div
            ref={innerRef}
            className="flex gap-6 p-6"
            style={{ width: `${items.length * 280 + (items.length - 1) * 24 + 48}px` }}
          >
            {items.map((item, i) => (
              <div
                key={item.label}
                ref={(el) => { itemRefs.current[i] = el; }}
                className={`w-64 h-80 shrink-0 rounded-xl bg-gradient-to-br ${item.color} shadow-lg flex items-center justify-center p-6`}
              >
                <div className="text-center">
                  <span className="text-5xl block mb-4">
                    {['🌀', '📡', '☀️', '⚛️', '🕳️', '⭐', '🌊', '🪐'][i]}
                  </span>
                  <h3 className="text-white font-bold text-lg">{item.label}</h3>
                  <p className="text-white/60 text-xs mt-2">Card {i + 1} of {items.length}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-gray-500 text-sm text-center mt-4">
          ← Scroll horizontally inside the container above →
        </p>
      </div>
    </div>
  );
}
