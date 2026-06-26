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

export default function ScrollRestoration({
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
  const restoredRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const noteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const savedPos = sessionStorage.getItem('scroll-restore-pos');
    if (savedPos && restoredRef.current) {
      restoredRef.current.textContent = `Restored to position: ${savedPos}px`;
    }

    const handleScroll = () => {
      const pos = window.scrollY;
      sessionStorage.setItem('scroll-restore-pos', String(pos));
    };

    const handleBeforeUnload = () => {
      ScrollTrigger.getAll().forEach((st) => st.refresh());
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    const ctx = gsap.context(() => {
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

      if (noteRef.current) {
        gsap.from(noteRef.current, {
          opacity: 0, y: 20, duration: 0.5, ease,
          scrollTrigger: { trigger: noteRef.current, start: 'top 85%', end: 'top 45%', markers: false },
        });
      }
    }, el);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  const saveAndReload = () => {
    sessionStorage.setItem('scroll-restore-pos', String(window.scrollY));
    window.location.reload();
  };

  const clearAndReload = () => {
    sessionStorage.removeItem('scroll-restore-pos');
    window.location.reload();
  };

  const colors = [
    'from-indigo-500 to-purple-600',
    'from-emerald-500 to-teal-600',
    'from-rose-500 to-pink-600',
    'from-amber-500 to-orange-600',
  ];

  return (
    <div ref={containerRef} className="min-h-screen py-32">
      <div className="text-center mb-8 max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">Scroll Restoration</h2>
        <p className="text-gray-400">
          Scroll position persists across page reloads via sessionStorage
        </p>
      </div>

      <div className="flex justify-center gap-3 mb-8">
        <button
          onClick={saveAndReload}
          className="px-5 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors"
        >
          Save &amp; Reload
        </button>
        <button
          onClick={clearAndReload}
          className="px-5 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium transition-colors border border-gray-700"
        >
          Reset &amp; Reload
        </button>
      </div>

      <p
        ref={restoredRef}
        className="text-center text-sm text-emerald-400 mb-8 font-mono"
      />

      <div className="max-w-3xl mx-auto px-4 space-y-6">
        {colors.map((color, i) => (
          <div
            key={i}
            ref={(el) => { cardsRef.current[i] = el; }}
            className={`h-64 rounded-2xl bg-gradient-to-br ${color} shadow-2xl flex items-center justify-center`}
          >
            <div className="text-center">
              <span className="text-5xl block mb-4">{['🌟', '⚡', '💎', '🔥'][i]}</span>
              <h3 className="text-white text-2xl font-bold">Card {i + 1}</h3>
            </div>
          </div>
        ))}
      </div>

      <p
        ref={noteRef}
        className="text-gray-500 text-sm text-center mt-8 max-w-md mx-auto"
      >
        ScrollTrigger.refresh() is called on reload to recalculate positions
      </p>
    </div>
  );
}
