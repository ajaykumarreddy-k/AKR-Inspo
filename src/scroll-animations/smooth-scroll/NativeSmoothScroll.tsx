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
  { id: 'intro', color: 'from-violet-500 to-purple-700', label: 'Introduction', icon: '🌟' },
  { id: 'features', color: 'from-emerald-500 to-teal-600', label: 'Features', icon: '⚡' },
  { id: 'pricing', color: 'from-amber-500 to-orange-600', label: 'Pricing', icon: '💰' },
  { id: 'contact', color: 'from-rose-500 to-pink-600', label: 'Contact', icon: '📬' },
];

export default function NativeSmoothScroll({
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
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);

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

      headingRefs.current.forEach((heading) => {
        if (!heading) return;
        gsap.from(heading, {
          opacity: 0,
          x: -60,
          duration: 0.6,
          ease,
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            end: 'top 45%',
            markers: false,
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="min-h-screen py-32">
      <div className="text-center mb-12 max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">Native Smooth Scroll</h2>
        <p className="text-gray-400">
          CSS scroll-behavior: smooth with scrollIntoView navigation
        </p>
      </div>

      <div className="flex justify-center gap-3 mb-16 flex-wrap">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollToSection(s.id)}
            className="px-5 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium transition-colors border border-gray-700"
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-4 space-y-12">
        {sections.map((s, i) => (
          <div
            key={s.id}
            id={s.id}
            ref={(el) => { sectionRefs.current[i] = el; }}
            className={`h-96 rounded-2xl bg-gradient-to-br ${s.color} shadow-2xl flex items-center justify-center`}
          >
            <div className="text-center">
              <span className="text-6xl block mb-4">{s.icon}</span>
              <h3
                ref={(el) => { headingRefs.current[i] = el; }}
                className="text-white text-3xl font-bold"
              >
                {s.label}
              </h3>
              <p className="text-white/60 mt-2">Smooth scroll section {i + 1}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
