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

interface GridItem {
  icon: string;
  label: string;
}

const gridItems: GridItem[] = [
  { icon: '🔥', label: 'Fire' },
  { icon: '💧', label: 'Water' },
  { icon: '🌪️', label: 'Wind' },
  { icon: '🌍', label: 'Earth' },
  { icon: '⚡', label: 'Thunder' },
  { icon: '❄️', label: 'Ice' },
  { icon: '🌙', label: 'Moon' },
  { icon: '☀️', label: 'Sun' },
  { icon: '⭐', label: 'Star' },
  { icon: '🌈', label: 'Rainbow' },
  { icon: '💎', label: 'Crystal' },
  { icon: '🌿', label: 'Nature' },
  { icon: '🌀', label: 'Vortex' },
  { icon: '🎵', label: 'Sound' },
  { icon: '💫', label: 'Cosmic' },
  { icon: '🛡️', label: 'Shield' },
];

export default function BatchAnimations({
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
  const gridRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.6,
        ease,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          end: 'top 30%',
          markers,
          toggleActions: 'play none none none',
        },
      });

      gsap.fromTo(
        itemRefs.current.filter(Boolean),
        {
          opacity: 0,
          y: 50,
          scale: 0.6,
          rotation: (i) => (i % 2 === 0 ? -15 : 15),
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.5,
          ease: 'back.out(1.7)',
          stagger: {
            each: 0.06,
            from: 'center',
            grid: 'auto',
            axis: 'y',
          },
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
            end: 'bottom 10%',
            markers: false,
            toggleActions: 'play none none none',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen py-32">
      <div className="text-center mb-16 max-w-xl">
        <h2 ref={titleRef} className="text-3xl font-bold text-white mb-2">Batch Animations</h2>
        <p className="text-gray-400">
          Multiple elements animated with stagger using <code className="text-cyan-400">.fromTo()</code>
        </p>
      </div>

      <div
        ref={gridRef}
        className="w-full max-w-4xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        {gridItems.map((item, i) => (
          <div
            key={item.label}
            ref={(el) => { itemRefs.current[i] = el; }}
            className="h-32 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-lg flex flex-col items-center justify-center gap-2 hover:border-cyan-500/50 transition-colors"
          >
            <span className="text-3xl">{item.icon}</span>
            <span className="text-white text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="w-full max-w-lg mx-auto mt-12 px-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h4 className="text-white font-semibold mb-2">Stagger Options</h4>
          <pre className="text-sm text-gray-300 font-mono">
{`stagger: {
  each: 0.06,     // 60ms between each
  from: 'center', // start from center
  grid: 'auto',   // auto grid detection
  axis: 'y',      // stagger on y axis
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
