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
  { color: 'from-violet-500 to-purple-700', label: 'Section A', icon: '🌟' },
  { color: 'from-emerald-500 to-teal-600', label: 'Section B', icon: '🚀' },
  { color: 'from-rose-500 to-pink-600', label: 'Section C', icon: '💎' },
  { color: 'from-amber-500 to-orange-600', label: 'Section D', icon: '🔥' },
];

export default function PinningElements({
  markers = false,
  scrub = false,
  pin = true,
  start = 'top 10%',
  end = 'bottom 90%',
  duration = 1,
  ease = 'power2.out',
  disabled = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top 10%',
        end: '+=2000',
        pin: true,
        markers,
        id: 'pin-main',
      });

      contentRefs.current.forEach((content, i) => {
        if (!content) return;
        gsap.fromTo(
          content,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease,
            scrollTrigger: {
              trigger: content,
              start: 'top 75%',
              end: 'top 25%',
              markers: false,
              toggleActions: 'play none none none',
            },
          }
        );
      });

      stepRefs.current.forEach((step, i) => {
        if (!step) return;
        gsap.fromTo(
          step,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: i * 0.15,
            ease,
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
              end: 'top 20%',
              markers: false,
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="min-h-screen py-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white mb-2">Pinning Elements</h2>
        <p className="text-gray-400">
          The panel below stays pinned while content scrolls behind it
        </p>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4">
        <div className="relative flex gap-8">
          <div ref={pinRef} className="w-80 shrink-0">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 shadow-xl">
              <h3 className="text-white text-xl font-bold mb-4">Pinned Panel</h3>
              <p className="text-gray-400 text-sm mb-6">
                This panel stays fixed in place while the content on the right scrolls past it.
                Once all content has passed, it releases and scrolls away.
              </p>
              <div className="space-y-3">
                {items.map((item, i) => (
                  <div
                    key={item.label}
                    ref={(el) => { stepRefs.current[i] = el; }}
                    className={`flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r ${item.color} bg-opacity-20`}
                    style={{ background: 'transparent' }}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-white font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-8">
            {items.map((item, i) => (
              <div
                key={item.label}
                ref={(el) => { contentRefs.current[i] = el; }}
                className={`h-96 rounded-2xl bg-gradient-to-br ${item.color} shadow-2xl flex items-center justify-center`}
              >
                <div className="text-center">
                  <span className="text-6xl block mb-4">{item.icon}</span>
                  <h3 className="text-white text-3xl font-bold">{item.label}</h3>
                  <p className="text-white/60 mt-2">Scrolling content section {i + 1}</p>
                </div>
              </div>
            ))}
            <div className="h-32" />
          </div>
        </div>
      </div>
    </div>
  );
}
