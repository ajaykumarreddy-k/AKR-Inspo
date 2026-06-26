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

export default function MobileOptimizations({
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
  const [viewport, setViewport] = useState('desktop');
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      setViewport('desktop');
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.from(card, {
          opacity: 0,
          y: 80,
          scale: 0.9,
          rotation: -5,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 35%',
            markers,
            toggleActions: 'play none none none',
          },
        });
      });
    });

    mm.add('(min-width: 640px) and (max-width: 1023px)', () => {
      setViewport('tablet');
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.from(card, {
          opacity: 0,
          y: 50,
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
    });

    mm.add('(max-width: 639px)', () => {
      setViewport('mobile');
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.from(card, {
          opacity: 0,
          y: 30,
          duration: 0.4,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 40%',
            markers: false,
            toggleActions: 'play none none none',
          },
        });
      });
    });

    return () => mm.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  const colors = [
    'from-violet-500 to-purple-700',
    'from-emerald-500 to-teal-600',
    'from-rose-500 to-pink-600',
    'from-amber-500 to-orange-600',
  ];

  return (
    <div ref={containerRef} className="min-h-screen py-32">
      <div className="text-center mb-8 max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">Mobile Optimizations</h2>
        <p className="text-gray-400">
          GSAP MatchMedia tailors animations per viewport
        </p>
      </div>

      <div
        ref={badgeRef}
        className={`text-center mb-8 px-4 py-2 rounded-xl inline-block mx-auto font-mono text-sm ${
          viewport === 'desktop'
            ? 'bg-violet-900/30 border border-violet-700 text-violet-400'
            : viewport === 'tablet'
            ? 'bg-emerald-900/30 border border-emerald-700 text-emerald-400'
            : 'bg-amber-900/30 border border-amber-700 text-amber-400'
        }`}
      >
        {viewport === 'desktop' ? '🖥️ Desktop — full animations' :
         viewport === 'tablet' ? '📱 Tablet — simplified' :
         '📱 Mobile — minimal animations'}
      </div>

      <div className="max-w-3xl mx-auto px-4 space-y-6">
        {colors.map((color, i) => (
          <div
            key={i}
            ref={(el) => { cardsRef.current[i] = el; }}
            className={`h-48 rounded-2xl bg-gradient-to-br ${color} shadow-2xl flex items-center justify-center`}
          >
            <div className="text-center">
              <span className="text-4xl block mb-2">{['🌟', '⚡', '💎', '🔥'][i]}</span>
              <h3 className="text-white text-2xl font-bold">Card {i + 1}</h3>
              <p className="text-white/60 mt-1">
                {viewport === 'desktop' ? 'Full animation with rotation' :
                 viewport === 'tablet' ? 'Simplified fade-up' :
                 'Minimal fade-up'}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-gray-500 text-sm text-center mt-6 max-w-lg mx-auto">
        Resize your browser to see different animation profiles
      </p>
    </div>
  );
}
