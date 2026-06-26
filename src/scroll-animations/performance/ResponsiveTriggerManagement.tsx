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

export default function ResponsiveTriggerManagement({
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
  const [breakpoint, setBreakpoint] = useState('lg');
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        setBreakpoint('lg');
        initAnimations('full');
        return () => cleanup();
      });

      mm.add('(min-width: 640px) and (max-width: 1023px)', () => {
        setBreakpoint('md');
        initAnimations('simple');
        return () => cleanup();
      });

      mm.add('(max-width: 639px)', () => {
        setBreakpoint('sm');
        initAnimations('none');
        return () => cleanup();
      });
    }, el);

    function initAnimations(mode: 'full' | 'simple' | 'none') {
      if (mode === 'none') {
        cardsRef.current.forEach((card) => {
          if (card) gsap.set(card, { clearProps: 'all' });
        });
        updateStatus('Disabled (mobile)');
        return;
      }

      const isFull = mode === 'full';

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const delay = i * 0.1;

        gsap.from(card, {
          opacity: 0,
          y: isFull ? 80 : 40,
          scale: isFull ? 0.85 : 1,
          rotation: isFull ? -5 : 0,
          duration: isFull ? 0.8 : 0.5,
          delay,
          ease: isFull ? 'back.out(1.7)' : 'power1.out',
          scrollTrigger: {
            trigger: card,
            start: isFull ? 'top 85%' : 'top 88%',
            end: isFull ? 'top 35%' : 'top 45%',
            markers: isFull ? markers : false,
            toggleActions: 'play none none none',
          },
        });
      });

      updateStatus(isFull ? 'Full animations (desktop)' : 'Simplified (tablet)');
    }

    function cleanup() {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      cardsRef.current.forEach((card) => {
        if (card) gsap.set(card, { clearProps: 'all' });
      });
    }

    function updateStatus(msg: string) {
      if (statusRef.current) statusRef.current.textContent = msg;
    }

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  const cards = [
    { color: 'from-violet-500 to-purple-700', icon: '🌟' },
    { color: 'from-emerald-500 to-teal-600', icon: '⚡' },
    { color: 'from-rose-500 to-pink-600', icon: '💎' },
    { color: 'from-amber-500 to-orange-600', icon: '🔥' },
    { color: 'from-cyan-500 to-blue-600', icon: '🌊' },
    { color: 'from-pink-500 to-rose-600', icon: '🎯' },
  ];

  const breakpointLabel =
    breakpoint === 'lg' ? 'Desktop (≥1024px)' :
    breakpoint === 'md' ? 'Tablet (640-1023px)' :
    'Mobile (<640px)';

  return (
    <div ref={containerRef} className="min-h-screen py-32">
      <div className="text-center mb-8 max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">Responsive Trigger Management</h2>
        <p className="text-gray-400">
          matchMedia enables/disables triggers per viewport
        </p>
      </div>

      <div className="flex justify-center gap-3 mb-6">
        <div
          className={`px-4 py-2 rounded-xl font-mono text-sm border ${
            breakpoint === 'lg'
              ? 'bg-violet-900/30 border-violet-700 text-violet-400'
              : breakpoint === 'md'
              ? 'bg-emerald-900/30 border-emerald-700 text-emerald-400'
              : 'bg-amber-900/30 border-amber-700 text-amber-400'
          }`}
        >
          {breakpointLabel}
        </div>
      </div>

      <div
        ref={statusRef}
        className="text-center text-sm text-emerald-400 font-mono mb-6"
      >
        Resize to change mode
      </div>

      <div className="max-w-3xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, i) => (
          <div
            key={i}
            ref={(el) => { cardsRef.current[i] = el; }}
            className={`h-40 rounded-xl bg-gradient-to-br ${card.color} shadow-lg flex items-center justify-center`}
          >
            <div className="text-center">
              <span className="text-4xl block mb-2">{card.icon}</span>
              <span className="text-white font-bold">Card {i + 1}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-gray-500 text-sm text-center mt-6 max-w-lg mx-auto">
        Desktop: full rotation + scale. Tablet: simplified. Mobile: disabled.
      </p>
    </div>
  );
}
