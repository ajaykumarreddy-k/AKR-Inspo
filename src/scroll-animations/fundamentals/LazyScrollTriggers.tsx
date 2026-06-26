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

interface LazySection {
  id: number;
  title: string;
  content: string;
  icon: string;
  color: string;
}

const lazySections: LazySection[] = [
  { id: 1, title: 'Section Alpha', content: 'This ScrollTrigger only initializes when close to the viewport, saving resources on page load.', icon: '🅰️', color: 'from-violet-500 to-purple-700' },
  { id: 2, title: 'Section Beta', content: 'IntersectionObserver watches the container. Once it enters the viewport, ScrollTrigger takes over.', icon: '🅱️', color: 'from-blue-500 to-indigo-700' },
  { id: 3, title: 'Section Gamma', content: 'Lazy initialization means faster initial page loads and smoother performance on long pages.', icon: '🆚', color: 'from-emerald-500 to-teal-700' },
  { id: 4, title: 'Section Delta', content: 'Each section independently initializes its animation only when needed.', icon: '🆕', color: 'from-amber-500 to-orange-700' },
  { id: 5, title: 'Section Epsilon', content: 'Combined with ScrollTrigger.refresh(), this pattern is ideal for infinite-scroll content.', icon: '♾️', color: 'from-rose-500 to-pink-700' },
];

export default function LazyScrollTriggers({
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
  const [initializedSections, setInitializedSections] = useState<Set<number>>(new Set());
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const observerRefs = useRef<IntersectionObserver[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      return () => {
        observerRefs.current.forEach((obs) => obs.disconnect());
        observerRefs.current = [];
      };
    }, el);

    return () => ctx.revert();
  }, [disabled]);

  useEffect(() => {
    const sectionElements = sectionRefs.current;

    sectionElements.forEach((section, i) => {
      if (!section || initializedSections.has(i)) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setInitializedSections((prev) => new Set(prev).add(i));
              observer.disconnect();

              const idx = observerRefs.current.indexOf(observer);
              if (idx > -1) observerRefs.current.splice(idx, 1);
            }
          });
        },
        { rootMargin: '200px', threshold: 0 }
      );

      observer.observe(section);
      observerRefs.current.push(observer);
    });

    return () => {
      observerRefs.current.forEach((obs) => obs.disconnect());
      observerRefs.current = [];
    };
  }, [initializedSections]);

  useEffect(() => {
    if (disabled) return;

    const ctx = gsap.context(() => {
      initializedSections.forEach((i) => {
        const content = contentRefs.current[i];
        const icon = iconRefs.current[i];
        if (!content || !icon) return;

        gsap.fromTo(
          content,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1,
            duration,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: sectionRefs.current[i],
              start,
              end,
              markers,
              id: `lazy-${i}`,
              toggleActions: 'play none none none',
              onEnter: () => {
                gsap.to(icon, {
                  rotation: 360,
                  scale: 1.2,
                  duration: 0.6,
                  ease: 'power2.out',
                });
              },
            },
          }
        );

        gsap.fromTo(
          icon,
          { opacity: 0, scale: 0, rotation: -180 },
          {
            opacity: 1, scale: 1, rotation: 0,
            duration: 0.6,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: sectionRefs.current[i],
              start,
              end,
              markers: false,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [initializedSections, disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen py-32">
      <div className="text-center mb-16 max-w-xl">
        <h2 className="text-3xl font-bold text-white mb-2">Lazy ScrollTriggers</h2>
        <p className="text-gray-400">
          ScrollTriggers only initialize when their container enters the viewport (using IntersectionObserver)
        </p>
      </div>

      <div className="w-full max-w-lg mx-auto space-y-8">
        {lazySections.map((section, i) => {
          const isInit = initializedSections.has(i);
          return (
            <div
              key={section.id}
              ref={(el) => { sectionRefs.current[i] = el; }}
              className={`h-64 rounded-2xl bg-gradient-to-br ${section.color} shadow-2xl p-8 flex items-center gap-6 transition-all duration-500 ${
                isInit ? 'opacity-100' : 'opacity-50'
              }`}
            >
              <div
                ref={(el) => { iconRefs.current[i] = el; }}
                className="text-5xl shrink-0"
              >
                {section.icon}
              </div>
              <div
                ref={(el) => { contentRefs.current[i] = el; }}
                className="flex-1"
              >
                <h3 className="text-white text-xl font-bold mb-2">{section.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{section.content}</p>
                {!isInit && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" />
                    <span className="text-yellow-400 text-xs font-medium">Awaiting viewport entry...</span>
                  </div>
                )}
                {isInit && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-emerald-400 text-xs font-medium">ScrollTrigger initialized</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full max-w-lg mx-auto mt-12 px-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h4 className="text-white font-semibold mb-2">Lazy Initialization Pattern</h4>
          <pre className="text-sm text-gray-300 font-mono">
{`const observer = new IntersectionObserver(
  (entries) => {
    if (entry.isIntersecting) {
      // Create ScrollTrigger here
      observer.disconnect();
    }
  },
  { rootMargin: '200px' } // trigger 200px early
);`}
          </pre>
        </div>
      </div>
    </div>
  );
}
