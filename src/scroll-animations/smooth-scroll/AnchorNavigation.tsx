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

const sections = [
  { id: 'hero', color: 'from-violet-500 to-purple-700', label: 'Hero', icon: '🌟' },
  { id: 'about', color: 'from-emerald-500 to-teal-600', label: 'About', icon: 'ℹ️' },
  { id: 'work', color: 'from-amber-500 to-orange-600', label: 'Work', icon: '⚡' },
  { id: 'contact-nav', color: 'from-rose-500 to-pink-600', label: 'Contact', icon: '📬' },
];

export default function AnchorNavigation({
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
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      sectionRefs.current.forEach((section) => {
        if (!section) return;
        gsap.from(section, {
          opacity: 0,
          y: 80,
          scale: 0.95,
          duration: 0.8,
          ease,
          scrollTrigger: {
            trigger: section,
            start,
            end,
            markers,
            toggleActions: 'play none none none',
          },
        });
      });

      sectionRefs.current.forEach((section, i) => {
        if (!section) return;
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        });
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  const setActive = (i: number) => {
    if (activeRef.current) {
      activeRef.current.style.transform = `translateY(${i * 100}%)`;
    }
  };

  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="min-h-screen py-32">
      <div className="text-center mb-12 max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">Anchor Navigation</h2>
        <p className="text-gray-400">
          Click nav items to smoothly scroll and trigger animations
        </p>
      </div>

      <nav className="sticky top-4 z-50 flex justify-center mb-16">
        <div className="inline-flex gap-1 bg-gray-900/90 backdrop-blur-md border border-gray-700 rounded-xl p-1.5 shadow-2xl">
          {sections.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => { navRefs.current[i] = el; }}
              onClick={() => scrollTo(s.id)}
              className="relative px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-colors font-medium text-sm"
            >
              {s.icon} {s.label}
            </button>
          ))}
          <div
            ref={activeRef}
            className="absolute inset-y-1.5 left-1.5 w-[calc(25%-3px)] rounded-lg bg-violet-600/30 border border-violet-500/50 transition-transform duration-300 pointer-events-none"
          />
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 space-y-12">
        {sections.map((s, i) => (
          <div
            key={s.id}
            id={s.id}
            ref={(el) => { sectionRefs.current[i] = el; }}
            className={`h-[70vh] rounded-2xl bg-gradient-to-br ${s.color} shadow-2xl flex items-center justify-center`}
          >
            <div className="text-center">
              <span className="text-7xl block mb-6">{s.icon}</span>
              <h3 className="text-white text-4xl font-bold">{s.label} Section</h3>
              <p className="text-white/60 mt-3 text-lg">Anchored navigation demo</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
