import { useRef, useEffect, useCallback } from 'react';
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

const LAZY_COUNT = 12;

export default function LazyInitialization({
  markers = false,
  scrub = false,
  pin = true,
  start = 'top 80%',
  end = 'bottom 20%',
  duration = 1,
  ease = 'power2.out',
  disabled = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<HTMLParagraphElement>(null);

  const initScrollTrigger = useCallback((el: HTMLDivElement, index: number) => {
    if (initialized.current.has(index)) return;
    initialized.current.add(index);

    gsap.fromTo(el, { opacity: 0, y: 60, scale: 0.9 }, {
      opacity: 1, y: 0, scale: 1, duration: 0.7, ease,
      scrollTrigger: {
        trigger: el, start, end, markers,
        toggleActions: 'play none none none',
      },
    });

    if (statsRef.current) {
      statsRef.current.textContent = `Lazy ScrollTriggers initialized: ${initialized.current.size}`;
    }
  }, [markers, start, end, duration, ease]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-lazy-index'));
            initScrollTrigger(entry.target as HTMLDivElement, index);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '200px' }
    );

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      observer.disconnect();
      initialized.current.clear();
    };
  }, [disabled, initScrollTrigger]);

  const colors = [
    'from-violet-500 to-purple-700',
    'from-emerald-500 to-teal-600',
    'from-rose-500 to-pink-600',
    'from-amber-500 to-orange-600',
  ];

  return (
    <div ref={containerRef} className="min-h-screen py-32">
      <div className="text-center mb-8 max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">Lazy Initialization</h2>
        <p className="text-gray-400">
          ScrollTriggers are created only when elements are near the viewport (200px margin)
        </p>
      </div>

      <p
        ref={statsRef}
        className="text-center text-sm text-emerald-400 font-mono mb-6"
      >
        Lazy ScrollTriggers initialized: 0
      </p>

      <div className="max-w-3xl mx-auto px-4 space-y-6">
        {Array.from({ length: LAZY_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => { itemRefs.current[i] = el; }}
            data-lazy-index={i}
            className={`h-48 rounded-2xl bg-gradient-to-br ${colors[i % colors.length]} shadow-2xl flex items-center justify-center opacity-0`}
          >
            <div className="text-center">
              <span className="text-4xl block mb-2">{['🌟', '⚡', '💎', '🔥'][i % 4]}</span>
              <h3 className="text-white text-2xl font-bold">Lazy Card {i + 1}</h3>
              <p className="text-white/60 mt-1">Trigger created on demand</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-gray-500 text-sm text-center mt-6 max-w-lg mx-auto">
        Using IntersectionObserver with rootMargin 200px to create triggers early but not all at once
      </p>
    </div>
  );
}
