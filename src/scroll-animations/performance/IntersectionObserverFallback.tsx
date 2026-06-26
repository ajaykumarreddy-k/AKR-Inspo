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

export default function IntersectionObserverFallback({
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
  const [hasScrollTrigger, setHasScrollTrigger] = useState(true);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const fallbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasScrollTrigger(typeof ScrollTrigger !== 'undefined');
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    if (hasScrollTrigger) {
      const ctx = gsap.context(() => {
        cardsRef.current.forEach((card) => {
          if (!card) return;
          gsap.from(card, {
            opacity: 0, y: 60, scale: 0.9, duration: 0.7, ease,
            scrollTrigger: {
              trigger: card, start, end, markers,
              toggleActions: 'play none none none',
            },
          });
        });
      }, el);
      return () => ctx.revert();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              opacity: 1, y: 0, scale: 1, duration: 0.7, ease,
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    if (fallbackRef.current) {
      fallbackRef.current.textContent = 'IntersectionObserver fallback active';
    }

    return () => observer.disconnect();
  }, [disabled, markers, scrub, pin, start, end, duration, ease, hasScrollTrigger]);

  const colors = [
    'from-violet-500 to-purple-700',
    'from-emerald-500 to-teal-600',
    'from-rose-500 to-pink-600',
    'from-amber-500 to-orange-600',
  ];

  return (
    <div ref={containerRef} className="min-h-screen py-32">
      <div className="text-center mb-8 max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">IntersectionObserver Fallback</h2>
        <p className="text-gray-400">
          Uses IntersectionObserver when ScrollTrigger is unavailable
        </p>
      </div>

      <div
        ref={fallbackRef}
        className="text-center text-sm font-mono mb-6"
        style={{ color: hasScrollTrigger ? '#34d399' : '#f87171' }}
      >
        {hasScrollTrigger ? 'ScrollTrigger available' : 'Fallback active'}
      </div>

      <div className="max-w-3xl mx-auto px-4 space-y-6">
        {colors.map((color, i) => (
          <div
            key={i}
            ref={(el) => { cardsRef.current[i] = el; }}
            className={`h-56 rounded-2xl bg-gradient-to-br ${color} shadow-2xl flex items-center justify-center`}
            style={{ opacity: 0, transform: 'translateY(60px) scale(0.9)' }}
          >
            <div className="text-center">
              <span className="text-5xl block mb-4">{['🌟', '⚡', '💎', '🔥'][i]}</span>
              <h3 className="text-white text-2xl font-bold">
                {hasScrollTrigger ? 'ScrollTrigger' : 'IntersectionObserver'}
              </h3>
              <p className="text-white/60 mt-1">
                {hasScrollTrigger ? 'GSAP powered' : 'IO fallback'} animation
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
