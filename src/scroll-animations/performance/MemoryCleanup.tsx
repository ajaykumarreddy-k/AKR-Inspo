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

const TRIGGER_COUNT = 10;

export default function MemoryCleanup({
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
  const [active, setActive] = useState(true);
  const [triggerCount, setTriggerCount] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card) => {
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
            id: `memory-card-${Date.now()}`,
          },
        });
      });
    }, el);

    ctxRef.current = ctx;
    setTriggerCount(ScrollTrigger.getAll().length);

    return () => {
      ctx.revert();
      setTriggerCount(ScrollTrigger.getAll().length);
    };
  }, [disabled, markers, scrub, pin, start, end, duration, ease, active]);

  const killAll = () => {
    ScrollTrigger.getAll().forEach((st) => st.kill());
    ctxRef.current?.revert();
    setTriggerCount(0);
    if (statusRef.current) {
      statusRef.current.textContent = 'All triggers killed';
    }
  };

  const refreshTriggers = () => {
    ScrollTrigger.refresh();
    setTriggerCount(ScrollTrigger.getAll().length);
    if (statusRef.current) {
      statusRef.current.textContent = 'Triggers refreshed';
    }
  };

  const colors = [
    'from-violet-500 to-purple-700',
    'from-emerald-500 to-teal-600',
    'from-rose-500 to-pink-600',
    'from-amber-500 to-orange-600',
    'from-cyan-500 to-blue-600',
  ];

  return (
    <div ref={containerRef} className="min-h-screen py-32">
      <div className="text-center mb-8 max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">Memory Cleanup</h2>
        <p className="text-gray-400">
          Proper kill() and revert() patterns prevent memory leaks
        </p>
      </div>

      <div className="flex justify-center gap-3 mb-6">
        <button
          onClick={() => {
            setActive((p) => !p);
            if (statusRef.current) {
              statusRef.current.textContent = active ? 'Paused' : 'Active';
            }
          }}
          className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
            active
              ? 'bg-red-600 hover:bg-red-500 text-white'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
          }`}
        >
          {active ? 'Deactivate' : 'Reactivate'}
        </button>
        <button
          onClick={killAll}
          className="px-5 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium border border-gray-700"
        >
          Kill All Triggers
        </button>
        <button
          onClick={refreshTriggers}
          className="px-5 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium border border-gray-700"
        >
          Refresh
        </button>
      </div>

      <p
        ref={statusRef}
        className="text-center text-sm text-emerald-400 font-mono mb-2"
      >
        Active triggers: {triggerCount}
      </p>

      <div className="max-w-3xl mx-auto px-4 space-y-4">
        {Array.from({ length: TRIGGER_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => { cardRefs.current[i] = el; }}
            className={`h-32 rounded-xl bg-gradient-to-br ${colors[i % colors.length]} shadow-lg flex items-center justify-center transition-opacity ${
              active ? 'opacity-100' : 'opacity-30'
            }`}
          >
            <div className="text-center">
              <span className="text-3xl block mb-1">{['🌟', '⚡', '💎', '🔥', '🌊'][i % 5]}</span>
              <h3 className="text-white text-lg font-bold">Card {i + 1}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-xl mx-auto mt-8 p-5 rounded-xl bg-gray-800/50 border border-gray-700">
        <h4 className="text-white font-bold mb-2 text-sm">Cleanup Patterns</h4>
        <ul className="text-sm text-gray-400 space-y-1">
          <li><code className="text-cyan-400">ctx.revert()</code> — Reverts all animations in context</li>
          <li><code className="text-cyan-400">st.kill()</code> — Kills individual ScrollTrigger</li>
          <li><code className="text-cyan-400">ScrollTrigger.getAll()</code> — Access all active triggers</li>
          <li><code className="text-cyan-400">useEffect cleanup</code> — Automatic on unmount</li>
        </ul>
      </div>
    </div>
  );
}
