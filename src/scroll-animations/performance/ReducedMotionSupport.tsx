import { useRef, useEffect, useState } from 'react';
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

export default function ReducedMotionSupport({
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
  const [prefersReduced, setPrefersReduced] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const valuesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        cardsRef.current.forEach((card) => {
          if (!card) return;
          gsap.set(card, { opacity: 1, y: 0, scale: 1, clearProps: 'opacity,transform' });
        });
        if (bannerRef.current) {
          gsap.set(bannerRef.current, { opacity: 1, y: 0 });
        }
        return;
      }

      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.from(card, {
          opacity: 0,
          y: 60,
          scale: 0.9,
          duration: 0.7,
          ease,
          scrollTrigger: {
            trigger: card,
            start,
            end,
            markers,
            toggleActions: 'play none none none',
          },
        });
      });

      if (bannerRef.current) {
        gsap.from(bannerRef.current, {
          opacity: 0, y: -20, duration: 0.5, ease,
          scrollTrigger: { trigger: bannerRef.current, start: 'top 90%', end: 'top 50%', markers: false },
        });
      }

      valuesRef.current.forEach((val, i) => {
        if (!val) return;
        gsap.from(val, {
          innerText: 0,
          duration: 2,
          snap: { innerText: 1 },
          ease: 'power1.out',
          scrollTrigger: {
            trigger: val,
            start: 'top 85%',
            end: 'top 35%',
            markers: false,
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease, prefersReduced]);

  const stats = [
    { label: 'Users', value: 12483 },
    { label: 'Downloads', value: 8921 },
    { label: 'Stars', value: 4532 },
  ];

  return (
    <div ref={containerRef} className="min-h-screen py-32">
      <div className="text-center mb-8 max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">Reduced Motion Support</h2>
        <p className="text-gray-400">
          Respects prefers-reduced-motion media query
        </p>
      </div>

      <div
        ref={bannerRef}
        className={`max-w-lg mx-auto mb-8 px-4 py-3 rounded-xl text-center text-sm font-mono border ${
          prefersReduced
            ? 'bg-amber-900/30 border-amber-700 text-amber-400'
            : 'bg-emerald-900/30 border-emerald-700 text-emerald-400'
        }`}
      >
        {prefersReduced
          ? 'Reduced motion ON — animations disabled'
          : 'Full motion — animations active'
        }
      </div>

      <div className="max-w-3xl mx-auto px-4 space-y-6 mb-12">
        <div
          ref={(el) => { cardsRef.current[0] = el; }}
          className="h-48 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 shadow-2xl flex items-center justify-center"
        >
          <p className="text-white text-xl font-medium">
            {prefersReduced ? 'Static content — no animation' : 'Animated on scroll'}
          </p>
        </div>

        <div
          ref={(el) => { cardsRef.current[1] = el; }}
          className="h-48 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-2xl flex items-center justify-center"
        >
          <p className="text-white text-xl font-medium">
            {prefersReduced ? 'Fade only' : 'Fade + scale + y'}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 grid grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            ref={(el) => { valuesRef.current[i] = el; }}
            className="rounded-xl bg-gray-800/50 border border-gray-700 p-6 text-center"
          >
            <div
              className="text-3xl font-bold text-white mb-1"
            >
              {prefersReduced ? stat.value.toLocaleString() : '0'}
            </div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
