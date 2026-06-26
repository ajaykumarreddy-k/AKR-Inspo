import { useRef, useEffect, useState, useCallback } from 'react';
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

const colorPalette = [
  'from-rose-400 to-pink-500',
  'from-cyan-400 to-blue-500',
  'from-amber-400 to-orange-500',
  'from-emerald-400 to-teal-500',
  'from-violet-400 to-purple-500',
  'from-fuchsia-400 to-pink-500',
];

const shapeIcons = ['⬤', '■', '▲', '★', '♦', '●'];

export default function DynamicTriggerCreation({
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
  const dynamicAreaRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const triggerRefs = useRef<ScrollTrigger[]>([]);
  const [cards, setCards] = useState<{ id: number; color: string; icon: string }[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const counterRef = useRef(0);

  const createNewTrigger = useCallback(() => {
    const id = counterRef.current++;
    const colorIdx = id % colorPalette.length;
    const iconIdx = id % shapeIcons.length;
    const newCard = { id, color: colorPalette[colorIdx], icon: shapeIcons[iconIdx] };
    setCards((prev) => [...prev, newCard]);
  }, []);

  const removeLastTrigger = useCallback(() => {
    setCards((prev) => {
      if (prev.length === 0) return prev;
      const removed = prev[prev.length - 1];
      const triggerIdx = triggerRefs.current.length - 1;
      if (triggerRefs.current[triggerIdx]) {
        triggerRefs.current[triggerIdx].kill();
        triggerRefs.current.splice(triggerIdx, 1);
      }
      return prev.slice(0, -1);
    });
  }, []);

  const removeAllTriggers = useCallback(() => {
    triggerRefs.current.forEach((st) => st.kill());
    triggerRefs.current = [];
    setCards([]);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      return () => {
        triggerRefs.current.forEach((st) => st.kill());
        triggerRefs.current = [];
      };
    }, el);

    return () => ctx.revert();
  }, [disabled]);

  useEffect(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    const timer = requestAnimationFrame(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card || card.dataset.triggered === 'true') return;

        const st = ScrollTrigger.create({
          trigger: card,
          start,
          end,
          markers,
          id: `dynamic-${i}`,
          onEnter: () => {
            gsap.fromTo(
              card,
              { opacity: 0, y: 40, scale: 0.7, rotation: -10 },
              {
                opacity: 1, y: 0, scale: 1, rotation: 0,
                duration,
                ease: 'back.out(1.7)',
              }
            );
          },
          onLeave: () => {
            gsap.to(card, {
              opacity: 0.3,
              scale: 0.9,
              duration: 0.3,
              ease,
            });
          },
          onEnterBack: () => {
            gsap.to(card, {
              opacity: 1,
              scale: 1,
              duration: 0.3,
              ease: 'back.out(1.7)',
            });
          },
          onLeaveBack: () => {
            gsap.to(card, {
              opacity: 0.3,
              scale: 0.9,
              duration: 0.3,
              ease,
            });
          },
        });

        triggerRefs.current.push(st);
        card.dataset.triggered = 'true';
      });

      setIsAnimating(false);
    });

    return () => cancelAnimationFrame(timer);
  }, [cards, markers, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen py-32">
      <div className="text-center mb-16 max-w-xl">
        <h2 className="text-3xl font-bold text-white mb-2">Dynamic Trigger Creation</h2>
        <p className="text-gray-400">
          Create and destroy ScrollTriggers on the fly. Add cards and watch them animate as you scroll.
        </p>
      </div>

      <div className="flex items-center gap-4 mb-12">
        <button
          onClick={createNewTrigger}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold shadow-lg hover:shadow-emerald-500/20 hover:scale-105 transition-all"
        >
          + Add Card
        </button>
        <button
          onClick={removeLastTrigger}
          disabled={cards.length === 0}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold shadow-lg hover:shadow-amber-500/20 hover:scale-105 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          - Remove Last
        </button>
        <button
          onClick={removeAllTriggers}
          disabled={cards.length === 0}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold shadow-lg hover:shadow-rose-500/20 hover:scale-105 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ✕ Clear All
        </button>
      </div>

      <div className="text-center mb-8">
        <span className="text-gray-400 text-sm">
          Cards created: <strong className="text-white">{cards.length}</strong>
        </span>
        {cards.length > 0 && (
          <span className="text-gray-500 text-xs ml-4">
            (Scroll down to see each card animate into view)
          </span>
        )}
      </div>

      <div ref={dynamicAreaRef} className="w-full max-w-lg mx-auto space-y-6">
        {cards.length === 0 && (
          <div className="h-48 rounded-2xl border-2 border-dashed border-gray-700 flex items-center justify-center">
            <p className="text-gray-600">Click "Add Card" to create ScrollTriggers dynamically</p>
          </div>
        )}

        {cards.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => { cardRefs.current[i] = el; }}
            className={`h-40 rounded-xl bg-gradient-to-br ${card.color} shadow-lg flex items-center justify-center p-6`}
            data-triggered="false"
          >
            <div className="text-center">
              <span className="text-4xl block mb-2">{card.icon}</span>
              <span className="text-white font-semibold">Card #{card.id + 1}</span>
              <span className="text-white/50 text-xs block mt-1">Created dynamically</span>
            </div>
          </div>
        ))}
      </div>

      {cards.length > 0 && (
        <div className="w-full max-w-lg mx-auto mt-12 px-4">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h4 className="text-white font-semibold mb-2">Dynamic Lifecycle</h4>
            <p className="text-gray-400 text-sm">
              Each card gets its own <code className="text-cyan-400">ScrollTrigger.create()</code>.
              When removed, <code className="text-cyan-400">.kill()</code> is called to clean up.
              All triggers are tracked in a ref array for proper disposal.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
